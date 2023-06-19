"use client";
import Link from 'next/link'
import { useEffect, useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Templates } from "/utility/templates";
import ContractForm from "/components/Form";
import { ethers } from "ethers";
import Scan from "@/components/scan";
import { address, abi } from "/utility/smartcontract";
import { sha256 } from "crypto-hash";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Grid,
  TextField,
  Box,
  Paper,
  Alert,
  Typography,
  CircularProgress,
  Backdrop,
  Button,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Preview from "/components/Preview";
import { convertTemplateToHTML } from "/utility/toHTML";
import { isValidTemplate } from "/utility/isValid";
import { Container } from "@mui/system";
import ToBlockchain from "/components/ToBlockchain";
import ropsten from "/utility/ropsten.png";
import Identity from "@/components/Identity";
import ShowVc from "@/components/showVC";
import DrawIcon from '@mui/icons-material/Draw';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const style = {
  margin: "1%",
  padding: "10px",
};

function App() {
  const [template, setTemplate] = useState(Templates[1].txt);
  const [formData, setFormdata] = useState({});
  const [key, setKey] = useState(0);
  const textfieldRef = useRef();
  const [eth_address, setEthaddress] = useState("");
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [signed_msg, setsignedMsg] = useState("");
  const [file_input, setFileInput] = useState("");
  const [hashed, setHashed] = useState();
  const [detail, setDetail] = useState();
  const [alert, setAlert] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [vname, setVName] = useState("dog");
  const [isScan, setIsScan] = useState(0);
  const [vcdata, setVcdata] = useState([]);
  const [vclist, setVclist] = useState([]);
  const [vcdata2, setVcdata2] = useState([]);
  const [vclist2, setVclist2] = useState([]);


  const liftPayload = (x) => {
    let temppay = [];
    const claims = JSON.parse(x).claims;
    for (const [key, value] of Object.entries(claims)) {
      temppay.push(value);
    }
    setVcdata(temppay);
    let temppay2 = [];
    for (const [key, value] of Object.entries(claims)) {
      temppay2.push(key);
    }
    setVclist(temppay2);
  };

  const liftPayload2 = (x) => {
    let temppay = [];
    const claims = JSON.parse(x).claims;
    for (const [key, value] of Object.entries(claims)) {
      temppay.push(value);
    }
    setVcdata2(temppay);
    let temppay2 = [];
    for (const [key, value] of Object.entries(claims)) {
      temppay2.push(key);
    }
    setVclist2(temppay2);
  };

  const liftVname = (x) => {
    setVname(x);
    console.log("update: ", vname);
  };

  const formUpdate = (key, value, validationData) => {
    setFormdata({ ...formData, [key]: value });
    //console.log(formData)
  };

  const handleFileInput = (e) => {
    e.preventDefault();
    const pdf = new FileReader();
    var temp_hash;
    pdf.onload = async () => {
      temp_hash = await sha256(pdf.result);
      setHashed(temp_hash);
      setFileInput(pdf.result);
    };

    pdf.readAsArrayBuffer(e.target.files[0]);
    setPopup(true);
  };

  function submitTemplate(e) {
    e.preventDefault();
    setKey(key + 1);
    setFormdata({});
    setAlert(false);
    if (isValidTemplate(textfieldRef.current.value)) {
      setTemplate(textfieldRef.current.value);
    } else console.log("invalid template");
  }

  function downloadPDF(e) {
    e.preventDefault();
    const pdf = {
      content: template,
      title: Templates[0].title,
      parameters: formData,
      paragraphs: {},
      templates: {},
    };
    apiClient.downloadAsPdf(pdf);
  }
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >

  <span style={{ float: "right" }}><Link href="/verify" underline="none"><HomeWorkIcon/></Link> </span>
  <span style={{ float: "right" }}><Link href="/verify" underline="none"><CheckCircleIcon/></Link></span>
        <span style={{ float: "right" }}><Link href="/verify" underline="none"><DrawIcon></DrawIcon></Link>
</span>
<br/>
      </nav>

      <Grid container spacing={5}>
        {/*------------QR code--------*/}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              sx={{
                border: "5px solid",
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              align="center"
            >
              <Typography flexGrow={1}  sx={{fontWeight: 'bold'}} align="center">
                USER AUTHENTICATION{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Scan payloadLift={liftPayload}></Scan>
                </Grid>
                <Grid item xs={3}>
                <Scan/>
                </Grid>
                <Grid item xs={3}>
                <Scan/>
                </Grid>
                <Grid item xs={3}>
                <Scan/>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/*------------EDITABLE TEMPLATE--------*/}

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              sx={{
                border: "5px solid",
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography  sx={{fontWeight: 'bold'}} flexGrow={1} align="center">
                DRAFT{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={style}>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  fullWidth
                  defaultValue={template}
                  variant="standard"
                  inputRef={textfieldRef}
                />
                <Button color="success" onClick={submitTemplate}>
                  Generate new template.
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/*PREVIEW*/}

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              sx={{
                border: "5px solid",
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              
            >
              <Typography  sx={{fontWeight: 'bold'}} flexGrow={1} align="center">
                Sign {" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={style}>
                <Preview
                  template={template}
                  formData={formData}
                  VC={vcdata}
                  VCN={vclist}
                />
                <br/>
   
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/*BACKDROP*/}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={popup}
      >
        <Box
          sx={{
            width: 0.8,
            height: "50vh",
            textAlign: "center",
            bgcolor: "white",
          }}
        >
          Upload file
          <CloseIcon
            sx={{ float: "right", color: "black" }}
            onClick={() => {
              setPopup(false);
              setAlert(false);
            }}
          />
          <br />
          <Typography
            variant="subtitle2"
            component="h6"
            textAlign="center"
            color="#6b6b61"
          >
            Upload file : contract.pdf you downloaded above, or any other
            document that you want to store as on the blockchain (as a hash for
            now)
          </Typography>
          <br />
          <div id="file-input">
            <input type="file" onChange={handleFileInput} />
          </div>
          <br />
          <Typography
            variant="subtitle2"
            component="h6"
            textAlign="center"
            color="#6b6b61"
          >
            type some short description about what is this contract about
          </Typography>
          <br />
          <TextField
            sx={{ width: 0.5 }}
            variant="filled"
            onChange={(e) => setDetail(e.target.value)}
          />
          <br /> <br />
          <Typography
            variant="subtitle2"
            component="h6"
            textAlign="center"
            color="#6b6b61"
          >
            Recipient address
          </Typography>
          <br />
          <TextField
            sx={{ width: 0.5 }}
            variant="filled"
            onChange={(e) => {
              setRecipient(e.target.value);
              console.log(recipient);
            }}
          />
          <br />
          <br /> <br />
          <br />
          <Typography
            variant="subtitle2"
            component="h6"
            textAlign="center"
            color="#6b6b61"
          >
            Before you sign, set your metamask to Ropsten test network and
            please make sure that you have some Ether
          </Typography>
          <Button variant="contained" color="success" onClick={() => {}}>
            Sign
          </Button>
          <br />
          {alert && (
            <Alert severity="success">
              Contract succesfully deployed on blockchain , check "view deployed
              contract" tab to see all of your contracts{" "}
            </Alert>
          )}
        </Box>
      </Backdrop>
      {/*------------END--------*/}

    </>
  );
}

export default App;

//            <Identity name={vname} lift={setVName}></Identity>
//        <span style={{ float: "right" }}>ropsten test network :{address}</span>
/*          <Button
variant="contained"
endIcon={<SendIcon />}
onClick={() => setPopup(true)}
>
SET UP AUTOMATE PAYMENT WITH SMART CONTRACT
</Button> */