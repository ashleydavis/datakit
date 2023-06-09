import { inputData, outputDataToStdout } from "../lib/io";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    if (argv.length === 0) {
        throw new Error("At least one input file must be specified");        
    }

    const datasets = [];

    while (argv.length > 0) {
        const data = await inputData(argv);
        verifyInputArray(data, "concat");
        datasets.push(data);  
    }

    const concatenated = datasets[0].concat(...datasets.slice(1));
    outputDataToStdout(concatenated);
}

export const documentation = {
    name: "concat",
    desc: "Creates an output dataset by concatenating multiple input datasets. Works like `array.concat` in JavaScript.",
    syntax: "concat ...<input-file>",
    inputs: standardCmdInputs,
    outputs: [ "JSON formatted data on standard output" ],
    args: [
        {
            name: "...input-file",
            desc: "One or more input file names (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.",
        },
    ],
    examples: [
        {
            name: "Concatenates the data from multiple files and writes the result to standard output",
            cmd: 'concat input-file1.json input-file2.json input-file3.json',
        },
        {
            name: "Reads JSON data from standard input concatenates it with a file and writes the result to standard output",
            cmd: 'command-that-produces-json | concat - input-file.json',
        },
        {
            name: "Concatenates the data from multiple files and writes the result to a file",
            cmd: 'concat input-file1.json input-file2.json input-file3.json > output-file.json',
        },
    ],
    notes: [
        "This command (unlike most others in Datakit) isn't able to output directly to a file. Use redirection to write a file, shown in the example above.",
    ],
};

