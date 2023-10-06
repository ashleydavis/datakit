import { inputData, outputData, outputDataToFile } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { Flags, pullOptions } from "./lib/args";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[], flags: Flags): Promise<void> {

    if (argv.length < 1) {
        throw new Error(`Expected <number> argument for output file name prefix.`);
    }

    const outputFileNamePrefix = argv.shift()!;
    let outputFileNameSuffix = "json";

    if (argv.length > 0) {
        outputFileNameSuffix = argv.shift()!;
    }

    const data = await inputData(argv);
    verifyInputArray(data, "split-to-files");

    for (let i = 0; i < data.length; i++) {
        const record = data[i];
        await outputDataToFile(record, `${outputFileNamePrefix}-${i+1}.${outputFileNameSuffix}`);
    }
}

export const documentation = {
    name: "split-to-files",
    desc: "Writes a separate file for each record in the dataset. This command does not write to standard output.",
    syntax: "split-to-files [<output-file-prefix>] [<output-file-suffix>] [<input-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "JSON files",
        "CSV files",
        "YAML files",
    ],
    args: [
        {
            name: "output-file-prefix",
            desc: "Specifies the prefix for output files. Each file created is numbered sequentially, starting with 1.",
        },
        {
            name: "output-file-suffix",
            desc: "Specifies the suffix for output files. Either 'csv', 'json', 'yaml' or 'yml'. Defaults to 'json'.",
        },
        standardInputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input and writes each records to a set of JSON files my-output-1.json, my-output-2.json and so on. Replace 'json' with 'csv' or 'yaml' to write CSV or YAML files instead.",
            cmd: 'command-that-produces-json | split-to-files my-output- json',
        },
    ],
};
