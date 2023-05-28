import { Flags, IOption, pullOptions } from "../cli/lib/args";
import "../cli/lib/load-globals";
import chalk from 'chalk';

export interface IDocumentation {
    name: string;
    desc: string;
    syntax: string;
    inputs: string[];
    inputCount?: number;
    outputs: string[];
    args: {
        name: string;
        desc: string;
    }[];
    options?: IOption[];
    notes?: string[];
    seeAlso?: {
            cmd: string;
            desc: string;
    }[],
    examples: {
        name: string;
        desc?: string;
        cmd: string;
    }[];
}

//
// Indents the input string by the requested amount.
//
function indent(input: string, indent: string): string {
    return input.split("\n").map(line => indent + line).join("\n");
}

//
// Displays formatted documentation.
//
function displayDocumentation(doco: IDocumentation): void {

    let inputCount =  "one of";
    if (doco.inputCount !== undefined && doco.inputCount > 1) {
        inputCount = `${doco.inputCount} of`
    }

    console.log();
    console.log(chalk.cyanBright(doco.name));
    console.log();
    console.log(doco.desc);
    console.log();
    console.log("Syntax:");
    console.log();
    console.log(indent(doco.syntax, "\t"));
    console.log();
    console.log(`Inputs (${inputCount}):`);
    console.log();
    console.log(indent(doco.inputs.map(input => "- " + input).join("\n"), "\t"));
    console.log();
    console.log("Outputs (one of):");
    console.log();
    console.log(indent(doco.outputs.map(input => "- " + input).join("\n"), "\t"));
    console.log();
    console.log("Arguments:");
    console.log();
    console.log(indent(doco.args.map(input => `- ${chalk.cyan(input.name)}: ${input.desc}`).join("\n"), "\t"));
    console.log();
    if (doco.options) {
        console.log("Options:");
        console.log();
        for (const option of doco.options) {
            const names = option.names.map(name => `--` + name).join(", ");
            const opt = chalk.cyan(`${names}=${option.placeholder}`);
            console.log(indent(`${opt}: ${option.desc}. ${chalk.cyan(`Example`)}: --${option.names[0]}=${option.example}`, "\t"));
            console.log();
        }
    }
    if (doco.notes) {
        console.log("Notes:");
        console.log();
        console.log(indent(doco.notes.map(note => `- ${note}`).join("\n"), "\t"));
        console.log();
    }
    if (doco.seeAlso) {
        console.log("See also:");
        console.log();
        console.log(indent(doco.seeAlso.map(seeAlso => `- ${chalk.cyan(seeAlso.cmd)}: ${seeAlso.desc}`).join("\n"), "\t"));
        console.log();
    }
    console.log("Examples:");
    console.log();
    for (const example of doco.examples) {
        console.log(indent(example.name + ":", "\t"));
        if (example.desc) {
            console.log();
            console.log(indent(example.desc, "\t\t"));
        }

        console.log();
        console.log(indent(chalk.green(example.cmd), "\t\t"));
        console.log();
    }
    console.log();
    console.log(`See this help online: ${chalk.cyan.underline(`https://github.com/data-forge-notebook/datakit/blob/master/docs/cli.md#${doco.name}`)}`);
}

//
// Parses args before invoking a command then handling errors.
//
export async function run(invoke: (argv: string[], flags: Flags) => Promise<void>, doco: IDocumentation): Promise<void> {

    const argv = process.argv.slice(2);
    if (detectHelpArg(argv)) {
        displayDocumentation(doco)
        process.exit(2);
    }

    let flags: Flags = {};

    if (doco.options) {
        flags = Object.assign(flags, pullOptions(doco.options, argv));
    }

    try {
        await invoke(argv, flags);
    }
    catch (err: any) {
        if (err.message) {
            console.error(`${chalk.red("Error")}: ${err.message}`);
        }
        else {
            console.error(chalk.red(`Failed with error:`));
            console.error(err);
        }
        process.exit(1);
    }
}

//
// Detects if the help argument is anywhere in the array of arguments.
//
function detectHelpArg(argv: string[]): boolean {
    for (const arg of argv) {
        if (checkHelpArg(arg)) {
            return true;
        }
    }

    return false;
}

//
// Checks if the specified argument is the help argument.
//
function checkHelpArg(arg: string): boolean {
    return arg === "-h" ||
        arg === "--h" ||
        arg === "-?" ||
        arg === "--?" ||
        arg === "-help" ||
        arg === "--help" ||
        arg === "help";
}
