import { fromJson, toJson } from "..";
import { readStdin } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const keySelectors: any[] = [];
    let sortDirections: ("ascending" | "descending")[];;

    while (argv._.length > 0) {
        const keySelectorFn = loadTransformFn(argv);
        keySelectors.push(keySelectorFn);
    }

    if (argv.direction) {
        if (isArray(argv.direction)) {
            sortDirections = argv.direction;
            let lastSpecified = argv.direction.length - 1;

            for (let i = sortDirections.length; i < keySelectors.length; ++i) {
                sortDirections.push(argv.direction[lastSpecified]);
            }
        }
        else {
            sortDirections = [];

            for (let i = 0; i < keySelectors.length; ++i) {
                sortDirections.push(argv.direction);
            }
        }
    }
    else {
        sortDirections = [];

        for (let i = 0; i < keySelectors.length; ++i) {
            sortDirections.push("ascending");
        }
    }

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    data.sort((a: any, b: any): number => {
        for (let i = 0; i < keySelectors.length; ++i) {
            const keySelector = keySelectors[i];
            const A = keySelector(a);
            const B = keySelector(b);
            let comparison = -1;
            if (A === B) {
                comparison = 0;
            }
            else if (A > B) {
                comparison = 1;
            }

            if (sortDirections[i] === "descending") {
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