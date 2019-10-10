import * as fs from "fs";
import nodeCompile from "../../solc-compiler-node/build/compiler";
export async function parseJSONDir(dir:string){
    try {
        await fs.readdir(dir, function (err, files) {
            if (err) {
                console.error('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                const data = fs.readFileSync(dir + "/" + file, 'UTF-8');
                var obj: any;
                obj = JSON.parse(data);
                obj.outputJSON = nodeCompile({
                    "greeter.sol": {
                        "content": obj['sourceCode']
                    }
                });
                if (!fs.existsSync(dir + "/../JSONoutputs")){
                    fs.mkdirSync(dir + "/../JSONoutputs");
                }
                fs.writeFile(dir + "/../JSONoutputs/" + file, JSON.stringify(obj, null, 4), 'UTF-8', function (err) {
                    if(err) {
                        console.error("An error has occured during updating the result to file");
                        return err;
                    }
                    console.log("JSON file: " + dir + "/" + file + " has been updated with outputJSON");
                }); 
            });
    
        });
    } catch (err) {
        console.error(err);
    }
}
export async function parseJSONFile(file: string) {
    try {
        const data = fs.readFileSync(file, 'UTF-8');
        var obj: any = JSON.parse(data);
        obj.outputJSON = nodeCompile({
            "greeter.sol": {
                "content": obj['sourceCode']
            }
        });
        const nFile = file
        fs.writeFile(file.slice(0, -11)+"-output.json", JSON.stringify(obj, null, 4), 'UTF-8', function (err: any) {
            if(err) {
                console.error("An error has occured during updating the result to file");
                return err;
            }
            console.log("JSON file: " + file + " has been updated with outputJSON");
        });
    } catch (err) {
        console.error(err);
        
    }
}