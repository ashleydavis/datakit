import * as readline from "readline";
import { readFile } from "..";
import { readJson } from "..";
import { readCsv } from "..";
import { readYaml } from "..";

//
// Reads data from standard input.
//
export function readStdin(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
        });

        let input = "";

        let timeout: NodeJS.Timeout | undefined = undefined;
        let timedout = false;
        
        //
        // Cancels the timeout, if it's still in progress.
        //
        function cancelTimeout() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }            
        }

        //
        // Starts a new timeout (cancelling any previous timeout).
        //
        function startTimeout() {
            cancelTimeout();
            timeout = setTimeout(() => {
                timedout = true;
                reject(new Error(`Timed out with no input on standard input.`));
            }, 1000 * 5);  
        };

        rl.on("line", (line: string) => {
            if (timedout) {
                return;
            }
            input += line + '\n';
            startTimeout();
        });

        rl.on("close", () => {
            if (timedout) {
                return;
            }
            
            cancelTimeout();
            resolve(input);
        });

        startTimeout();
    });
}

//
// Input data from a data file or JSON on standard input.
// 
export async function inputJson(argv: string[]): Promise<any> {
    if (argv.length === 0) {
        throw new Error(`Expected a file name for input data. For example foo.csv, foo.json, foo.yaml or foo.yml. Use a hyphen (-) to read JSON data from standard input.`);
    }
    else {
        const fileName = argv.shift()!.toLowerCase();
        if (fileName === "-") {
            
            const input = await readStdin();
            return JSON.parse(input);
        }
        else {
            if (fileName.endsWith(".json")) {
                return await readJson(fileName);
            }
            else if (fileName.endsWith(".csv")) {
                return await readCsv(fileName);
            }
            else if (fileName.endsWith(".yaml")) {
                return await readYaml(fileName);
            }
            else if (fileName.endsWith(".yml")) {
                return await readYaml(fileName);
            }
            else {
                throw new Error(`Expected a file name for input data. The file name should end with .json, .csv, .yaml or .yml. Use a hyphen (-) to read JSON data from standard input.`);
            }
        }
    }
}

//
// Writes to standard output.
//
export function writeStdout(data: string): void {
    process.stdout.write(data);
}

//
// Outputs data as JSON to standard output.
//
export function outputJson(data: any): void {
    writeStdout(JSON.stringify(data, null, 4));
}