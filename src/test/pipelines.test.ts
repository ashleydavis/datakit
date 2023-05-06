import { expect } from "chai";
import { execSync } from "child_process";

function exec(cmd: string): { stdout?: string, stderr?: string, err?: any } {
    try {
        const output = execSync(cmd);
        return { stdout: output.toString() };
    }
    catch (err: any) {
        return {
            err,
            stderr: err.stderr.toString(),
        };
    }
}

//
// Unindent a multiline JavaScript string.
//
function unindent(input: string) {
    let lines = input.split("\n").map(line => line.trimEnd());
    if (lines.length > 0) {
        if (lines[0].length === 0) {
            lines.shift(); // Discard first empty line.
        }
    }

    if (lines.length > 0) {
        const firstLine = lines[0];
        let numSpaces = 0;
        for (let i = 0; i < firstLine.length; ++i) {
            if (firstLine[i] === " ") {
                ++numSpaces;
            }
            else {
                break;
            }
        }

        lines = lines.map(line => line.substring(numSpaces));
    }

    return lines.join("\n");
}

describe("pipelines", () => {

    const pipelines = [
        //
        // File reading
        //
        [
            "count json from stdin",
            "npx ts-node ./src/cli/length - < ./src/test/data/example-data.json",
            "3",
        ],
        [
            "count json from file",
            "npx ts-node ./src/cli/length ./src/test/data/example-data.json",
            "3",
        ],
        [
            "count csv from stdin",
            "npx ts-node ./src/cli/from-csv < ./src/test/data/example-data.csv | npx ts-node ./src/cli/length -",
            "3",
        ],
        [
            "count csv from file",
            "npx ts-node ./src/cli/length ./src/test/data/example-data.csv",
            "3",
        ],
        [
            "count yaml from stdin",
            "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/length -",
            "3",
        ],
        [
            "count yaml from file",
            "npx ts-node ./src/cli/length ./src/test/data/example-data.yaml",
            "3",
        ],
        //
        // Transformation.
        //
        [
            "test-1",
            "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/transform - \"records => records.map(r => ({ ...r, CashPool: Math.floor(r.CashPool) }))\" | npx ts-node ./src/cli/to-yaml",
            unindent(`
                - Date: 2013-01-02
                  CashPool: 20000
                  SharesValue: 0
                - Date: 2013-01-03
                  CashPool: 2121
                  SharesValue: 17721.62596
                - Date: 2013-01-04
                  CashPool: 2121
                  SharesValue: 17555.82369
                
            `),
        ],
        [
            "test-2",
            "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/transform - -f ./src/test/code/transform-test.js | npx ts-node ./src/cli/to-yaml",
            unindent(`
                - Date: 2013-01-02
                  CashPool: 20000
                  SharesValue: 0
                - Date: 2013-01-03
                  CashPool: 2121
                  SharesValue: 17721.62596
                - Date: 2013-01-04
                  CashPool: 2121
                  SharesValue: 17555.82369
                
            `),
        ],
        [
            "test-3",
            "npx ts-node ./src/cli/from-yaml < .\\src\\test\\data\\example-data.yaml | npx ts-node ./src/cli/length -",
            "3",
        ],
    ];

    for (const pipeline of pipelines) {
        const [name, cmd, expectedOutput] = pipeline;
        it(name, () => {
            const output = exec(cmd);
            expect(output.stdout).to.eql(expectedOutput);
        });
    }
});