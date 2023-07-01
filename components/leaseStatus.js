import Link from 'next/link';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { DetailsOutlined } from '@mui/icons-material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


let contract;
let contract_abi;


const { ethers } = require("ethers");


const Lease = ({  }) => {
  const [show,setShow] = useState(false);
  const [memo,setMemo] = useState("");
  const [contract_address,setContractAddress] = useState("");
  const [landlord,setLandlord] = useState();
  const [tenant,setTenant] = useState();
  const [info,setInfo] = useState(["0","0","0","0","0","0","0","0","0"]);
  const [loading,setLoading] = useState(false);
  let  signer;

  const API_KEY = `0d4d25903086472d9d75a742c370a972`;
const PRIVATE_KEY = `0xf1a9b392bea5c9c4fbec648e2ef6cdb5f28e0fe0e347cbf59bf80e874a347fe3`;
const infuraProvider = new ethers.providers.InfuraProvider(
  "sepolia",
  API_KEY,
);
const signerInfura = new ethers.Wallet(PRIVATE_KEY, infuraProvider);

  useEffect(()=>{
    const metamask = async()=>{

    }

    metamask();
  },[]
)


async function handleshow(){
  setShow(true)
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()
  const {abi,address} = await getcontract();
 // contract_abi= abi
  //console.log(abi)
  setContractAddress(address)
  //console.log(provider);
  contract = new ethers.Contract(address, abi, provider);
  const smartcontract_data = await contract.detail()
  let detail = smartcontract_data[0]
  let dummy = ["0","0","0","0","0","0","0","0","0"];
  console.log(smartcontract_data[1])
  dummy[0]= new Date(detail[0] * 1000);
  dummy[1] = Math.floor(detail[1]/60/60/24);
  dummy[2] = detail[2].toString();
  dummy[3] = detail[3].toString().slice(0,-9);
  dummy[4] = detail[4].toString().slice(0,-9)
  dummy[5] = detail[5].toString()
  dummy[6] = detail[6].toString()
  dummy[7] = detail[7].toString();
  dummy[8] = smartcontract_data[2]

  //console.log(detail);\
  console.log(dummy)
 // console.log(smartcontract_data[1]);
  setInfo(dummy);
  setLandlord(smartcontract_data[1][1])
  setTenant(smartcontract_data[1][0])


}

function handleLoading(){
  setLoading(false);
}
async function getcontract(){
  const data = memo
  const res = await fetch("http://localhost:8080/api/fetchcontract", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json()
}

async function paydeposit(){
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()

  const {abi,address} = await getcontract();
 // contract_abi= abi
  //console.log(abi)
  setContractAddress(address)
  //console.log(provider);
  contract = new ethers.Contract(address, abi, provider);
  const contractWithSigner = contract.connect(signer);
  const transaction = await contractWithSigner.pay_deposit( { value: ethers.utils.parseUnits(  (Number(info[3])*Number(info[6])+Number(info[4])).toString(), "gwei") });
  transaction.wait().then(async (receipt) => {
    // console.log(receipt);
    if (receipt && receipt.status == 1) {
       // transaction success.
       console.log(
          "Succesful ",
       );
       setLoading(false)
       handleshow();

    }
 });
}

async function payrent(){
  setLoading(true)
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()

  const {abi,address} = await getcontract();
 // contract_abi= abi
  //console.log(abi)
  setContractAddress(address)
  //console.log(provider);
  contract = new ethers.Contract(address, abi, provider);
  const contractWithSigner = contract.connect(signer);
  const transaction = await contractWithSigner.pay_rent( { value: ethers.utils.parseUnits(  info[3], "gwei") });
  
  transaction.wait().then(async (receipt) => {
    // console.log(receipt);
    if (receipt && receipt.status == 1) {
       // transaction success.
       console.log(
          "Succesful ",
       );
       setLoading(false)
       handleshow();

    }
 });


}

async function automate(){
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()

  const {abi,address} = await getcontract();
 // contract_abi= abi
  //console.log(abi)
  setContractAddress(address)
  //console.log(provider);
  contract = new ethers.Contract(address, abi, provider);
  const contractWithSigner = contract.connect(signer);
  const transaction = await contractWithSigner.automate( {gasLimit: 5000000});
  transaction.wait().then(async (receipt) => {
    // console.log(receipt);
    if (receipt && receipt.status == 1) {
       // transaction success.
       console.log(
          "status succesful",
       );
       setLoading(false)
       handleshow();

    }
 });
}



async function landlordwithdrawn(){
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  provider.send("eth_requestAccounts", []);
  signer = provider.getSigner()

  const {abi,address} = await getcontract();
 // contract_abi= abi
  //console.log(abi)
  setContractAddress(address)
  //console.log(provider);
  contract = new ethers.Contract(address, abi, provider);
  const contractWithSigner = contract.connect(signer);
  const transaction = await contractWithSigner.landlordwithdrawn({gasLimit: 5000000});
  transaction.wait().then(async (receipt) => {
    // console.log(receipt);
    if (receipt && receipt.status == 1) {
       // transaction success.
       console.log(
          "Succesful ",
       );
       setLoading(false)
       handleshow();

    }
 });
}

const displayICON = (s)=>{
  if(s=='inactive')
   return <DangerousIcon style={{ color: "red" }}/>
  else if(s=="active")
  return  (<ScheduleIcon style={{ color: "green" }}/>)
  else if(s=="complete") 
  return (<CheckIcon style={{ color: "green" }}/>)
  else return <DangerousIcon style={{ color: "red" }}/>
}
  const LeaseStatus = ({_abi,_address})=> {


    return(
      <>
      
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Lease Agreement
      </Typography>
      <Typography variant="h5" component="div">
      Smart Contract Address : {contract_address} 
      <Link href={"https://sepolia.etherscan.io/address/"+contract_address}><OpenInNewIcon/></Link>
      </Typography>
      <br/>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        INFO
      </Typography>
      <Typography variant="body2">
        Landlord  = {landlord} <br/>
        Tenant  = {tenant} <br/>
        เริ่มวันที่ = {JSON.stringify(info[0]).slice(1,-15)}<br/>
        จ่ายทุกๆ {(info[1])} วัน 
        เป็นจำนวน {info[2]} ครั้ง <br/>
        ค่าเช่า {info[3]} บาท <br/>
        ค่ามัดจำ {info[4]} บาท  (คืนให้หลังจบสัญญา) <br/>
        จ่ายล่วงหน้า   {info[6]} งวดก่อนเข้าพัก  <br/>
        เงื่อนไขผิดสัญญา : ขาดค่าเช่า  {Math.floor(info[5]+1)} งวด

        
      </Typography>
      <br/>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        STAT๊US
      </Typography>
      <Typography variant="body2">
        สถานะ = {info[8]}  
         {

          displayICON(info[8])
         
         
         }
         
        
      
        <br />
      
        ระยะเวลาตามสัญญา : {info[2]}  รอบ
        <br />
        จ่ายแล้ว : {info[7]} รอบ   <br />


        
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={paydeposit}> เริ่มสัญญา </Button>
      <Button size="small" variant="contained" onClick={payrent}>จ่ายค่าเช่า</Button>

      <Button size="small" variant="contained" onClick={automate}>ตรวจสอบสถานะสัญญา</Button>
      <Button size="small" variant="contained" onClick={landlordwithdrawn}>ถอนเงินออกจากสัญญาอัจฉริยะ </Button>


    </CardActions>
  </Card> 
      </>
    )
  }


  return (
    <>


      <Box m={2} component="form" xs={12} md={12} noValidate autoComplete="off">
        <Card variant="outlined" sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="top"
            justifyContent="center"
          >
            <Grid item xs={12} md={3}>
              <TextField
                required
                fullWidth
                id="password"
                label="ใส่หมายเลขสัญญา"
                value={memo}
                onChange={(e)=>setMemo(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ height: "56px" }}
                onClick={handleshow}
              >
                ค้นหาสัญญาอัจฉริยะ
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>



    { show?  <LeaseStatus/>: <></>}

    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
  onClick={handleLoading}
>
  <CircularProgress color="inherit" />
</Backdrop>

    </>
  );
};

export default Lease;


/*
      const tx = signer.sendTransaction({
        to: "0xbA7142eDA44C5A7590Ce90209a92A0db63d5473F",
        value: ethers.utils.parseEther("0.1")
    }) */