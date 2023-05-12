import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/skip");

import { main }  from "../../cli/skip";

describe("cli/skip", () => {

    it("can skip over empty dataset", async () => {

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

    it("can skip over dataset smaller than skip number", async () => {

        mockIo.inputData = async () => {
            return [ 1 ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `2` ]);

        expect(output).to.eql([]);
    });

    it("can skip over dataset more than skip number", async () => {

        mockIo.inputData = async () => {
            return [ 1, 2, 3 ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `2` ]);

        expect(output).to.eql([ 3 ]);
    });
});