import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/pick");

import { main }  from "../../cli/pick";

describe("cli/pick", () => {

    it("can pick from empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `a,b` ]);

        expect(output).to.eql([]);
    });

    it("can pick from 1 item", async () => {

        const input = [ { a: 1, b: 2, c: 3 } ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `a,b` ]);

        const expectedOutput = [ { a: 1, b: 2 } ];
        expect(output).to.eql(expectedOutput);
    });

    it("can pick from 3 items", async () => {

        const input = [ 
            { a: 1, b: 2, c: 3 },
            { a: 2, b: 3, c: 4 },
            { a: 3, b: 4, c: 5 },
        ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `a,c` ]);

        const expectedOutput = [
            { a: 1, c: 3 },
            { a: 2, c: 4 },
            { a: 3, c: 5 },
        ];
        expect(output).to.eql(expectedOutput);
    });
});