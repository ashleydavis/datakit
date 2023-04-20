import { assert, expect } from 'chai';
import 'mocha';
import { toYaml, fromYaml } from '..';
import dayjs from "dayjs";
const YAML = require("yaml");

describe('yaml', () => {

	it('can save empty array to yaml', function () {
		expect(toYaml([])).to.eql(YAML.stringify([]));
	});

	it('can save data to yaml', function () {
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

		expect(toYaml(data)).to.eql(YAML.stringify(data));
    });	
    
    it("can parse data", async () => {
        const input = [
            {
                "Date": "1975-2-24",
            },
            {
                "Date": "2015-10-23",
            },
        ];
        const yaml = YAML.stringify(input);
        const data = fromYaml(yaml);
        expect(data).to.eql(input);

    });

});
