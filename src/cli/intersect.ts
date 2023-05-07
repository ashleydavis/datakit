import { readJson } from "..";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import { outputJson } from "../lib/io";
import { verifyArray } from "../lib/verify";

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

    const left = await readJson(leftFileName); //todo: This should be allowed to use - for stdin.
    verifyArray(left, "left input", "intersect");

    const right = await readJson(rightFileName);
    verifyArray(right, "right input", "intersect");

    const leftKeys = left.map(record => {
        return invokeUserFn(() => leftSelectorFn.fn(record), leftSelectorFn.details);
    });
    const rightKeys = right.map(record => {
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

    await outputJson(argv, output);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });