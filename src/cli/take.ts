import { inputData, outputData } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "skip");

    if (argv.length < 1) {
        throw new Error(`Expected <number> argument for number of records to take.`);
    }

    const number = parseInt(argv.shift()!);

    const taken = data.slice(0, number);
    await outputData(argv, taken);
}


export const documentation = {
    name: "take",
    desc: "Takes the first X records of the input dataset and writes them to the output dataset.",
    syntax: "take <input-file> <take-number> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        {
            name: "take-number",
            desc: "The number of records to take.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, takes 3 records and writes them to standard output",
            cmd: 'command-that-produces-json | take - 3',
        },
        { 
            name: "Reads data from a file, takes 3 records and writes them to standard output",
            cmd: 'take input-file.csv 3',
        },
        {
            name: "Reads data from a file, takes 3 records and writes them to another file",
            cmd: 'take input-file.csv 3 output-file.csv'
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}