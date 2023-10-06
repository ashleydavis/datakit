import * as readline from "readline";
import { fromCsv, fromYaml, readFile, toCsv, toYaml, writeCsv, writeJson, writeYaml } from "..";
import { readJson } from "..";
import { readCsv } from "..";
import { readYaml } from "..";
import { isArray } from "./utils";
import { ICsvOutputConfig } from "..";

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
                reject(new Error(`Timed out with no input on standard input. Use argument --help to get help about this command.`));
            }, 1000 * 30);  
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

type DataFormat = "json" | "csv" | "yaml";

//
// Reads data from standard input in the requested format.
// Data format defaults to JSON if none is specified.
//
export async function inputDataFromStdin(expectedFormat?: DataFormat): Promise<any> {
    const input = await readStdin();
    if (expectedFormat === undefined || expectedFormat === "json") {
        return JSON.parse(input);
    }
    else if (expectedFormat == "csv") {
        return fromCsv(input);
    }
    else if (expectedFormat === "yaml") {
        return fromYaml(input);
    }
    else {
        throw new Error(`Unexpected data format: ${expectedFormat}`);
    }
}

//
// Input data from a data file or standard input.
// 
export async function inputData(argv: string[], expectedFormat?: DataFormat): Promise<any> {
    if (argv.length === 0) {
        //
        // Default to reading JSON data from standard input.
        //
        return await inputDataFromStdin(expectedFormat);
    }
    else {
        const fileName = argv.shift()!.toLowerCase();
        if (fileName === "-") {
            //
            // Explicitly read JSON data from standard input.
            //
            return await inputDataFromStdin(expectedFormat);
        }
        else {
            if (expectedFormat === undefined) {
                //
                // Choose data format from the file extension.
                //
                expectedFormat = determineFormat(fileName);
            }

            //
            // Load data from the requested file.
            //
            if (expectedFormat === "json") {
                return await readJson(fileName);
            }
            else if (expectedFormat === "csv") {
                return await readCsv(fileName);
            }
            else if (expectedFormat === "yaml") {
                return await readYaml(fileName);
            }
            else {
                throw new Error(`Unexpected data format: ${expectedFormat}`);
            }
        }
    }
}

//
// Figure out the data format from the file name.
//
function determineFormat(fileName: string): DataFormat {
    if (fileName.endsWith(".json")) {
        return "json";
    }
    else if (fileName.endsWith(".csv")) {
        return "csv";
    }
    else if (fileName.endsWith(".yaml")) {
        return "yaml";
    }
    else if (fileName.endsWith(".yml")) {
        return "yaml";
    }
    else {
        throw new Error(`Failed to identify data format from file name: "${fileName}"`);
    }
}

//
// Writes text to standard output.
//
export function writeStdout(data: string): void {
    process.stdout.write(data);
}

//
// Write data to standard output in the requested format.
// Data format defaults to JSON if none is specified.
//
export function outputDataToStdout(data: any, expectedFormat?: DataFormat, config?: ICsvOutputConfig): void {

    let formattedData: string;

    if (expectedFormat === undefined || expectedFormat === "json") {
        formattedData = JSON.stringify(data, null, 4);
    }
    else if (expectedFormat == "csv") {
        if (!isArray(data)) {
            throw new Error(`To write csv to standard output, expect the data to be an array of records. Instead got "${typeof data}".`);
        }
        formattedData = toCsv(data, config);
    }
    else if (expectedFormat === "yaml") {
        formattedData = toYaml(data);
    }
    else {
        throw new Error(`Unexpected data format: ${expectedFormat}`);
    }

    writeStdout(formattedData);
}

//
// Outputs data to a name file.
//
export async function outputDataToFile(data: any, fileName: string, expectedFormat?: DataFormat, config?: ICsvOutputConfig) {

    if (expectedFormat === undefined) {
        //
        // Choose data format from the file extension.
        //
        expectedFormat = determineFormat(fileName);
    }

    //
    // Load data from the requested file.
    //
    if (expectedFormat === "json") {
        await writeJson(fileName, data);
    }
    else if (expectedFormat === "csv") {
        if (!isArray(data)) {
            throw new Error(`To write csv file ${fileName}, expect the data to be an array of records. Instead got "${typeof data}".`);
        }
        await writeCsv(fileName, data, config);
    }
    else if (expectedFormat === "yaml") {
        return await writeYaml(fileName, data);
    }
    else {
        throw new Error(`Unexpected data format: ${expectedFormat}`);
    }
}

//
// Outputs data as JSON to a file or to standard output.
//
export async function outputData(argv: string[], data: any, expectedFormat?: DataFormat, config?: ICsvOutputConfig): Promise<void> {
    if (argv.length === 0) {
        //
        // Default is to output to stdout.
        //
        outputDataToStdout(data, expectedFormat, config);
    }
    else {
        const fileName = argv.shift()!.toLowerCase();
        if (fileName === "-") {
            //
            // Explicitly output to stdout.
            //
            outputDataToStdout(data, expectedFormat, config);
        }
        else {
            await outputDataToFile(data, fileName, expectedFormat, config);
        }
    }
}