import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/omit");

import { main }  from "../../cli/omit";

describe("cli/omit", () => {

    it("can omit from empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `a` ]);

        expect(output).to.eql([]);
    });

    it("can omit from 1 item", async () => {

        const input = [ { a: 1, b: 2, c: 3 } ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `b` ]);

        const expectedOutput = [ { a: 1, c: 3 } ];
        expect(output).to.eql(expectedOutput);
    });

    it("can omit from 3 items", async () => {

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
            { b: 2 },
            { b: 3 },
            { b: 4 },
        ];
        expect(output).to.eql(expectedOutput);
    });
});