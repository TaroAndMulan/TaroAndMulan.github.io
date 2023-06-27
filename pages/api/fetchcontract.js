const fs = require("fs").promises;
const currentDir = process.cwd();

export default async function handler(req, res) {
  const data = req.body;
  if (req.method == "POST") {
  //  console.log(data)
    let sourceCode = await fs.readFile(currentDir+"/contract/signedContract/"+data+".json", "utf8");
   // console.log(sourceCode)
    sourceCode = JSON.parse(sourceCode)
   // console.log(sourceCode)
   // console.log(sourceCode["abi"])
    res.status(200).json({"abi":sourceCode["abi"],"address":sourceCode["address"]});
  }
}
