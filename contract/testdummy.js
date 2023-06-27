const fs = require("fs").promises;
const fs2 = require("fs");
const solc = require("solc");


async function main(){
    const currentDir =  process.cwd()
    let d = await fs.readFile(currentDir+"/dummy.json", "utf8");
    d = JSON.parse(d)
    const data = {"address":"1234"};
    d["address"]=1234
    console.log(d)
    // Store the ABI and Bytecode into a JSON file
    const artifact = JSON.stringify(d);
    await fs.writeFile(currentDir+"/dummyresult.json", artifact);
}


main()