import minimist, { ParsedArgs } from "minimist";
import "../cli/lib/load-globals";
import chalk from 'chalk';

export interface IDocumentation {
    name: string;
    desc: string;
    syntax: string;
    inputs: string[];
    outputs: string[];
    args: {
        name: string;
        desc: string;
    }[];
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
    console.log();
    console.log(chalk.blueBright(doco.name));
    console.log();
    console.log(doco.desc);
    console.log();
    console.log("Syntax:");
    console.log();
    console.log(indent(doco.syntax, "\t"));
    console.log();
    console.log("Inputs (one of):");
    console.log();
    console.log(indent(doco.inputs.map(input => "- " + input).join("\n"), "\t"));
    console.log();
    console.log("Outputs (one of):");
    console.log();
    console.log(indent(doco.outputs.map(input => "- " + input).join("\n"), "\t"));
    console.log();
    console.log("Arguments:");
    console.log();
    console.log(indent(doco.args.map(input => `- ${chalk.blue(input.name)}: ${input.desc}`).join("\n"), "\t"));
    console.log();
    console.log("Examples:");
    console.log();
    for (const example of doco.examples) {
        console.log(indent(example.name, "\t"));
        if (example.desc) {
            console.log();
            console.log(indent(example.desc, "\t\t"));
        }

        console.log();
        console.log(indent(chalk.green(example.cmd), "\t\t"));
        console.log();
    }
    console.log();
}

//
// Parses args before invoking a command then handling errors.
//
export async function run(invoke: (argv: ParsedArgs) => Promise<void>, doco: IDocumentation): Promise<void> {

    const argv = minimist(process.argv.slice(2));
    if (argv.h || argv.help || (argv._.length > 0 && argv._[0] === "help")) {
        displayDocumentation(doco)
        process.exit(2);
    }

    try {
        await invoke(argv);
    }
    catch (err: any) {
        if (err.message) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`Failed with error:`);
            console.error(err);
        }
        process.exit(1);
    }
}