import { inputData, outputData } from "../lib/io";
import { IUserFnDetails, invokeUserFn, loadUserFn } from "./lib/user-fn";
import { verifyInputArray } from "../lib/verify";
import { standardCmdInputs, standardCmdOutputs, standardInputFileHelp, standardOutputFileHelp } from "./lib/help";

type SortDirection = "ascending" | "descending";
interface ISortCriteria {
    keySelectorFn: { fn: Function, details: IUserFnDetails };
    direction: SortDirection;
}

export async function main(argv: string[]): Promise<void> {

    const sortCriteria: ISortCriteria[] = [];
    let lastSortDirection: SortDirection = "ascending";

    while (argv.length > 0) {
        const keySelectorFn = loadUserFn(argv, `r => r.key`);

        let sortDirection: SortDirection | undefined;

        if (argv.length > 0) {
            const nextArg = argv[0];
            if (nextArg === "ascending" || nextArg === "descending") {
                sortDirection = argv.shift() as SortDirection;
            }
        }

        if (sortDirection !== undefined) {
            lastSortDirection = sortDirection;
        }
        else {
            sortDirection = lastSortDirection;
        }

        sortCriteria.push({
            keySelectorFn,
            direction: sortDirection,
        });
    }

    const data = await inputData(argv);
    verifyInputArray(data, "orderBy");

    data.sort((a: any, b: any): number => {
        if (sortCriteria.length === 0) {
            // No sort critera specified.
            // Sort values directly in ascending order.
            if (a === b) {
                return 0;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            for (const criteria of sortCriteria) {
                const keySelector = criteria.keySelectorFn;
                const A = invokeUserFn(() => keySelector.fn(a), keySelector.details);
                const B = invokeUserFn(() => keySelector.fn(b), keySelector.details);
                let comparison = -1;
                if (A === B) {
                    comparison = 0;
                }
                else if (A > B) {
                    comparison = 1;
                }
    
                if (criteria.direction === "descending") {
                    // Inverts the comparison.
                    comparison = -comparison;
                }
    
                if (comparison !== 0) {
                    return comparison;
                }
            }
        }

        return 0;
    });

    await outputData(argv, data);
}

export const documentation = {
    name: "orderBy",
    desc: "Sorts the input dataset by the requested criteria and outputs the sorted dataset. Works a bit like `array.sort` in JavaScript, but really it's way more advanced.",
    syntax: `orderBy (<sort-fn> [<sort-direction>])+ [<input-file>] [<output-file>]`,
    inputs: standardCmdInputs,
    outputs: standardCmdOutputs,
    args: [
        {
            name: "sort-fn",
            desc: "A JavaScript function to select the sort key from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.",
        },
        {
            name: "sort-direction",
            desc: `Optional sort direction that may be "ascending" or "descending". Defaults to "ascending".`,
        },
        standardInputFileHelp,
        standardOutputFileHelp,
    ],
    examples: [
        {
            name: "Reads JSON data from standard input, sorts by email and writes to standard output",
            cmd: 'command-that-produces-json | orderBy "record => record.email"',
        },
        {
            name: "Reads data from a file, sorts by email and writes to standard output",
            cmd: 'orderBy "record => record.email" input-file.csv ',
        },
        {
            name: "Reads data from a file, sorts by email and writes output to another file",
            cmd: 'orderBy "record => record.email" input-file.csv output-file.csv'
        },
        {
            name: "Loads the sort function from a JavaScript file",
            cmd: 'orderBy --file my-sort-fn.js input-file.csv',
        },
        {
            name: "Reads JSON data from standard input, sorts by name and then by age (a nested sort) and writes to standard output",
            cmd: 'orderBy "r => r.email" "r => r.age" - output-file.csv'
        },
        {
            name: "Reads JSON data from standard input, sorts by age (oldest to youngest) and writes to standard output",
            cmd: 'orderBy "r => r.age" descending - output-file.csv'
        },
    ],
    notes: [
        "The sort function and sort direction can be stacked up to create nested levels of sorting."
    ]
};
