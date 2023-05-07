import { inputJson, outputJson } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { verifyInputArray } from "../lib/verify";

async function main() {
    const argv = process.argv.slice(2);
    const data = await inputJson(argv);
    verifyInputArray(data, "group");

    const keySelectorFn = loadUserFn(argv, `r => r.key`);

    interface IGroup {
        key: any;
        records: any[];
    }
    const groups: IGroup[] = [];
    const groupMap: any = {};

    for (const record of data) {
        const key = invokeUserFn(() => keySelectorFn.fn(record), keySelectorFn.details);
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

    await outputJson(argv, groups);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });