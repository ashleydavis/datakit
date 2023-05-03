import { expect } from "chai";
import { consumeOptionalArg } from "../../cli/lib/args";

describe("args", () => {

    it("can consume arg from empty args", () => {
        expect(consumeOptionalArg([], ["-f"], "")).to.eql(undefined);
    });

    it("can consume separated arg from 1st option", () => {
        const argv = ["-f", "some-file", "remainder"];
        const value = consumeOptionalArg(argv, ["-f", "--file"], "");
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume separated arg from 2nd option", () => {
        const argv = ["--file", "some-file", "remainder"];
        const value = consumeOptionalArg(argv, ["-f", "--file"], "");
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume condensed arg from 1st option", () => {
        const argv = ["-f=some-file", "remainder"];
        const value = consumeOptionalArg(argv, ["-f", "--file"], "");
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    it("can consume condensed arg from 2nd option", () => {
        const argv = ["--file=some-file", "remainder"];
        const value = consumeOptionalArg(argv, ["-f", "--file"], "");
        expect(value).to.eql("some-file");
        expect(argv).to.eql(["remainder"]);
    });

    //todo:
});