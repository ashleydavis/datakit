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
// Writes to standard output.
//
export function writeStdout(data: string): void {
    process.stdout.write(data);
}