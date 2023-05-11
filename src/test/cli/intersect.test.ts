import { expect } from "chai";
import mock from 'mock-require';

const mockIo: any = {
};
mock('../../lib/io', mockIo);
mock.reRequire("../../cli/intersect");

import { main }  from "../../cli/intersect";

describe("cli/intersect", () => {

    it("can intersect empty datasets", async () => {

        mockIo.inputData = async () => {
            return [];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([]);
    });

    it("can intersect matching left and right", async () => {

        let nextInputDataIndex = 0;
        const left = {
            key: 1,
            id: `left`,
        };
        const right = {
            key: 1,
            id: `right`,
        };
        const inputData = [
            // Left
            [
                left
            ], 

            // Right
            [
                right
            ],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: left,
                r: right,
            },
        ]);
    });

    it("can intersect non-matching left and right", async () => {

        let nextInputDataIndex = 0;
        const left = {
            key: 1,
            id: `left`,
        };
        const right = {
            key: 2,
            id: `right`,
        };
        const inputData = [
            // Left
            [
                left,
            ], 

            // Right
            [
                right,
            ],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: left,
                r: undefined,
            },
            {
                l: undefined,
                r: right,
            },
        ]);
    });

    it("can intersect left with no right", async () => {

        let nextInputDataIndex = 0;
        const left = {
            key: 1,
            id: `left`,
        };
        const inputData = [
            // Left
            [
                left
            ], 

            // Right
            [],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: left,
                r: undefined,
            },
        ]);
    });

    it("can intersect right with no left", async () => {

        let nextInputDataIndex = 0;
        const right = {
            key: 1,
            id: `right`,
        };
        const inputData = [
            // Left
            [], 

            // Right
            [
                right
            ],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: undefined,
                r: right,
            },
        ]);
    });

    it("can intersect left with multiple rights", async () => {

        let nextInputDataIndex = 0;
        const left = {
            key: 1,
            id: `left`,
        };
        const right1 = {
            key: 1,
            id: `right-1`,
        };
        const right2 = {
            key: 1,
            id: `right-2`,
        };
        const inputData = [
            // Left
            [
                left,
            ], 

            // Right
            [
                right1,
                right2
            ],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: left,
                r: right1,
            },
            {
                l: left,
                r: right2,
            },
        ]);
    });    

    it("can intersect multiple left and multiple right", async () => {

        let nextInputDataIndex = 0;
        const left1 = { key: 1, id: `left-1` };
        const left2 = { key: 2, id: `left-2` };
        const right1 = { key: 1, id: `right-1` };
        const right2 = { key: 2, id: `right-2`};
        const inputData = [
            [ left1, left2 ], 
            [ right1, right2 ],
        ];

        mockIo.inputData = async () => {
            return inputData[nextInputDataIndex++];
        };

        let output: any[] | undefined = undefined;
        mockIo.outputData = async (argv: string[], data: any[]) => {
            output = data;
        };

        await main([ `l => l.key`, `r => r.key`, `(l,  r) => ({ l, r })` ]);

        expect(output).to.eql([
            {
                l: left1,
                r: right1,
            },
            {
                l: left2,
                r: right2,
            },
        ]);
    });
});