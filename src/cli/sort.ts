import { fromJson, toJson } from "..";
import { readStdin } from "../lib/io";
import { loadUserFn } from "./lib/user-fn";
import { isArray } from "../lib/utils";
import { consumeOptionalArg } from "./lib/args";

type SortDirection = "ascending" | "descending";
interface ISortCriteria {
    keySelectorFn: Function;
    direction: SortDirection;
}

async function main() {
    const argv = process.argv.slice(2);

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

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    data.sort((a: any, b: any): number => {
        for (const criteria of sortCriteria) {
            const keySelector = criteria.keySelectorFn;
            const A = keySelector(a);
            const B = keySelector(b);
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

    console.log(toJson(data));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });