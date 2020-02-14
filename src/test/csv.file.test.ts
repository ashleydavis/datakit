import { expect } from 'chai';
import 'mocha';
import mock from 'mock-require';
import { readCsv, readCsvSync, fromCsv, writeCsv, writeCsvSync, toCsv } from '../index';

describe('csv file', () => {

    const mockFs: any = {};

    before(() => {
        mock('fs', mockFs);
        mock.reRequire("../index");
    });

    after(() => {
        mock.stop('fs');
    });

    it('can read CSV file asynchronously', () => {

        const testFilePath = "some/file.csv"
        const testCsvData 
            = "Col1,Col2\r\n"
            + "1,2\r\n"
            + "3,4"
            ; 

        mockFs.readFile = (filePath: string, dataFormat: string, callback: Function): void => {
            expect(filePath).to.eql(testFilePath);
            expect(dataFormat).to.eql('utf8');

            callback(null, testCsvData);
        };

        return readCsv(testFilePath, { dynamicTyping: false })
            .then(data => {
                expect(toCsv(data)).to.eql(testCsvData);
            });
    });

    it('can read CSV file synchronously', () => {

        const testFilePath = "some/file.csv"
        const testCsvData 
            = "Col1,Col2\r\n"
            + "1,2\r\n"
            + "3,4"
            ; 
        

        mockFs.readFileSync = (filePath: string, dataFormat: string): string => {
            expect(filePath).to.eql(testFilePath);
            expect(dataFormat).to.eql('utf8');
            return testCsvData;
        };
        
        const data = readCsvSync(testFilePath);
        expect(toCsv(data)).to.eql(testCsvData);
    });

    it('can write CSV file asynchronously', () => {

        const testFilePath = "some/file.csv"
        const testCsvData 
            = "Col1,Col2\r\n"
            + "1,2\r\n"
            + "3,4"
            ; 
        
        const data = fromCsv(testCsvData, { dynamicTyping: false });

        mockFs.writeFile = (filePath: string, fileData: string, callback: Function): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testCsvData);

            callback(null);
        };

        return writeCsv(testFilePath, data);
    });

    it('can write CSV file synchronously', () => {

        const testFilePath = "some/file.csv"
        const testCsvData 
            = "Col1,Col2\r\n"
            + "1,2\r\n"
            + "3,4"
            ; 
        
        const data = fromCsv(testCsvData);
        let writeDone = false;

        mockFs.writeFileSync = (filePath: string, fileData: string): void => {
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testCsvData);
            writeDone = true;
        };
        
        writeCsvSync(testFilePath, data);
        expect(writeDone).to.eql(true);
    });

    it('can write CSV file asynchronously', async () => {

        const testFilePath = "some/file.csv"
        const testCsvData 
            = "1,2\r\n"
            + "3,4"
            ; 
        
        const data = fromCsv(testCsvData, { dynamicTyping: false });
        let writeDone = false;

        mockFs.writeFile = (filePath: string, fileData: string, callback: Function): void => {
            writeDone = true;
            expect(filePath).to.eql(testFilePath);
            expect(fileData).to.eql(testCsvData);

            callback(null);
        };
        
        await writeCsv(testFilePath, data);
        expect(writeDone).to.eql(true);
    });
});