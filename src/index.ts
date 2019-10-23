import { isString, isObject, isArray } from './lib/utils';

// @ts-ignore
import PapaParse from 'papaparse';

/**
 * Represents a field from a JavaScript object.
 */
export interface IFieldDesc {
    /**
     * The name of the field.
     */
    field: string;

    /**
     * The value of the field.
     */
    value: any;
};

/**
 * Convert a regular JavaScript object to 'tablular data'.
 * Each element of the matches a field from the object.
 * 
 * @param obj - The JavaScript object to convert to a dataframe.
 * 
 * @returns Returns an array with an element describing each field.
 */
export function fromObject (obj: any): IFieldDesc[] {

    return Object.keys(obj)
        .map(fieldName => ({
            field: fieldName,
            value: obj[fieldName],
        }));
}

/**
 * Deserialize JSON text to a JavaScript array.
 *
 * @param jsonTextString The JSON text to deserialize.
 * 
 * @returns Returns an array of JavaScript objects that were deserialized from the JSON text.
 */
export function fromJson<RecordT> (jsonTextString: string): RecordT[] {
    
    if (!isString(jsonTextString)) {
        throw new Error("Expected 'jsonTextString' parameter to 'datakit.fromJson' to be a string containing data encoded in the JSON format.");
    }

    return JSON.parse(jsonTextString);
}

/**
 * Configuration for CSV deserialization.
 */
export interface ICsvInputConfig {

    /**
     * Optionally specifies the column names (when enabled, assumes that the header row is not read from the CSV data).
     * Default: undefined
     */
    columnNames?: string[];

    /**
     * Automatically pick types based on what the value looks like.
     * Default: false.
     */
    dynamicTyping?: boolean;

    /**
     * Skip empty lines in the input.
     * Default: true
     */
    skipEmptyLines?: boolean;
}

/**
 * Deserialize CSV text to a JavaScript array.
 * Each element of the array contains fields that match the columns from the CSV data.
 *
 * @param csvTextString The CSV text to deserialize.
 * @param [config] Optional configuration options for parsing the CSV data.
 * 
 * @returns Returns an array of JavaScript objects that were deserialized from the CSV text.
 */
export function fromCsv<RecordT> (csvTextString: string, config?: ICsvInputConfig): RecordT[] {

    if (!isString(csvTextString)) {
        throw new Error("Expected 'csvTextString' parameter to 'datakit.fromCsv' to be a string containing data encoded in the CSV format.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected 'config' parameter to 'datakit.fromCsv' to be an object with configuration options for CSV deserialization.");
        }

        if (config.columnNames) {
            if (!isArray(config.columnNames)) {
                throw new Error("Expected 'columnNames' field of 'config' parameter to 'datakit.fromCsv' to be an array of strings that specifies column names to read from the CSV data.");
            }

            for (const columnName of config.columnNames) {
                if (!isString(columnName)) {
                    throw new Error("Expected 'columnNames' field of 'config' parameter to 'datakit.fromCsv' to be an array of strings that specify column names.");
                }
            }
        }
        
        if (config.skipEmptyLines === undefined) {
            config = Object.assign({}, config); // Clone the config. Don't want to modify the original.
            config.skipEmptyLines = true;
        }
    }
    else {
        config = {
            skipEmptyLines: true,
        };
    }

    const parsed = PapaParse.parse(csvTextString, config as any);
    let rows = <string[][]> parsed.data;

    if (rows.length === 0) {
        return [];
    }

    rows = rows.map(row => row.map(cell => isString(cell) ? cell.trim() : cell));

    let columnNames: string[];
    if (config && config.columnNames) {
        columnNames = config.columnNames;
    }
    else {
        columnNames = rows.shift()!.filter(columnName => columnName && columnName.length !== undefined && columnName.length > 0);
    }

    return rows.map(row => {
        const record: any = {};
        for (let i = 0; i < columnNames.length; ++i) {
            record[columnNames[i]] = row[i];
        }
        return record;
    });
}

/**
 * Like fs.readFile but returns a promise for the file data.
 * 
 * @param filePath Path to the file to be loaded.
 * 
 * @returns A promise that is resolved with the contents of the file.
 * 
 * @example
 * <pre>
 * 
 * const data = await datakit.readFile("some-data-file.txt");
 * console.log(data);
 * </pre>
 *
 */
export function readFile(filePath: string): Promise<string> {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.readFile' function to be a string.");
    }

    return new Promise<string>((resolve, reject) => {
        const fs = require("fs");
        fs.readFile(filePath, 'utf8', (err: any, fileData: string) => {
            if (err) {
                reject(err);
                return;
            }
    
            resolve(fileData);
        });
    });
}

/**
 * Asynchronously deserialize a CSV file to a JavaScript array.
 * Each element of the array contains fields that match the columns from the CSV file.
 * 
 * @param filePath Path to the file to be loaded.
 * @param [config] Optional configuration file for parsing.
 * 
 * @returns Returns a promise for the loaded data.
 *
 * @example
 * <pre>
 * 
 * const data = await datakit.readCsv("my-data-file.csv");
 * console.log(data);
 * </pre>
 *
 * const config = {
 *     dynamicTyping: true,
 *     // ... other options ...
 * };
 * const data = await datakit.readCsv("my-data-file.csv", config);
 * console.log(data);
 * </pre>
 */
export async function readCsv<RecordT> (filePath: string, config?: ICsvInputConfig): Promise<RecordT[]> {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.readCsv' function to be a string.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected optional 'config' parameter to 'datakit.readCsv' to be an object with configuration options for CSV deserialization.")
        }
    }
    
    const fileData = await readFile(filePath);
    return fromCsv<RecordT>(fileData, config);
}

/**
 * Asynchronously deserialize a JSON file to a JavaScript array.
 * 
 * @param filePath Path to the file to be loaded.
 * 
 * @returns Returns a promise for the loaded data.
 * 
 * @example
 * <pre>
 * 
 * const data = await datakit.readFile("my-data-file.json");
 * console.log(data);
 * </pre>
 */
export async function readJson<RecordT> (filePath: string): Promise<RecordT[]> {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.readJson' function to be a string.");
    }

    const fileData = await readFile(filePath);
    return fromJson<RecordT>(fileData);
} 

/**
 * Synchronously deserialize a CSV file to a JavaScript array.
 * Each element of the array contains fields that match the columns from the CSV file.
 * 
 * @param filePath Path to the file to be loaded.
 * @param [config] Optional configuration file for parsing.
 * 
 * @returns Returns the loaded data.
 *
 * @example
 * <pre>
 * 
 * const data = datakit.readCsvSync("my-data-file.csv");
 * console.log(data);
 * </pre>
 *
 * @example
 * <pre>
 * 
 * const config = {
 *     dynamicTyping: true,
 *     // ... other options ...
 * };
 * const data = datakit.readCsvSync("my-data-file.csv", config);
 * console.log(data);
 * </pre>
 */
export function readCsvSync<RecordT> (filePath: string, config?: ICsvInputConfig): RecordT[] {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.readCsvSync' function to be a string.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected optional 'config' parameter to 'datakit.readCsvSync' to be an object with configuration options for CSV parsing.");
        }
    }

    const fs = require("fs");
    return fromCsv<RecordT>(fs.readFileSync(filePath, 'utf8'), config);
}

/**
 * Synchronously deserialize a JSON file to a JavaScript array.
 * 
 * @param filePath Path to the file to be loaded.
 * @param [config] Optional configuration file for parsing.
 * 
 * @returns Returns the loaded data.
 *
 * @example
 * <pre>
 * 
 * const data = datakit.readJsonSync("my-data-file.json");
 * console.log(data);
 * </pre>
 */
export function readJsonSync<RecordT> (filePath: string): RecordT[] {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.readJsonSync' function to be a string.");
    }

    const fs = require("fs");
    return fromJson<RecordT>(fs.readFileSync(filePath, 'utf8'));
} 

/**
 * Serialize a JavaScript array to the JSON data format.
 * 
 * @param input The data to be serialized.
 * 
 * @return Returns a string in the JSON data format that represents the data.
 * 
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * const jsonData = datakit.toJson(data);
 * console.log(jsonData);
 * </pre>
 */
export function toJson<RecordT> (input: RecordT[]): string {

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.toJson' to be a JavaScript array.");
    }

    return JSON.stringify(input, null, 4);
}

/**
 * Configuration for CSV serialization.
 */
export interface ICsvOutputConfig {
    /**
     * Enable or disable output of the CSV header line.
     * Defaults to true.
     */
    header?: boolean;

    /**
     * Names of columns to output.
     */
    columnNames?: string[];
}

/**
 * Serialize a JavaScript array to the CSV data format.
 * Columns in the CSV file match fields from the objects in the array.
 * 
 * @param input The data to be serialized.
 * 
 * @return Returns a string in the CSV data format that represents the data.
 * 
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * const csvData = datakit.toCsv(data);
 * console.log(csvData);
 * </pre>
 * 
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * const config = {
 *     header: false,
 *     // ... other options ...
 * };
 * const csvData = datakit.toCsv(data, config);
 * console.log(csvData);
 * </pre>
 */
export function toCsv<RecordT> (input: RecordT[], config?: ICsvOutputConfig): string {

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.toCsv' to be a JavaScript array.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected optional 'config' parameter to 'datakit.toCsv' to be an object with configuration options for CSV serialization.");
        }
    }

    const columnNames = (config && config.columnNames) || (input && input.length > 0 && Object.keys(input[0])) || [];
    const headerLine = config === undefined || config.header === undefined || config.header
        ? [columnNames]
        : []
        ;
    const data = input.map((obj: any) => columnNames.map(columnName => obj[columnName]));
    const rows = headerLine.concat(data);
    return PapaParse.unparse(rows, config);
}


/**
 * Like fs.writeFile but returns a promise for completion of the asynchronous file write.
 * 
 * @param filePath Path to the file to be written.
 * @param data Data to be written the to file.
 * 
 * @returns A promise that is resolved when the file has been written.
 * 
 * @example
 * <pre>
 * 
 * const data = "... JavaScript string with text data ...";
 * await datakit.writeFile("some-data-file.txt", data);
 * </pre>
 *
 */
export function writeFile(filePath: string, data: string): Promise<string> {

    if (!filePath || !isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.writeFile' function to be a string.");
    }

    return new Promise((resolve, reject) => {
        const fs = require("fs");
        fs.writeFile(filePath, data, (err: any) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

/**
 * Asynchronously serialize a JavaScript array to a CSV file.
 * The fields in the objects of the array become the columns in the CSV file.
 * 
 * @param filePath Path to the file to be written.
 * @param [config] Optional configuration file for parsing.
 * 
 * @return Returns a promise that resolves when the file has been written.
 *
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * await datakit.writeCsv("my-data-file.csv", data);
 * </pre>
 *
 * @example
 * <pre>
 * const config = {
 *     // ... Options for serialization ...
 * };
 * const data = [ ... JavaScript array of data ... ];
 * await datakit.writeCsv("my-data-file.csv", config);
 * </pre>
 */
export async function writeCsv<RecordT> (filePath: string, input: RecordT[], config?: ICsvOutputConfig): Promise<void> {

    if (!isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.writeCsv' to be a string that specifies the path of the file to write to the local file system.");
    }

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.writeCsv' to be a JavaScript array.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected optional 'config' parameter to 'datakit.writeCsv' to be an object with configuration options for CSV serialization.");
        }
    }

    await writeFile(filePath, toCsv<RecordT>(input, config));
}

/**
 * Synchronously serialize a JavaScript array to a CSV file.
 * The fields in the objects of the array become the columns in the CSV file.
 * 
 * @param filePath Path to the file to be written.
 * @param [config] Optional configuration file for parsing.
 * 
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * datakit.writeCsvSync("my-data-file.csv", data);
 * </pre>
 *
 * @example
 * <pre>
 * 
 * const config = {
 *     // ... Options for serialization ...
 * };
 * const data = [ ... JavaScript array of data ... ];
 * datakit.writeCsvSync("my-data-file.csv", config);
 * </pre>
 */
export function writeCsvSync<RecordT> (filePath: string, input: RecordT[], config?: ICsvOutputConfig): void {

    if (!isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.writeCsvSync' to be a string that specifies the path of the file to write to the local file system.");
    }

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.writeCsvSync' to be a JavaScript array.");
    }

    if (config) {
        if (!isObject(config)) {
            throw new Error("Expected optional 'config' parameter to 'datakit.writeCsvSync' to be an object with configuration options for CSV serialization.");
        }
    }

    const fs = require("fs");
    fs.writeFileSync(filePath, toCsv<RecordT>(input, config));
}

/**
 * Asynchronously serialize a JavaScript array to a JSON file.
 * 
 * @param filePath Path to the file to be written.
 * 
 * @return Returns a promise that resolves when the file has been written.
 *
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * await datakit.writeJson("my-data-file.json", data);
 * </pre>
 */
export async function writeJson<RecordT> (filePath: string, input: RecordT[]): Promise<void> {

    if (!isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'writeJson' to be a string that specifies the path of the file to write to the local file system.");
    }

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.writeJson' to be a JavaScript array.");
    }

    await writeFile(filePath, toJson<RecordT>(input));
}

/**
 * Synchronously serialize a JavaScript array to a JSON file.
 * 
 * @param filePath Path to the file to be written.
 * 
 * @return Returns a promise that resolves when the file has been written.
 *
 * @example
 * <pre>
 * 
 * const data = [ ... JavaScript array of data ... ];
 * datakit.writeJsonSync("my-data-file.json", data);
 * </pre>
 */
export function writeJsonSync<RecordT> (filePath: string, input: RecordT[]): void {

    if (!isString(filePath)) {
        throw new Error("Expected 'filePath' parameter to 'datakit.writeJsonSync' to be a string that specifies the path of the file to write to the local file system.");
    }

    if (!input || !isArray(input)) {
        throw new Error("Expected 'input' parameter to 'datakit.writeJsonSync' to be a JavaScript array.");
    }

    const fs = require("fs");
    fs.writeFileSync(filePath, toJson<RecordT>(input));
}