import { inputData, readStdin } from "../lib/io";
import { asTree } from "treeify";
import { run } from "../lib/command";
import { standardCmdInputs, standardInputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);

    console.log(asTree(data, true, true));
}
    
export const documentation = {
    name: "format-tree",
    desc: "Formats data to tree rendered in ascii.",
    syntax: "format-tree <input-file>",
    inputs: standardCmdInputs,
    outputs: [
        "A tree rendered in ascii output to standard output."
    ],
    args: [
        standardInputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, renders the data to an ascii tree on standard output",
            cmd: 'command-that-produces-json | format-tree -',
        },
        {
            name: "Reads data from a JSON file, renders the data to an ascii tree on standard output",
            cmd: 'format-tree input-file.json',
        },
        {
            name: "Reads data from a YAML file, renders the data to an ascii tree on standard output",
            cmd: 'format-tree input-file.yaml',
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}