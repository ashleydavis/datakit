import { expect } from "chai";
import { IOption, consumeOptionalArg, pullOptions } from "../../cli/lib/args";

describe("args", () => {

    function makeOption(...names: string[]): IOption {
        return { 
            names, 
            placeholder: "", 
            example: "", 
            desc: "" 
        };
    }

    it("can consume arg from empty args", () => {
        expect(consumeOptionalArg([], 0, makeOption("f"))).to.eql(undefined);
    });

    it("can consume separated arg from 1st option", () => {
        const argv = ["-f", "some-file", "remainder"];
        const value = consumeOptionalArg(argv, 0, makeOption("f", "file"));
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume separated arg from 2nd option", () => {
        const argv = ["--file", "some-file", "remainder"];
        const value = consumeOptionalArg(argv, 0, makeOption("f", "file"));
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume condensed arg from 1st option", () => {
        const argv = ["-f=some-file", "remainder"];
        const value = consumeOptionalArg(argv, 0, makeOption("f", "file"));
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume condensed arg from 2nd option", () => {
        const argv = ["--file=some-file", "remainder"];
        const value = consumeOptionalArg(argv, 0, makeOption("f", "file"));
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });
    
    it("can pull empty options from args", () => {
        const options = [makeOption("file", "f")];
        const argv = ["whatever", "remainder"];
        const values = pullOptions(options, argv);
        expect(values).to.eql({});
        expect(argv).to.eql(["whatever", "remainder"]);
    });

    it("can pull an option from args", () => {
        const options = [makeOption("file", "f")];
        const argv = ["whatever", "-f", "some-file", "remainder"];
        const values = pullOptions(options, argv);
        expect(values).to.eql({ file: "some-file" });
        expect(argv).to.eql(["whatever", "remainder"]);
    });

    it("can pull multiple options from args", () => {
        const options = [
            makeOption("file", "f"),
            makeOption("x"),
        ];
        const argv = ["--x", "an-option", "whatever", "-f", "some-file", "remainder"];
        const values = pullOptions(options, argv);
        expect(values).to.eql({ file: "some-file", x: "an-option" });
        expect(argv).to.eql(["whatever", "remainder"]);
    });
});