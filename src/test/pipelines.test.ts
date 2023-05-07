import { expect } from "chai";
import { execSync } from "child_process";
import exp from "constants";
import * as fs from "fs-extra";

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

    interface IOutputSpec {
        stdout?: string;
        file?: {
            [index: string]: string,
        },
    };

    const pipelines: [string, string, IOutputSpec][] = [
        //
        // File reading
        //
        // [
        //     "count json from stdin",
        //     "npx ts-node ./src/cli/length - < ./src/test/data/example-data.json",
        //     { stdout: "3" },
        // ],
        // [
        //     "count json from file",
        //     "npx ts-node ./src/cli/length ./src/test/data/example-data.json",
        //     { stdout: "3" },
        // ],
        // [
        //     "count csv from stdin",
        //     "npx ts-node ./src/cli/from-csv < ./src/test/data/example-data.csv | npx ts-node ./src/cli/length -",
        //     { stdout: "3" },
        // ],
        // [
        //     "count csv from file",
        //     "npx ts-node ./src/cli/length ./src/test/data/example-data.csv",
        //     { stdout: "3" },
        // ],
        // [
        //     "count yaml from stdin",
        //     "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/length -",
        //     { stdout: "3" },
        // ],
        // [
        //     "count yaml from file",
        //     "npx ts-node ./src/cli/length ./src/test/data/example-data.yaml",
        //     { stdout: "3" },
        // ],
        //
        // File writing
        //
        [
            "json to stdout",
            "npx ts-node ./src/cli/transform ./src/test/data/example-data.json \"dataset => dataset\" -",
            { 
                stdout: unindent(`
                    [
                        {
                            "Date": "2013-01-02",
                            "CashPool": 20000,
                            "SharesValue": 0
                        },
                        {
                            "Date": "2013-01-03",
                            "CashPool": 2121.303004999999,
                            "SharesValue": 17721.62596
                        },
                        {
                            "Date": "2013-01-04",
                            "CashPool": 2121.303004999999,
                            "SharesValue": 17555.82369
                        }
                    ]
                `).trimEnd(),
            },
        ],
        [
            "json to file",
            "npx ts-node ./src/cli/transform ./src/test/data/example-data.json \"dataset => dataset\" ./src/test/output/output.json",
            {
                file: {
                    "output.json": unindent(`
                        [
                            {
                                "Date": "2013-01-02",
                                "CashPool": 20000,
                                "SharesValue": 0
                            },
                            {
                                "Date": "2013-01-03",
                                "CashPool": 2121.303004999999,
                                "SharesValue": 17721.62596
                            },
                            {
                                "Date": "2013-01-04",
                                "CashPool": 2121.303004999999,
                                "SharesValue": 17555.82369
                            }
                        ]
                    `).trimEnd(),
                },
            },
        ],
        [
            "csv to yaml",
            "npx ts-node ./src/cli/from-csv ./src/test/output/output.yaml < ./src/test/data/example-data.csv",
            {
                file: {
                    "output.yaml": unindent(`
                        - Date: 2013-01-02
                          CashPool: 20000
                          SharesValue: 0
                        - Date: 2013-01-03
                          CashPool: 2121.303004999999
                          SharesValue: 17721.62596
                        - Date: 2013-01-04
                          CashPool: 2121.303004999999
                          SharesValue: 17555.82369
                    `),
                },
            },
        ],
        [
            "yaml to csv",
            "npx ts-node ./src/cli/from-yaml ./src/test/output/output.csv < ./src/test/data/example-data.yaml",
            {
                file: {
                    "output.csv": unindent(`
                        Date,CashPool,SharesValue
                        2013-01-02,20000,0
                        2013-01-03,2121.303004999999,17721.62596
                        2013-01-04,2121.303004999999,17555.82369
                    `).trimEnd(),
                },
            },
        ],
        //
        // Loading a user function.
        //
        [
            "loading user function from argument",
            "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/transform - \"dataset => dataset.map(r => ({ ...r, CashPool: Math.floor(r.CashPool) }))\" | npx ts-node ./src/cli/to-yaml",
            { 
                stdout: unindent(`
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
            },
        ],
        [
            "loading user function from file",
            "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/transform - -f ./src/test/code/transform-test.js | npx ts-node ./src/cli/to-yaml",
            { 
                stdout: unindent(`
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
            },
        ],
    ];

    fs.removeSync("./src/test/output");
    fs.ensureDirSync("./src/test/output");

    function checkOutput(test: string, actual: string, expected: string) {

        actual = actual.split("\r\n").join("\n"); // Normalise line endings.

        if (actual !== expected) {
            console.error(`Actual output from "${test}" did not match expected output.`);
            console.error(`==ACTUAL==`);
            console.error(actual);
            console.error(`==EXPECTED==`);
            console.error(expected);
            console.error(`====`);
        }

        expect(actual).to.eql(expected);
    }

    for (const pipeline of pipelines) {
        const [name, cmd, expectedOutput] = pipeline;
        it(name, () => {
            const output = exec(cmd);
            if (expectedOutput.stdout) {
                checkOutput(name, output.stdout!, expectedOutput.stdout);
            }
            else if (expectedOutput.file) {
                for (const [file, expectedContent] of Object.entries(expectedOutput.file)) {
                    const fileOutput = fs.readFileSync(`./src/test/output/${file}`, "utf8");
                    checkOutput(name, fileOutput, expectedContent);
                }
            }
            else {
                throw new Error(`No expected output set`);
            }
        });
    }
});