const fs = require("fs").promises;
const fs2 = require("fs");
import Web3 from "web3";
const solc = require("solc");


async function compile_contract(data) {
  function compile(sourceCode, contractName) {
    // Create the Solidity Compiler Standard Input and Output JSON
    const input = {
      language: "Solidity",
      sources: { main: { content: sourceCode } },
      settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
    };
    // Parse the compiler output to retrieve the ABI and Bytecode
    const output = solc.compile(JSON.stringify(input));
    const artifact = JSON.parse(output).contracts.main[contractName];
    return {
      abi: artifact.abi,
      bytecode: artifact.evm.bytecode.object,
    };
  }
  
  // Load the contract source code
  const currentDir = process.cwd();
  let sourceCode = await fs.readFile(currentDir+"/contract/lease_edit.sol", "utf8");
  data[0]= Math.floor(new Date(data[0]).getTime()/1000)
  for(let i=0;i<7;i++)
  sourceCode = sourceCode.replace(/\$\d/,data[i]);
  console.log(sourceCode)
  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, "Lease");
  // Store the ABI and Bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.writeFile(currentDir+"/contract/signedContract/"+data[9]+".json", artifact);
}

async function deploy(data){
    const currentDir = process.cwd();

    const { abi, bytecode } = JSON.parse(fs2.readFileSync(currentDir+"/contract/signedContract/"+data[9]+".json"));
    const newfile = JSON.parse(fs2.readFileSync(currentDir+"/contract/signedContract/"+data[9]+".json"));
  //console.log("abi: ", abi)
  //console.log("bycode: ", bytecode)
    const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );
 // console.log(network)
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  //contract.options.data = bytecode;
  //console.log("BEFORE DEPLOYED, ABI :",contract)
  const deployTx = contract.deploy({data:bytecode});
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: 6000000,
      //gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The contract is now deployed on chain!
  newfile["address"] = deployedContract.options.address
  await fs.writeFile(currentDir+"/contract/signedContract/"+data[9]+".json", JSON.stringify(newfile));

  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`,
  );
  return deployedContract.options.address
}

export default async function handler(req, res) {
  //console.log("process: ", process.env.INFURA);
  const data = req.body;
  await compile_contract(data);
  const smartcontractaddress = await deploy(data);
  //console.log(process.cwd())
  if (req.method == "GET") res.status(200).json({"status":"get success"});
  else if (req.method == "POST") {
    res.status(200).json({"address":smartcontractaddress});
  }
}
