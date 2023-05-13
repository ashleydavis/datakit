import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "reduce");

    const { fn, details } = loadUserFn(argv, `(accumulator, record) => accumulate(accumulator, record)`);

    if (argv.length < 1) {
        throw new Error(`Expected argument for initial value.`);
    }

    const initialValue = JSON.parse(argv.shift()!);

    const reduced = data.reduce((a: any, r: any) => invokeUserFn(() => fn(a, r), details), initialValue);

    await outputData(argv, reduced);
}

export const documentation = {
    name: "reduce",
    desc: "Reduces or aggregates an input dataset to some output value by repeatedly calling the reducer function on every record of the input. Works just like `array.reduce` in JavaScript.",
    syntax: "reduce <input-file> <reducer-fn> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        {
            name: "reducer-fn",
            desc: `A JavaScript "reducer" function called for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.`,
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, applies the reduction to compute total sales and writes to standard output",
            cmd: 'command-that-produces-json | reduce - "(a, r) => a + r.sales" 0',
        },
        {
            name: "Reads data from a file, applies the reduction to compute total sales and writes to standard output",
            cmd: 'reduce input-file.json "(a, r) => a + r.sales" 0',
        },
        {
            name: "Reads data from a file, applies the transformation and writes output to another file",
            cmd: 'reduce input-file.csv "(a, r) => a + r.sales" 0 output-file.csv'
        },
        {
            name: "Loads a JavaScript file for the transformation",
            cmd: 'reduce input-file.yaml my-reducer.js 0',
        },
    ],
};
