import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { inputData, outputData } from "../lib/io";
import { verifyArray } from "../lib/verify";
import { run } from "../lib/command";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardInputFileHelpDesc, standardOutputFileHelp } from "./lib/help";


export async function main(argv: string[]): Promise<void> {

    const exampleFn = `r => r.key`;
    const left = await inputData(argv);
    verifyArray(left, "left dataset", "intersect");
    const leftSelectorFn = loadUserFn(argv, exampleFn);
    const right = await inputData(argv);
    verifyArray(right, "right dataset", "intersect");
    const rightSelectorFn = loadUserFn(argv, exampleFn);
    const mergeFn = loadUserFn(argv, `(left, right) => merge(left, right)`);

    const leftKeys = left.map((record: any) => {
        return invokeUserFn(() => leftSelectorFn.fn(record), leftSelectorFn.details);
    });

    const rightKeys = right.map((record: any) => {
        return invokeUserFn(() => rightSelectorFn.fn(record), rightSelectorFn.details);
    });

    //
    // Index the left hand side data.
    //
    const leftMap: any = {};

    for (let i = 0; i < left.length; ++i) {
        const record = left[i];
        const key = leftKeys[i];
        if (leftMap[key] === undefined) {
            leftMap[key] = [];
        }

        leftMap[key].push({
            record,
            index: i,
        });
    }    

    //
    // Index the right hand side data.
    //
    const rightMap: any = {};

    for (let i = 0; i < right.length; ++i) {
        const record = right[i];
        const key = rightKeys[i];
        if (rightMap[key] === undefined) {
            rightMap[key] = [];
        }

        rightMap[key].push({
            record,
            index: i,
        });
    }    

    //
    // Generate the merged output.
    //

    const combinations: any = {}; // Records combinations already generated.
    const output = [];

    for (let leftIndex = 0; leftIndex < left.length; ++leftIndex) {
        const leftRecord = left[leftIndex]
        const leftKey = leftKeys[leftIndex];
        const rightMatches = rightMap[leftKey];
        if (rightMatches && rightMatches.length > 0) {
            for (const right of rightMatches) {
                const rightIndex = right.index;
                const comboKey = `${leftIndex}-${rightIndex}`;
                if (!combinations[comboKey]) {
                    // This combination is not recorded yet.
                    combinations[comboKey] = true;

                    const merged = invokeUserFn(() => mergeFn.fn(leftRecord, right.record), mergeFn.details);
                    if (merged !== undefined) {
                        output.push(merged);
                    }
                }
            }
        }
        else {
            const merged = invokeUserFn(() => mergeFn.fn(leftRecord, undefined), mergeFn.details);
            if (merged !== undefined) {
                output.push(merged);
            }
        }
    }

    for (let rightIndex = 0; rightIndex < right.length; ++rightIndex) {
        const rightRecord = right[rightIndex]
        const rightKey = rightKeys[rightIndex];
        const leftMatches = leftMap[rightKey];
        if (leftMatches && leftMatches.length > 0) {
            for (const left of leftMatches) {
                const leftIndex = left.index;
                const comboKey = `${leftIndex}-${rightIndex}`;
                if (!combinations[comboKey]) {
                    // This combination is not recorded yet.
                    combinations[comboKey] = true;

                    const merged = invokeUserFn(() => mergeFn.fn(left.record, rightRecord), mergeFn.details);
                    if (merged !== undefined) {
                        output.push(merged);
                    }
                }
            }
        }
        else {
            const merged = invokeUserFn(() => mergeFn.fn(undefined, rightRecord), mergeFn.details);
            if (merged !== undefined) {
                output.push(merged);
            }
        }
    }

    await outputData(argv, output);
}

export const documentation = {
    name: "intersect",
    desc: "Aggregates two data sets with common keys kind of like an SQL join.",
    syntax: "intersect <left-input-file> <left-key-selector-fn> <right-input-file> <right-key-selector-fn> <merge-fn> [<output-file>]",
    inputs: standardCmdInputs,
    inputCount: 2,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "left-input-file",
            desc: standardInputFileHelpDesc,
        },
        {
            name: "left-key-selector-fn",
            desc: "A JavaScript function to select the join key for each record of the left dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "right-input-file",
            desc: standardInputFileHelpDesc,
        },
        {
            name: "right-key-selector-fn",
            desc: "A JavaScript function to select the join key for each record of the right dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "merge-fn",
            desc: "A JavaScript function to merge records from left and right datasets. Specifying a file name will load the JavaScript code from the file.",
        },
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: `Reads two JSON files and merges the datasets based on the "email" field, writes output to a JSON file`,
            cmd: 'intersect left-input.json "r => r.email" right-input.json "r => r.email" "(left, right) => ({ ...left, ...right })" output.json',
        },
    ],
    notes: [
        "You can only read input data from standard input from one of the left or right datasets.",
    ]
};

if (require.main === module) {
    run(main, documentation);
}