import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";
import { runCmd } from "./lib/run-cmd";

export async function main(argv: string[]): Promise<void> {

    const { fn, details } = loadUserFn(argv, `record => \`echo \$\{record.something\}\``);

    const data = await inputData(argv);
    verifyInputArray(data, "run");

    const promises = data.map(async (record: any) => {
        const cmd = await invokeUserFn(() => fn(record), details);
        return await runCmd(cmd, {});
    })
    const results = await Promise.all(promises);
    await outputData(argv, results);
}

export const documentation = {
    name: "run",
    desc: "Execute a command for each record in the input dataset.",
    syntax: "run <cmd-selector-fn> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "cmd-selector-fn",
            desc: "A JavaScript function to transform each record of the input dataset that creates a command to execute.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, creates a command and executes the command for each record.",
            cmd: 'command-that-produces-json | run "record => `echo ${record.x}`"',
        },
        {
            name: "Reads data from a CSV or JSON file, creates a command and executes the command for each record.",
            cmd: 'run "record => `echo ${record.x}`" input-file.csv',
        },
        {
            name: "Reads data from a file, creates a command and executes the command for each record, writing the output to another file.",
            cmd: 'run "record => `echo ${record.x}`"  input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, creates a command and executes the command for each record, writing the output to a file.",
            cmd: 'command-that-produces-json | run "record => `echo ${record.x}`" - output-file.csv'
        },
        {
            name: "Loads a JavaScript file that provides the function that creates the command.",
            cmd: 'run --file my-transformation.js input-file.csv output-file.csv',
        },
    ],
};
