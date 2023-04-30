import { fromJson } from "..";
import { readStdin } from "../lib/io";
import minimist from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = minimist(process.argv.slice(2));

    const keySelectorFn = loadTransformFn(argv);
    const input = await readStdin();
    const data = fromJson(input);

    if (!isArray(data)) {
        throw new Error(`Expected input to 'group' to be an array.`);
    }

    interface IGroup {
        key: any;
        records: any[];
    }
    const groups: IGroup[] = [];
    const groupMap: any = {};

    for (const record of data) {
        const key = keySelectorFn(record);
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

    console.log(JSON.stringify(groups, null, 4));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });