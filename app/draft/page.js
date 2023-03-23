"use client"
//import "./App.css";
import { useEffect, useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Templates } from "/utility/templates";
import ContractForm from "/components/Form";
import { ethers, BigNumber } from "ethers";
import { address, abi } from "/utility/smartcontract";
import { sha256 } from "crypto-hash";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
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
} from "@mui/material";
import Preview from "/components/Preview";
import { convertTemplateToHTML } from "/utility/toHTML";
import { isValidTemplate } from "/utility/isValid";
import { Container } from "@mui/system";
import ToBlockchain from "/components/ToBlockchain";
import ropsten from "/utility/ropsten.png";
const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const style = {
  margin: "1%",
  padding: "10px",
};

function App() {
  const [template, setTemplate] = useState(Templates[0].txt);
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
  const [recipient,setRecipient] = useState("");


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
    if (isValidTemplate(textfieldRef.current.value))
      setTemplate(textfieldRef.current.value);
    else
      alert(
        "INVALID TEMPLATE , need 2 square bracket for the Field you want, for example [[Price]]"
      );
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
        <span style={{ float: "right" }}>
          ropsten test network :
          {address}
        </span>
      </nav>

      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Editable Template
            </Typography>
            <button onClick={submitTemplate}> Generate new template. </button>{" "}
            <hr />
            <TextField
              id="standard-multiline-static"
              multiline
              fullWidth
              defaultValue={template}
              variant="standard"
              inputRef={textfieldRef}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Form
            </Typography>
            <hr />
        
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={style}>
            <Typography variant="h5" component="h6" textAlign="center">
              Preview
            </Typography>{" "}
            <button onClick={downloadPDF}> Download PDF</button>
            <hr />
            <Preview template={template} formData={formData} />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => setPopup(true)}
            >
              Send to Blockchain
            </Button>
          </Box>
        </Grid>
      </Grid>

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
<br/> <br/>
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
            onChange={(e) => {setRecipient(e.target.value); console.log(recipient)}}
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
          <Button
            variant="contained"
            color="success"
          >
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
    </>
  );
          }

export default App;
