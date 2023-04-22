import { fromJson, toJson } from "..";
import { readStdin } from "../lib/read-stdin";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import { isArray } from "util";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const keySelectors: any[] = [];

    while (argv._.length > 0) {
        const keySelectorFn = loadTransformFn(argv); //todo: this needs multiple transform fns.
        keySelectors.push(keySelectorFn);
    }

    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'map' to be an array.`);
    }

    data.sort((a: any, b: any): number => {
        for (const keySelector of keySelectors) {
            const A = keySelector(a);
            const B = keySelector(b);
            if (A === B) {
                // Nothing.
            }
            else if (A > B) {
                return 1;
            }
            else {
                return -1;
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