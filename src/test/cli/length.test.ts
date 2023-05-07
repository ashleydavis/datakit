import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/length");

import { main }  from "../../cli/length";

describe("cli/length", () => {

    it("can length of empty data set", async () => {

        mockIo.inputJson = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputJson = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql(0);
    });

    it("can get length with 1 item", async () => {

        const input = [ {} ];
        mockIo.inputJson = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputJson = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql(1);
    });

    it("can get length with 3 items", async () => {

        const input = [ {},  {},  {} ];
        mockIo.inputJson = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputJson = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([]);

        expect(output).to.eql(3);
    });
});