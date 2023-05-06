import { inputJson, outputJson } from "../lib/io";
import { IUserFnDetails, invokeUserFn, loadUserFn } from "./lib/user-fn";
import { isArray } from "../lib/utils";
import { consumeOptionalArg } from "./lib/args";

type SortDirection = "ascending" | "descending";
interface ISortCriteria {
    keySelectorFn: { fn: Function, details: IUserFnDetails };
    direction: SortDirection;
}

async function main() {
    const argv = process.argv.slice(2);

    const data = await inputJson(argv);
    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    const sortCriteria: ISortCriteria[] = [];
    let lastSortDirection: SortDirection = "ascending";

    while (argv.length > 1) {
        const keySelectorFn = loadUserFn(argv, `r => r.key`);

        let direction = consumeOptionalArg(argv, ["--dir", "--direction"], "ascending|descending");
        if (direction !== undefined) {
            lastSortDirection = direction as SortDirection;
        }
        else {
            direction = lastSortDirection;
        }

        sortCriteria.push({
            keySelectorFn,
            direction: direction as SortDirection,
        });
    }

    data.sort((a: any, b: any): number => {
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

        return 0;
    });

    outputJson(data);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });