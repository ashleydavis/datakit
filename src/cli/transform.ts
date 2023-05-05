import { inputJson, outputJson } from "../lib/io";
import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";

async function main() {
    const argv = process.argv.slice(2);

    const { fn, loadSourceCode, fileName } = loadUserFn(argv, `dataset => transform(dataset)`);

    const data = await inputJson();

    const transformed = invokeUserFn({ 
        fn: () => fn(data),
        loadSourceCode,
        fileName,
    });

    outputJson(transformed);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });