import { isArray } from "./utils";

//
// Verifies that input data is an array.
//
export function verifyArray(data: any, arrayName: string, commandName: string): void {
    if (!isArray(data)) {
        throw new Error(`Expected ${arrayName} to '${commandName}' to be an array.`);
    }
}

//
// Verifies that input data is an array.
//
export function verifyInputArray(data: any, commandName: string): void {
    verifyArray(data, "input", commandName);
}
