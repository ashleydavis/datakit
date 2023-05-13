import { inputData, outputData, } from "../lib/io";
import { standardCmdOutputs, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {
    
    const data = await inputData(argv, "yaml");

    await outputData(argv, data);
}

export const documentation = {
    name: "from-yaml",
    desc: "Converts data from the YAML data format to the JSON data format.",
    syntax: "from-yaml <yaml-input-file> [<output-file>]",
    inputs: [
        "YAML file",
        "YAML formatted data on standard input",
    ],
    outputs: standardCmdOutputs,
    args: [
        {
            name: "input-file",
            desc: "Can be an input file name (must be a YAML file) or a hypen to indicate reading YAML data from standard input.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads YAML data from standard input and writes JSON data to standard output",
            cmd: 'command-that-produces-yaml | from-yaml -',
        },
        {
            name: "Reads data from a YAML file and writes JSON data to standard output",
            cmd: 'from-yaml input-file.yaml',
        },
        {
            name: "Reads data from a YAML file and writes output to a CSV data file",
            cmd: 'from-yaml input-file.yaml output-file.csv'
        },
        {
            name: "Reads data from a YAML file and writes output to a JSON data file",
            cmd: 'from-yaml input-file.yaml output-file.json'
        },
    ],
};
