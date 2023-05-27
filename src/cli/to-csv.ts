import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { pullOptions } from "./lib/args";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const options = pullOptions(documentation.options, argv);

    const data = await inputData(argv);
    verifyInputArray(data, "to-csv");

    await outputData(argv, data, "csv", {
        columnNames: options.columns.split(",").map(column => column.trim()),
    });
}

export const documentation = {
    name: "to-csv",
    desc: "Converts data from the JSON data format to the CSV data format.",
    syntax: "to-csv [options] [<input-file>] [<csv-output-file>]",
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
    options: [
        { 
            names: [ 'columns', 'c' ],
            placeholder: '<column-names>',
            example: "ColumnA,ColumnB,ColumnC",
            desc: "Sets the columns (and their order) that will be included in the output CSV"
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
        {
            name: "Writes a CSV file setting the column names",
            cmd: 'to-csv input-file.json output-file.csv --columns ColumnA,ColumnB,ColumnC',
        },
    ],
};
