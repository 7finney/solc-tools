import { parseJSONDir, parseJSONFile } from '../build/outputGenerator';
import 'mocha';
import chai from 'chai';
import chaiFiles from 'chai-files';
import * as fs from 'fs';
parseJSONDir(__dirname + "/JSONdir-inputs/JSONinputs");
parseJSONFile(__dirname + "/JSONfile-input/JSONfile-input.json");


chai.use(chaiFiles);

var expect = chai.expect;
var chaifile = chaiFiles.file;
var dir = chaiFiles.dir;

describe('test', () => {
    describe('#parseJSONDir', () => {
        it('create output directory if does not exist and append output in files with same name', () => {
            
            expect(dir(__dirname + '/JSONdir-inputs/JSONoutputs')).to.exist;
            fs.readdir(__dirname + "/JSONdir-inputs/JSONexpected-outputs", (err, files)=> {
                files.forEach((file) => {
                    expect(chaifile(__dirname + "/JSONdir-inputs/JSONoutputs/" + file)).to.exist;
                    expect(chaifile(__dirname + "/JSONdir-inputs/JSONoutputs/" + file)).to.equal(chaifile(__dirname + "/JSONdir-inputs/JSONexpected-outputs/" + file));
                });
            });
        });
    });
    describe('#parseJSONFile', () => {
        it('create a output file and append output to it', () => {
            expect(chaifile(__dirname + "/JSONfile-input/JSONfile-output.json")).to.exist;
            expect(chaifile(__dirname + "/JSONfile-input/JSONfile-output.json")).to.equal(chaifile(__dirname + "/JSONfile-input/JSONexpected-file-output.json"));
        });
    });
});