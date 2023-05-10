import { inputData, outputData } from "../lib/io";
import { run } from "../lib/command";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    
    await outputData(argv, data, "yaml");
}

export const documentation = {
    name: "to-yaml",
    desc: "Converts data from the JSON data format to the YAML data format.",
    syntax: "to-yaml <input-file> [<yaml-output-file>]",
    inputs: standardCmdInputs,
    outputs: [
        "YAML file",
        "YAML formatted data on standard output",
    ],
    args: [
        standardInputFileHelp,
        {
            name: "yaml-output-file",
            desc: "The name of a file (must be a YAML file) to output the resulting dataset to. Omitting this causes YAML data to be written to standard output.",
        },
    ],
    examples: [
        {
            name: "Reads JSON data from standard input and writes YAML data to standard output",
            cmd: 'command-that-produces-json | to-yaml -',
        },
        {
            name: "Reads JSON data from standard input and writes a YAML data file",
            cmd: 'command-that-produces-json | to-yaml output-file.yaml',
        },
        {
            name: "Reads a JSON data file and writes a YAML data file",
            cmd: 'to-yaml input-file.json output-file.yaml',
        },
        {
            name: "Reads a CSV data file and writes a YAML data file",
            cmd: 'to-yaml input-file.csv output-file.yaml',
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}