const fs = require("fs").promises;
const currentDir = process.cwd();

export default async function handler(req, res) {
  const data = req.body;
  if (req.method == "POST") {
    console.log(data)
    const sourceCode = await fs.readFile(currentDir+"/contract/Demo.sol", "utf8");
    console.log(sourceCode)
    res.status(200).json({ in: data, out: "hehehe" });
  }
}
