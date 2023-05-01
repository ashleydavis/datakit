import { inputJson, outputJson } from "../lib/io";
import { ParsedArgs } from "minimist";
import { loadTransformFn } from "./lib/transform-fn";
import { verifyInputArray } from "../lib/verify";
import { run } from "../lib/command";

export async function main(argv: ParsedArgs): Promise<void> {

    const transformFn = loadTransformFn(argv);
    const data = await inputJson();
    verifyInputArray(data, "map");

    const transformed = data.map(transformFn as any);

    outputJson(transformed);
}

if (require.main === module) {
    run(main);
}
