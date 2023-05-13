import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/sort");

import { main }  from "../../cli/sort";

describe("cli/sort", () => {

    it("can sort empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r` ]);

        expect(output).to.eql([]);
    });

    it("can sort multiple items", async () => {

        const input = [ 5, 2, 10, 3, 1, 4, 8, 2 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r` ]);

        const expectedOutput = [ 1, 2, 2, 3, 4, 5, 8, 10 ];
        expect(output).to.eql(expectedOutput);
    });

    it("can sort multiple items - descending", async () => {

        const input = [ 5, 2, 10, 3, 1, 4, 8, 2 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r`, `descending` ]);

        const expectedOutput = [ 10, 8, 5, 4, 3, 2, 2, 1 ];
        expect(output).to.eql(expectedOutput);
    });

    it("can sort nested", async () => {


        const input = [
            { a: 5, b: 2 },
            { a: 3, b: 1 },
            { a: 5, b: 1 },
            { a: 3, b: 2 },
        ];

        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r.a`, `descending`, `r => r.b`, `ascending` ]);

        const expectedOutput = [ 
            { a: 5, b: 1 },
            { a: 5, b: 2 },
            { a: 3, b: 1 },
            { a: 3, b: 2 },
        ];
        expect(output).to.eql(expectedOutput);
    });
});