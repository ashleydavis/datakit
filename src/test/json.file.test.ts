import { assert, expect } from 'chai';
import 'mocha';
import mock from 'mock-require';
import { readJson, readJsonSync, fromJson, writeJson, writeJsonSync, toJson } from '..';

describe('json file', () => {

    const mockFs: any = {};

    before(() => {
        mock('fs', mockFs);
        mock.reRequire("../index");
    });

    after(() => {
        mock.stop('fs');
    });

    it('can read JSON file asynchronously', () => {

        const testFilePath = "some/file.json"
        const testJsonData = JSON.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);
            

        mockFs.readFile = (filePath: string, dataFormat: string, callback: Function): void => {
            expect(filePath).to.eql(testFilePath);
            expect(dataFormat).to.eql('utf8');

            callback(null, testJsonData);
        };
        
        return readJson(testFilePath)
            .then(data => {
                expect(toJson(data)).to.eql(testJsonData);
            });
    });

    it('can read JSON file synchronously', () => {

        const testFilePath = "some/file.json"
        const testJsonData = JSON.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);

        mockFs.readFileSync = (filePath: string, dataFormat: string): string => {
            expect(filePath).to.eql(testFilePath);
            expect(dataFormat).to.eql('utf8');

            return testJsonData;
        };
        
        const data = readJsonSync(testFilePath);
        expect(toJson(data)).to.eql(testJsonData);
    });

    it('can write JSON file asynchronously', () => {

        const testFilePath = "some/file.json"
        const testJsonData = JSON.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);

        const data = fromJson(testJsonData);

        mockFs.writeFile = (filePath: string, fileData: string, callback: Function): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testJsonData);

            callback(null);
        };
        
        return writeJson(testFilePath, data);
    });

    it('can write JSON file synchronously', () => {

        const testFilePath = "some/file.json"
        const testJsonData = JSON.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);
        
        const data = fromJson(testJsonData);
        let writeDone = false;

        mockFs.writeFileSync = (filePath: string, fileData: string): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testJsonData);
            writeDone = true;
        };
        
        writeJsonSync(testFilePath, data);
        expect(writeDone).to.eql(true);
    });

});