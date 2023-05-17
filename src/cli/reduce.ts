import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const { fn, details } = loadUserFn(argv, `(accumulator, record) => accumulate(accumulator, record)`);

    if (argv.length < 1) {
        throw new Error(`Expected argument for initial value.`);
    }

    const initialValue = JSON.parse(argv.shift()!);

    const data = await inputData(argv);
    verifyInputArray(data, "reduce");

    const reduced = data.reduce((a: any, r: any) => invokeUserFn(() => fn(a, r), details), initialValue);

    await outputData(argv, reduced);
}

export const documentation = {
    name: "reduce",
    desc: "Reduces or aggregates an input dataset to some output value by repeatedly calling the reducer function on every record of the input. Works just like `array.reduce` in JavaScript.",
    syntax: "reduce <reducer-fn> <seed-value> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "reducer-fn",
            desc: `A JavaScript "reducer" function called for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.`,
        },
        {
            name: "seed-value",
            desc: "JSON value that is used as the initial accumulator value for the reduction."
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the reduction to compute total sales and writes to standard output",
            cmd: 'command-that-produces-json | reduce "(a, r) => a + r.sales" 0',
        },
        {
            name: "Reads data from a file, applies the reduction and writes to standard output",
            cmd: 'reduce "(a, r) => a + r.sales" 0 input-file.json',
        },
        {
            name: "Reads data from a file, applies the reduction and writes output to another file",
            cmd: 'reduce "(a, r) => a + r.sales" 0 input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, applies the reduction and writes output to another file",
            cmd: 'command-that-produces-json | reduce "(a, r) => a + r.sales" 0 - output-file.csv'
        },
        {
            name: "Loads a JavaScript file for the transformation",
            cmd: 'reduce input-file.yaml my-reducer.js 0',
        },
    ],
};
