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

    it("test-1", () => {
        const pipeline = "npx ts-node ./src/cli/from-yaml < ./src/test/data/example-data.yaml | npx ts-node ./src/cli/transform \"records => records.map(r => ({ ...r, CashPool: Math.floor(r.CashPool) }))\" | npx ts-node ./src/cli/to-yaml";
        const output = exec(pipeline);
        expect(output.stdout).to.eql(unindent(`
            - Date: 2013-01-02
              CashPool: 20000
              SharesValue: 0
            - Date: 2013-01-03
              CashPool: 2121
              SharesValue: 17721.62596
            - Date: 2013-01-04
              CashPool: 2121
              SharesValue: 17555.82369
              
        `));
    });

});