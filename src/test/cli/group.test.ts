import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/group");

import { main }  from "../../cli/group";

describe("cli/group", () => {

    it("can group empty data set", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r.a` ]);

        expect(output).to.eql([]);
    });

    it("can group 1 item", async () => {

        const input = [ { "a": 1 } ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r.a` ]);

        const expectedOutput = [{
            key: 1,
            records: [ { "a": 1 } ],
        }];
        expect(output).to.eql(expectedOutput);
    });

    it("can group multiple items", async () => {

        const input = [ 
            { "a": 1, "b": 1 },  
            { "a": 2, "b": 2 },  
            { "a": 1, "b": 3 },
            { "a": 2, "b": 4 },  
            { "a": 3, "b": 5 },
        ];
        mockIo.inputData = async () => {
            return input;
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `r => r.a` ]);

        const expectedOutput = [
            {
                key: 1,
                records: [ input[0], input[2] ],
            },
            {
                key: 2,
                records: [ input[1], input[3], ],
            },
            {
                key: 3,
                records: [ input[4] ],
            },
        ];
        expect(output).to.eql(expectedOutput);
    });
});