import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/filter");

import { main }  from "../../cli/filter";

describe("cli/filter", () => {

    it("can filter empty dataset", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => true` ]);

        expect(output).to.eql([]);
    });

    it("can filter out item", async () => {

        mockIo.inputData = async () => {
            return [ { "a": 1 } ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => false` ]);

        expect(output).to.eql([]);
    });

    it("can filter in item", async () => {

        const item = { "a": 1 };
        mockIo.inputData = async () => {
            return [ item ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => true` ]);

        expect(output).to.eql([ item ]);
    });

    it("can filter 3 items", async () => {

        const item1 = { "a": 1 };
        const item2 = { "a": 2 };
        const item3 = { "a": 3 };
        mockIo.inputData = async () => {
            return [ item1, item2, item3 ];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r.a !== 2` ]);

        expect(output).to.eql([ item1, item3 ]);
    });
});