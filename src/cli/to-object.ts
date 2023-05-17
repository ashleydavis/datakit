import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const keySelectorFn = loadUserFn(argv, `r => r.key`);
    const valueSelectorFn = loadUserFn(argv, `r => r.value`);

    const data = await inputData(argv);
    verifyInputArray(data, "to-object");

    const reduced = data.reduce((a: any, r: any) => {
        const key = invokeUserFn(() => keySelectorFn.fn(r), keySelectorFn.details);
        const value = invokeUserFn(() => valueSelectorFn.fn(r), valueSelectorFn.details);
        a[key] = value;
        return a;
    }, {});

    await outputData(argv, reduced);
}

export const documentation = {
    name: "to-object",
    desc: "Creates a JSON object from key/value pairs extracted from the input dataset.",
    syntax: "to-object <key-selector-fn> <value-selector-fn> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "JSON file",
        "YAML file",
        "JSON formatted data on standard output.",
    ],
    args: [
        {
            name: "key-selector-fn",
            desc: "A JavaScript function to select the key from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "value-selector-fn",
            desc: "A JavaScript function to select the value from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input and writes the JSON object to standard output",
            cmd: 'command-that-produces-json | to-object "r => r.key" "r => r.value"',
        },
        {
            name: "Reads data from a file and writes the JSON object to standard output",
            cmd: 'to-object "r => r.key" "r => r.value"  input-file.csv',
        },
        {
            name: "Reads data from a file and writes the JSON object to a file",
            cmd: 'to-object "r => r.key" "r => r.value" input-file.csv output-file.json'
        },
        {
            name: "Loads JavaScript files for the key and value selector functions",
            cmd: 'to-object --file my-key-selector.js --file my-value-selector.js input-file.csv',
        },
        {
            name: "Reads JSON data from standard inputand writes the JSON object to a file",
            cmd: 'to-object "r => r.key" "r => r.value" - output-file.json'
        },
    ],
    notes: [
        "Unlike many other datakit commands the to-object command cannot output to the CSV format."
    ],
};
