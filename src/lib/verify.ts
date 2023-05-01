import { isArray } from "./utils";

//
// Verifies that input data is an array.
//
export function verifyInputArray(data: any, commandName: string): void {
    if (!isArray(data)) {
        throw new Error(`Expected input to '${commandName}' to be an array.`);
    }
}
