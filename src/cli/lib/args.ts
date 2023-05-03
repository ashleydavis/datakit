
//
// Consumes an argument and returns it's value.
//
export function consumeOptionalArg(argv: string[], options: string[], exampleValue: string): string | undefined {
    if (argv.length < 1) {
        return undefined; // No more arguments.
    }

    function throwError(argument: string, exampleValue: string): never {
        throw new Error(`Bad argument. Expected something like: "${argument}${exampleValue}"`);
    }

    for (const option of options) {
        if (argv[0] == option) {
            const actualArg = argv.shift();

            if (argv.length < 1) {
                throwError(actualArg + " ", exampleValue);
            }

            return argv.shift();
        }
        else if (argv[0].startsWith(`${option}=`)) {
            return argv.shift()!.substring(option.length+1);
        }        
    }

    return undefined;
}