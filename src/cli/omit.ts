import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";
import { isArray } from "../lib/utils";

//
// Omit fields from the input data.
//
export function omit(fields: string[], data: any): any {
    
    const transformed: any = {};
    const fieldSet = new Set(fields);

    for (const [field, value] of Object.entries(data)) {
        if (!fieldSet.has(field)) {
            transformed[field] = value;
        }
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
        transformed = data.map(record => omit(fields, record));
    }
    else {
        transformed = omit(fields, data);
    }

    await outputData(argv, transformed);
}

export const documentation = {
    name: "omit",
    desc: "Creates a new dataset by omitting the specified fields from the input dataset.",
    syntax: "omit <fields> [<input-file>] [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "fields",
            desc: "Comma-separated list of field names to omit from the input data",
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, omits some fields and writes to standard output",
            cmd: 'command-that-produces-json | omit ColumnA,ColumnB,ColumnC',
        },
        {
            name: "Reads data from a file, omits some fields and writes to standard output",
            cmd: 'omit ColumnA,ColumnB,ColumnC input-file.csv',
        },
        {
            name: "Reads data from a file, omits some fields and writes output to another file",
            cmd: 'omit ColumnA,ColumnB,ColumnC input-file.csv output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, omits some fields and writes output to another file",
            cmd: 'command-that-produces-json | omit ColumnA,ColumnB,ColumnC - output-file.csv'
        },
    ],
    seeAlso: [
        {
            cmd: "pick",
            desc: "The pick command is the opposite of the omit command.",
        },
    ],
    notes: [
        "The input data can be an array of objects or a single object.",
    ],
};
