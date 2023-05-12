import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/reduce");

import { main }  from "../../cli/reduce";

describe("cli/reduce", () => {

    it("can reduce over empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `(a, r) => a + r`, `1` ]);

        expect(output).to.eql(1);
    });

    it("can reduce 1 item", async () => {

        const input = [ 2 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `(a, r) => a + r`, `1` ]);

        expect(output).to.eql(3);
    });

    it("can reduce multiple items", async () => {

        const input = [ 2, 3, 4 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `(a, r) => a + r`, `1` ]);

        expect(output).to.eql(10);
    });
});