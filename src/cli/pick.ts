import { inputData, outputData } from "../lib/io";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";
import { isArray } from "../lib/utils";

//
// Pick fields from the input data.
//
export function pick(fields: string[], data: any): any {

    const transformed: any = {};

    for (const field of fields) {
        transformed[field] = data[field];
    }

    return transformed;
}

export async function main(argv: string[]): Promise<void> {

    if (argv.length < 1) {
        throw new Error(`Expected <fields> argument for the field names to pick from the input data.`);
    }

    const fieldsArg = argv.shift()!;
    const fields = fieldsArg.split(",").map(field => field.trim());

    const data = await inputData(argv);
    
    let transformed: any;
    if (isArray(data)) {
        transformed = data.map(record => pick(fields, record));
    }
    else {
        transformed = pick(fields, data);
    }

    await outputData(argv, transformed);
}

export const documentation = {
    name: "pick",
    desc: "Creates a new dataset by picking the specified fields from the input dataset.",
    syntax: "pick <fields> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "fields",
            desc: "Comma-separated list of field names to pick from the input data",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, picks some fields and writes to standard output",
            cmd: 'command-that-produces-json | pick ColumnA,ColumnB,ColumnC',
        },
        {
            name: "Reads data from a file, picks some fields and writes to standard output",
            cmd: 'pick ColumnA,ColumnB,ColumnC input-file.csv',
        },
        {
            name: "Reads data from a file, picks some fields and writes output to another file",
            cmd: 'pick ColumnA,ColumnB,ColumnC input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, picks some fields and writes output to another file",
            cmd: 'command-that-produces-json | pick ColumnA,ColumnB,ColumnC - output-file.csv'
        },
    ],
    seeAlso: [
        {
            cmd: "omit",
            desc: "The omit command is the opposite of the pick command.",
        },
    ],
    notes: [
        "The input data can be an array of objects or a single object.",
    ],
};