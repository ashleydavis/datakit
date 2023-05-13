import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/distinct");

import { main }  from "../../cli/distinct";

describe("cli/distinct", () => {

    it("can distinct over empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql([]);
    });

    it("can distinct returns different items", async () => {

        const input = [ 1, 2 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql([ 1, 2 ]);
    });

    it("can distinct removes duplicates items", async () => {

        const input = [ 2, 2 ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql([ 2 ]);
    });
});