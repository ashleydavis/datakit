import { assert, expect } from 'chai';
import 'mocha';
import { toCsv, fromCsv } from '../..';
import dayjs from "dayjs";

describe('csv', () => {

	it('can save empty array to csv', function () {

		const csvData = toCsv([]);
		assert.isString(csvData);
		expect(csvData.length).to.eql(0);
	});

	it('can save data to csv', function () {

        const data = [
            {
                Column1: 'A',
                Column2: 1,
            },
            {
                Column1: 'B',
                Column2: 2,
            },
        ];

		const csvData = toCsv(data);
		assert.isString(csvData);
		expect(csvData).to.eql(
			"Column1,Column2\r\n" +
			"A,1\r\n" +
			"B,2"
		);
	});
    
	it('can save data to csv with no header', function () {

        const data = [
            {
                Column1: 'A',
                Column2: 1,
            },
            {
                Column1: 'B',
                Column2: 2,
            },
        ];

		const csvData = toCsv(data, { header: false });
		expect(csvData).to.eql(
			"A,1\r\n" +
			"B,2"
		);
	});

	it('can read CSV', () => {
		
		const csv =
			"Date, Value1, Value2, Value3\n" +
			"1975-2-24, 100, foo, 22\n" +
			"2015-10-23, 300, bar, 23";

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                Date: "1975-2-24",
                Value1: "100",
                Value2: "foo",
                Value3: "22",
            },
            {
                Date: "2015-10-23",
                Value1: "300",
                Value2: "bar",
                Value3: "23",
            },
        ]);
	});

	it('blank lines in the CSV data are automatically skipped by default', () => {
		
		const csv =
			"Date, Value1, Value2, Value3\n" +
            "1975-2-24, 100, foo, 22\n" +
            "\n" +
			"2015-10-23, 300, bar, 23";

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                Date: "1975-2-24",
                Value1: "100",
                Value2: "foo",
                Value3: "22",
            },
            {
                Date: "2015-10-23",
                Value1: "300",
                Value2: "bar",
                Value3: "23",
            },
        ]);
	});

    it('can automatically choose types from CSV values', () => {
		
		const csv =
			"Value1, Value2\n" +
			"100, foo\n" +
			"300, bar";

		const data = fromCsv(csv, { dynamicTyping: true });
        expect(data).to.eql([
            {
                Value1: 100,
                Value2: "foo",
            },
            {
                Value1: 300,
                Value2: "bar",
            },
        ]);
    });
    
	it('can read CSV with explicit header', () => {
		
		const csv =
			"1975-2-24, 100, foo, 22\n" +
			"2015-10-23, 300, bar, 23";

        const data = fromCsv(csv, { dynamicTyping: false, columnNames: ["Date", "Value1", "Value2", "Value3"] });
        expect(data).to.eql([
            {
                Date: "1975-2-24", 
                Value1: "100",
                Value2: "foo",
                Value3: "22",
            },
            {
                Date: "2015-10-23", 
                Value1: "300",
                Value2: "bar",
                Value3: "23",
            },
        ]);
	});

	it('can handle CSV with trailing commas', () => {
		
		const csv =
			"c1, c2,\n" +
			"f, 1,2\n" +
			"x, 2,2";

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                c1: "f",
                c2: "1",
            },
            {
                c1: "x",
                c2: "2",
            }
        ]);
	});

	it('can handle CSV with quoted fields', () => {
		
		const csv =
			'"c1","c2"\n' +
			'"a","1"\n' +
			'"b","2"';

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                c1: "a",
                c2: "1",
            },
            {
                c1: "b",
                c2: "2",
            },
        ]);
	});	

	it('can handle CSV with unix line endings', () => {
		
		const csv =
			'c1,c2\n' +
			'a,1\n' +
			'b,2';

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                c1: "a",
                c2: "1",
            },
            { 
                c1: "b",
                c2: "2",
            },
        ]);
	});	

	it('can handle CSV with windows line endings', () => {
		
		const csv =
			'c1,c2\r\n' +
			'a,1\r\n' +
			'b,2';

        const data = fromCsv(csv, { dynamicTyping: false });
        expect(data).to.eql([
            {
                c1: "a",
                c2: "1",
            },
            {
                c1: "b",
                c2: "2",
            },
        ]);
	});	

	it('can handle ASX share game CSV', () => {

		const csv =
			'"Company name","Code",\n' +
			'"AUSTRALIAN AGRICULTURAL COMPANY LIMITED.","AAC",\n' +
			'"ARDENT LEISURE GROUP","AAD",\n';

        const data = fromCsv(csv);
        expect(data).to.eql([
            {
                "Company name": "AUSTRALIAN AGRICULTURAL COMPANY LIMITED.",
                "Code": "AAC"
            },
            {
                "Company name": "ARDENT LEISURE GROUP",
                "Code": "AAD"
            },
        ]);
    });
    
    it("can load booleans from csv", () => {
		const csv =
			'col\r\n' +
			'true\r\n' +
			'false';

        const data = fromCsv(csv);
        expect(data).to.eql([
            {
                col: true,
            },
            {
                col: false,
            },
        ]);
    });

    it("can load numbers from csv", () => {
		const csv =
			'col\r\n' +
			'2.2\r\n' +
			'0.3';

        const data = fromCsv(csv);
        expect(data).to.eql([
            {
                col: 2.2,
            },
            {
                col: 0.3,
            },
        ]);
    });

    it("can do custom column parsing", async () => {
		const csv =
			"Date\n" +
			"1975-2-24\n" +
            "2015-10-23";
            
        const data = fromCsv(csv, { parser: {  Date: value => dayjs(value, "YYYY-MM-D").toDate() } });
        expect(data).to.eql([
            {
                Date: dayjs("1975-2-24", "YYYY-MM-D").toDate(),
            },
            {
                Date: dayjs("2015-10-23", "YYYY-MM-D").toDate(),
            },
        ]);

    });

    it("can do custom column formatting", async () => {
        const data = [
            {
                Date: dayjs("1975-2-24", "YYYY-M-D").toDate(),
            },
            {
                Date: dayjs("2015-10-23", "YYYY-M-D").toDate(),
            },
        ];

		const csvData = toCsv(data, { formatter: { Date: date => dayjs(date).format("YYYY-M-D") } });
		expect(csvData).to.eql(
			"Date\r\n" +
			"1975-2-24\r\n" +
			"2015-10-23"
		);
    });
});