import { expect } from 'chai';
import 'mocha';
import { fromJson, fromObject } from '../..';

describe('test', () => {
    
	it('can load from array of empty objects', () => {

		const jsData = "[{}, {}]";
        const data = fromJson(jsData);
        expect(data).to.eql([
			{},
			{},
		]);
	});

	it('error loading from empty json string', () => {

		const jsData = "";
		expect(() => fromJson(jsData)).to.throw();
	});

	it('can load from json with json array', () => {

		const jsData = "[]";
        const data = fromJson(jsData);
        expect(data).to.eql([]);
	});

	it('can load from json array', () => {

		const jsData = 
			'[' +
				'{' +
					'"Column1": "A",' +
					'"Column2": 1' +
				'},' +
				'{' +
					'"Column1": "B",' +
					'"Column2": 2' +
				'}' +
            ']';
            
        const data = fromJson(jsData);
        expect(data).to.eql([
            {
                Column1: "A",
                Column2: 1,
            },
            {
                Column1: "B",
                Column2: 2,
            },
        ]);
	});

	it('uneven columns loaded from json result in uneven values', () => {

		const jsData = 
			'[' +
				'{' +
					'"Column1": "A"' +
				'},' +
				'{' +
					'"Column2": 2' +
				'}' +
			']';
        const data = fromJson(jsData);
        expect(data).to.eql([
            { 
                Column1: "A",
            },
            {
                Column2: 2,
            },
        ]);
	});	

    it('can convert object to array', () => {

        const data = fromObject({
            Value1: 5,
            Value2: "foo",
            Value3: 2.5
        });

        expect(data).to.eql([
            {
                field: "Value1",
                value: 5,
            },
            {
                field: "Value2",
                value: "foo",
            },
            {
                field: "Value3",
                value: 2.5,
            },
        ]);
    });
});
