import "../App.css";
import { useEffect, useRef, useState } from "react";
import { APIClient, Openlaw } from "openlaw";
import { Link, Outlet } from "react-router-dom";
import { Templates } from "../utility/templates";
import ContractForm from "../components/Form";
import { ethers , BigNumber} from "ethers";
import { address, abi } from "../utility/smartcontract";
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
import Preview from "../components/Preview";
import { convertTemplateToHTML } from "../utility/toHTML";
import { isValidTemplate } from "../utility/isValid";
import { Container } from "@mui/system";
import ToBlockchain from "../components/ToBlockchain";
import ropsten from "../utility/ropsten.png";
const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const style = {
  margin: "1%",
  padding: "10px",
};

function Home() {
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

  useEffect(() => {
    const connectToMetamask = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const accounts = await provider.send("eth_requestAccounts", []);

        setEthaddress(accounts[0]);
        console.log("set address = ", eth_address);
      } else console.log("please install Metamask");
    };

    connectToMetamask();
  }, [eth_address]);

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

  async function SendToBlockchain() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const openlawThai = new ethers.Contract(address, abi, provider);
      const openlawThaiSigner = openlawThai.connect(signer);
      let ans = await openlawThai.wave();
      var now = new Date();
      let storing = await openlawThaiSigner.store(now.toString(),hashed, detail);
      setMsg(ans);
      setsignedMsg(storing);
      setAlert(true);
    } else {
      alert("install metamask extension!!");
    }
  }

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
        <Link to="/">Home</Link> | <Link to="/contracts">view contracts</Link> |{" "}
        <span style={{ float: "right" }}>
          Smart Contract location (ropsten test network) :
          "0xcb51e09ba325d43123d2fed346150afbfcf64dbf"
        </span>
      </nav>
      <Outlet />

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
            <ContractForm
              template={template}
              stateLift={formUpdate}
              key={key}
            />
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
            Upload file : contract's pdf you downloaded above, or any other
            document that you want to store as a hashed on the blockchain
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
            please make sure that you have some Ether on that account
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={SendToBlockchain}
          >
            Sign tracsaction with Metamask and send to Blockchain (cost gas)
          </Button>
          <br />
          {alert && (
            <Alert severity="success">
              Contract succesfully deployed on blockchain , check "view deployed
              contract" to access this contracts on blockchain{" "}
            </Alert>
          )}
        </Box>
      </Backdrop>
      
    </>
  );
}

export default Home;

