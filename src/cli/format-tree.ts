import { readStdin } from "../lib/read-stdin";
import { asTree } from "treeify";

async function main() {
    const input = await readStdin();
    const data = JSON.parse(input);
    console.log(asTree(data, true, true));
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });