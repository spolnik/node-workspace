import {Util} from "../util";
import {expect} from "chai";

describe("Util", () => {
    describe("#getDataPath", () => {
        it("should return data file path", () => {
            let result: string = Util.getDataPath();

            expect(result).to.equal(`${Util.getHomeDirectory()}/data.json`);
        });
    });
});
