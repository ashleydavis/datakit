import * as readline from "readline";

//
// Reads data from standard input.
//
export function readStdin(): Promise<string> {
    return new Promise<string>(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
        });

        let input = "";

        rl.on("line", (line: string) => {
            input += line + '\n';
        });

        rl.on("close", () => {
            resolve(input);
        });
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