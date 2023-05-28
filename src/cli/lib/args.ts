
//
// Consumes an argument and returns it's value.
//
export function consumeOptionalArg(argv: string[], startingIndex: number, option: IOption): string | undefined {
    if (argv.length < startingIndex + 1) {
        return undefined; // No more arguments.
    }

    function throwError(argument: string, exampleValue: string): never {
        throw new Error(`Bad argument. Expected something like: "${argument}${exampleValue}"`);
    }

    for (const optionName of option.names) {
        for (const optionVariant of [`-${optionName}`, `--${optionName}`]) {
            if (argv[startingIndex] == optionVariant) {
                const [ actualArg ] = argv.splice(startingIndex, 1);

                if (argv.length < startingIndex + 1) {
                    throwError(actualArg + " ", option.example);
                }

                const [ argValue ] = argv.splice(startingIndex, 1);
                return argValue;
            }
            else if (argv[startingIndex].startsWith(`${optionVariant}=`)) {
                const [ actualArg ] = argv.splice(startingIndex, 1);
                return actualArg!.substring(optionVariant.length+1);
            }
        }
    }

    return undefined;
}

//
// Defines an option.
//
export interface IOption {
    //
    // Names for the option.
    //
    names: string[],

    //
    // Describes the value for the option.
    //
    placeholder: string;

    //
    // An example value for the option.
    //
    example: string;

    //
    // The description of the option.
    //
    desc: string;
}

export type Flags = { [index: string]: string };

//
// Pulls options from the set of arguments.
//
export function pullOptions(options: IOption[], argv: string[]): Flags {
    const output: any = {};

    for (const option of options) {
        const value = findOption(argv, option);
        if (value) {
            output[option.names[0]] = value;
            continue;
        }
    }

    return output;
}

//
// Find the value for an option in the list of arguments.
//
function findOption(argv: string[], option: IOption): any {
    for (let argIndex = 0; argIndex < argv.length; ++argIndex) {
        const value = consumeOptionalArg(argv, argIndex, option);
        if (value !== undefined) {
            return value;
        }
    }

    return undefined;
}

