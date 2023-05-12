import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/take");

import { main }  from "../../cli/take";

describe("cli/take", () => {

    it("can take from empty dataset", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `2` ]);

        expect(output).to.eql([]);
    });

    it("can take from dataset smaller than take number", async () => {

        mockIo.inputData = async () => {
            return [ 1 ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `2` ]);

        expect(output).to.eql([ 1 ]);
    });

    it("can take from dataset more than take number", async () => {

        mockIo.inputData = async () => {
            return [ 1, 2, 3 ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `2` ]);

        expect(output).to.eql([ 1, 2 ]);
    });
});