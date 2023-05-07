import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/map");

import { main }  from "../../cli/map";

describe("cli/map", () => {

    it("can map over empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => ({ a: r.a + 1 })` ]);

        expect(output).to.eql([]);
    });

    it("can map over 1 item", async () => {

        const input = [ { "a": 1 } ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => ({ a: r.a + 1 })` ]);

        const expectedOutput = [ { "a": 2 } ];
        expect(output).to.eql(expectedOutput);
    });

    it("can map over 3 items", async () => {

        const input = [ { "a": 1 },  { "a": 2 },  { "a": 3 } ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => ({ a: r.a + 1 })` ]);

        const expectedOutput = [ { "a": 2 },  { "a": 3 },  { "a": 4 }  ];
        expect(output).to.eql(expectedOutput);
    });
});