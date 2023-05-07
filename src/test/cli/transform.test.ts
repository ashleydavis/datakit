import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/transform");

import { main }  from "../../cli/transform";

describe("cli/transform", () => {

    it("can transform dataset", async () => {

        const inputData = "1234";
        mockIo.inputData = async () => {
            return inputData;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        const transformedData = "ABCD";
        await main([ `r => "${transformedData}"` ]);

        expect(output).to.eql(transformedData);
    });

});