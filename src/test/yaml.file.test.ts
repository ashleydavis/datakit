import { assert, expect } from 'chai';
import 'mocha';
import mock from 'mock-require';
import { readYaml, readYamlSync, fromYaml, writeYaml, writeYamlSync, toYaml } from '..';
const YAML = require("yaml");

describe('Yaml file', () => {

    const mockFs: any = {};

    before(() => {
        mock('fs', mockFs);
        mock.reRequire("../index");
    });

    after(() => {
        mock.stop('fs');
    });

    it('can read YAML file asynchronously', () => {

        const testFilePath = "some/file.Yaml"
        const testYamlData = YAML.stringify([
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

            callback(null, testYamlData);
        };
        
        return readYaml(testFilePath)
            .then(data => {
                expect(toYaml(data)).to.eql(testYamlData);
            });
    });

    it('can read YAML file synchronously', () => {

        const testFilePath = "some/file.Yaml"
        const testYamlData = YAML.stringify([
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

            return testYamlData;
        };
        
        const data = readYamlSync(testFilePath);
        expect(toYaml(data)).to.eql(testYamlData);
    });

    it('can write YAML file asynchronously', () => {

        const testFilePath = "some/file.Yaml"
        const testYamlData = YAML.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);

        const data = fromYaml(testYamlData);

        mockFs.writeFile = (filePath: string, fileData: string, callback: Function): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testYamlData);

            callback(null);
        };
        
        return writeYaml(testFilePath, data);
    });

    it('can write YAML file synchronously', () => {

        const testFilePath = "some/file.Yaml"
        const testYamlData = YAML.stringify([
            {
                Col1: 1,
                Col2: 2,
            },
            {
                Col1: 3,
                Col2: 4,
            },
        ], null, 4);
        
        const data = fromYaml(testYamlData);
        let writeDone = false;

        mockFs.writeFileSync = (filePath: string, fileData: string): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testYamlData);
            writeDone = true;
        };
        
        writeYamlSync(testFilePath, data);
        expect(writeDone).to.eql(true);
    });

});