import { inputData, outputData } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

export async function main(argv: string[]): Promise<void> {

    const data = await inputData(argv);
    verifyInputArray(data, "group");

    const keySelectorFn = loadUserFn(argv, `r => r.key`);

    interface IGroup {
        key: any;
        records: any[];
    }
    const groups: IGroup[] = [];
    const groupMap: any = {};

    for (const record of data) {
        const key = invokeUserFn(() => keySelectorFn.fn(record), keySelectorFn.details);
        if (groupMap[key] === undefined) {
            let group = {
                key: key,
                records: [],
            };
            groups.push(group);
            groupMap[key] = group;
        }

        groupMap[key].records.push(record);
    }

    await outputData(argv, groups);
}

export const documentation = {
    name: "group",
    desc: "Organises records from an input dataset into groups based on a key.",
    syntax: "group <input-file> <key-selector-fn> [<output-file>]",
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        standardInputFileHelp,
        {
            name: "key-selector-fn",
            desc: "A JavaScript function to select the grouping key for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: `Reads JSON data from standard input, groups by "department" and writes the groups to standard output`,
            cmd: 'command-that-produces-json | group - "record => record.department"',
        },
        {
            name: `Reads data from a file, groups by "department" and writes the groups to standard output`,
            cmd: 'group input-file.csv "record => record.department"',
        },
        {
            name: `Reads data from a file, groups by "department" and counts total sales, writing the output to a file`,
            cmd: 'group input-file.csv "r => r.department" | map - "g => ({ department: g.key, totalSales: g.records.length })" output-file.csv',
        },
    ],
};

if (require.main === module) {
    run(main, documentation);
}