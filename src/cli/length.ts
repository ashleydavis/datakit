import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";

export async function main(argv: string[]): Promise<void> {
   
    const data = await inputData(argv);
    verifyInputArray(data, "length");

    await outputData(argv, data.length);
}

export const documentation = {
    name: "length",
    desc: "Gets the number of records in a dataset. Works just like `array.length` in JavaScript.",
    syntax: "length [<input-file>]",
    inputs: [
        "JSON file",
        "CSV file", 
        "YAML file",
        "JSON formatted array on standard input.",
    ],
    outputs: [
        "Prints the number of records in the input dataset.",
    ],
    args: [
        {
            name: "input-file",
            desc: "Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.",
        },
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, outputs the number of records",
            cmd: 'command-that-produces-json | length -',
        },
        {
            name: "Reads data from a file, outputs the number of records",
            cmd: 'length input-file.csv',
        },
    ],
};