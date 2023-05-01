import minimist, { ParsedArgs } from "minimist";
import "../cli/lib/load-globals";

//
// Parses args before invoking a command then handling errors.
//
export async function run(invoke: (argv: ParsedArgs) => Promise<void>): Promise<void> {

    const argv = minimist(process.argv.slice(2));

    try {
        await invoke(argv);
    }
    catch (err: any) {
        if (err.message) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error(`Failed with error:`);
            console.error(err);
        }
        process.exit(1);
    }
}