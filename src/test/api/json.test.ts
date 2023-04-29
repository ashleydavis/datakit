import { assert, expect } from 'chai';
import 'mocha';
import { toJson, fromJson } from '../..';
import dayjs from "dayjs";

describe('json', () => {

	it('can save empty array to json', function () {
		expect(toJson([])).to.eql("[]");
	});

	it('can save data to json', function () {
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

		expect(toJson(data)).to.eql(
			'[\n' +
			'    {\n' +
			'        "Column1": "A",\n' +
			'        "Column2": 1\n' +
			'    },\n' +
			'    {\n' +
			'        "Column1": "B",\n' +
			'        "Column2": 2\n' +
			'    }\n' +
			']'
		);
    });	
    
    it("can do custom column parsing", async () => {
        const json =
            '[\n' +
            '    {\n' +
            '        "Date": "1975-2-24"\n' +
            '    },\n' +
            '    {\n' +
            '        "Date": "2015-10-23"\n' +
            '    }\n' +
            ']';
            
        const data = fromJson(json, { parser: {  Date: value => dayjs(value, "YYYY-MM-D").toDate() } });
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

		const jsonData = toJson(data, { formatter: { Date: date => dayjs(date).format("YYYY-M-D") } });
		expect(jsonData).to.eql(
            '[\n' +
            '    {\n' +
            '        "Date": "1975-2-24"\n' +
            '    },\n' +
            '    {\n' +
            '        "Date": "2015-10-23"\n' +
            '    }\n' +
            ']'
		);
    });
});
