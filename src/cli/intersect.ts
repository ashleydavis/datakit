import { fromCsv, readJson, toJson } from "..";
import { loadUserFn } from "./lib/user-fn";
import { isArray } from "../lib/utils";

async function main() {
    const argv = process.argv.slice(2);
    if (argv.length !== 5) {
        throw new Error(`Usage: intersect <left-selector-fn> <left-file-name> <right-selector-fn> <right-file-name> <merge-fn>`);
    }

    const exampleFn = `r => r.key`;
    const leftSelectorFn = loadUserFn(argv, exampleFn);
    const leftFileName = argv.shift()!;
    const rightSelectorFn = loadUserFn(argv, exampleFn);
    const rightFileName = argv.shift()!;
    const mergeFn = loadUserFn(argv, `(left, right) => merge(left, right)`);

    const left = await readJson(leftFileName);
    if (!isArray(left)) {
        throw new Error(`Expect an array loaded from ${leftFileName}`);
    }

    const right = await readJson(rightFileName);
    if (!isArray(right)) {
        throw new Error(`Expect an array loaded from ${rightFileName}`);
    }

    const leftKeys = left.map(record => leftSelectorFn(record));
    const rightKeys = right.map(record => rightSelectorFn(record));

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

    const combinations: any = {}; // Records cominations already generated.
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

                    const merged = mergeFn(leftRecord, right.record);
                    if (merged !== undefined) {
                        output.push(merged);
                    }
                }
            }
        }
        else {
            const merged = mergeFn(leftRecord, undefined);
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

                    const merged = mergeFn(left.record, rightRecord);
                    if (merged !== undefined) {
                        output.push(merged);
                    }
                }
            }
        }
        else {
            const merged = mergeFn(undefined, rightRecord);
            if (merged !== undefined) {
                output.push(merged);
            }
        }
    }

    console.log(toJson(output));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });