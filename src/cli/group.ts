import { inputJson, outputJson } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";

async function main() {
    const argv = process.argv.slice(2);
    const keySelectorFn = loadUserFn(argv, `r => r.key`);
    const data = await inputJson();

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
        const key = invokeUserFn({
            fn: () => keySelectorFn.fn(record),
            loadSourceCode: keySelectorFn.loadSourceCode,
            fileName: keySelectorFn.fileName,
        }); 
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

    outputJson(groups);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });