import * as readline from "readline";

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
// Input data from JSON on standard input.
// 
export async function inputJson(): Promise<any> {
    const input = await readStdin();
    return JSON.parse(input);
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