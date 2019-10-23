import { assert, expect } from 'chai';
import 'mocha';
import { toJson } from '..';

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
    
});
