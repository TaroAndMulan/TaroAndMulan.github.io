const fs = require("fs").promises;
const currentDir = process.cwd();

export default async function handler(req, res) {
  const data = req.body;
  if (req.method == "POST") {
    console.log(data[0])
    console.log(typeof(data[0]))
    let sourceCode = await fs.readFile(currentDir+"/contract/lease_edit.sol", "utf8");
    for(let i=0;i<7;i++)
    sourceCode = sourceCode.replace(/\$\d/,data[i]);
    console.log(sourceCode)
    res.status(200).json({ in: data, out: "hehehe" });
  }
}
