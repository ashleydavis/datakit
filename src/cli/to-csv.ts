import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "to-csv");

    await outputData(argv, data, "csv");
}

export const documentation = {
    name: "to-csv",
    desc: "Converts data from the JSON data format to the CSV data format.",
    syntax: "to-csv [<input-file>] [<csv-output-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "CSV file",
        "CSV formatted data on standard output",
    ],
    args: [
        standardInputFileHelp,
        {
            name: "csv-output-file",
            desc: "The name of a file (must be a CSV file) to output the resulting dataset to. Omitting this causes CSV data to be written to standard output.",
        },
    ],
    examples: [
        {
            name: "Reads JSON data from standard input and writes CSV data to standard output",
            cmd: 'command-that-produces-json | to-csv -',
        },
        {
            name: "Reads JSON data from standard input and writes a CSV data file",
            cmd: 'command-that-produces-json | to-csv output-file.csv',
        },
        {
            name: "Reads a JSON data file and writes a CSV data file",
            cmd: 'to-csv input-file.json output-file.csv',
        },
        {
            name: "Reads a YAML data file and writes a CSV data file",
            cmd: 'to-csv input-file.yaml output-file.csv',
        },
    ],
};
