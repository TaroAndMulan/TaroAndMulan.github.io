const fs = require("fs");
const currentDir = process.cwd();

export default async function handler(req, res) {
  const data = req.body;
  if (req.method == "POST") {
    const content = fs.readFileSync(currentDir+"/contract/Demo.sol")
    try {
      fs.writeFileSync(currentDir + "/contract/test.sol", content+"hahaha");
      // file written successfully
    } catch (err) {
      console.error(err);
    }

    res.status(200).json({ in: data, out: "hehehe" });
  }
}
