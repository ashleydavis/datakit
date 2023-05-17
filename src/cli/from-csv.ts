import { inputData, outputData } from "../lib/io";
import { standardCmdOutputs, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv, "csv");

    await outputData(argv, data);
}

export const documentation = {
    name: "from-csv",
    desc: "Converts data from the CSV (comma separated values) data format to the JSON data format.",
    syntax: "from-csv [<csv-input-file>] [<output-file>]",
    inputs: [
        "CSV file",
        "CSV formatted data on standard input",
    ],
    outputs: standardCmdOutputs,
    args: [
        {
            name: "input-file",
            desc: "Can be an input file name (must be a CSV file) or a hypen to indicate reading CSV data from standard input.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads CSV data from standard input and writes JSON data to standard output",
            cmd: 'command-that-produces-csv | from-csv -',
        },
        {
            name: "Reads data from a CSV file and writes JSON data to standard output",
            cmd: 'from-csv input-file.csv',
        },
        {
            name: "Reads data from a CSV file and writes output to a YAML data file",
            cmd: 'from-csv input-file.csv output-file.yaml'
        },
        {
            name: "Reads data from a CSV file and writes output to a Json data file",
            cmd: 'from-csv input-file.csv output-file.json'
        },
    ],
};
