import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useLayoutEffect, useState } from "react";
import { convertTemplateToHTML } from "../utility/toHTML";
import { extractTextInParenthesis } from "../utility/parseform";
import { Box, Card, TextField } from "@mui/material";
import { Grid, Button, Select, Typography } from "@mui/material";
import { output, FormControl, InputLabel } from "@/next.config";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import customVfs from "../utility/vfs_fonts";
import SendIcon from "@mui/icons-material/Send";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { sha256 } from "crypto-hash";
import { Templates } from "@/utility/templates";
import Backdrop from "@mui/material/Backdrop";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import  { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';


import {
  generateKeyPair,
  sign,
  verify,
} from "@decentralized-identity/ion-tools";

const publicJwk = {
  kty: "EC",
  crv: "secp256k1",
  x: "Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
  y: "NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4",
};

const privateJwk = {
  kty: "EC",
  crv: "secp256k1",
  x: "Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
  y: "NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4",
  d: "EejP6XsGFZzIOGSgbbIUK1WloScvYL5Kxlbj5PvpzeI",
};

const Preview = ({ template, VC, VCN, choice }) => {
  const [cow, setCow] = useState();
  const [open, setOpen] = useState(false);
  const [submit,setSubmit] = useState(["0","0","0","0","0","0","0","0","0","0"]);
  const formtitle = extractTextInParenthesis(template);
  const tempformdata = formtitle.map((title) => {
    return " ";
  });

  const [formdata, setFormdata] = useState(tempformdata);
  const [preview, setPreview] = useState(template);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // set submit i index with value v
  function subhelp(i,v){
    const temp = submit.map((d,j)=>{if(i==j) return v; else return d;})
    setSubmit(temp);
  }

  async function handleSubmit() {
    const resp = await fetch('http://localhost:8080/api/deploy', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submit)
    });
    console.log(resp)
    console.log(resp.json())
  

  }
  const Smartgenerate = () => {
    

    return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Customized smart contract condition  <button onClick={handleClose}>close</button>

            </Typography>
            <Typography variant="h5" component="div">
              <IconButton size="large">
                {" "}
                <AddIcon style={{ color: "green" }} />
              </IconButton>{" "}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              current condition
            </Typography>
            <TextField value={submit[0]} label="StartDate" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)} />
  


          </CardContent>
          <CardActions>
            <Button size="small">SUBMIT </Button>
          </CardActions>
        </Card>
      </>
    );
  };

  function fillcontract() {
    //console.log("outbug1", template, VC,VCN,formtitle,tempformdata)
    let outputString = template;
    //console.log("outbug: ",outputString)
    const regex = "/[(.*?)]/g";

    for (let i = 0; i < formtitle.length; i++) {
      let filled = formdata[i].length > 1 ? formdata[i] : "______";
      if (formtitle[i].charAt(formtitle[i].length - 1) == "C") {
        outputString = outputString.replace(
          /\[(.*?)\]/,
          '<span style="color:green">' + filled + "</span>",
          1
        );
      } else
        outputString = outputString.replace(
          /\[(.*?)\]/,
          '<span style="color:red">' + filled + "</span>",
          1
        );
    }

    outputString = outputString.replace(/\n/g, "<br/>");
    const regex2 = "/**(.*)**/g";
    outputString = outputString.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    //console.log(outputString);
    outputString =
      outputString +
      `<br/> <span> signed by VCsignThesis </span> <br/> <span> did:ion:EiAmFosP8PQIpI4PftKVt5fZaC_gbcNg8xM6nDAQf4I4FA </span>`;
    setPreview(outputString);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function printDocument() {
    pdfMake.vfs = customVfs.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: "THSarabunNew.ttf",
        bold: "THSarabunNew-Bold.ttf",
        italics: "THSarabunNew-Italic.ttf",
        bolditalics: "THSarabunNew-BoldItalic.ttf",
      },
    };

    var html = htmlToPdfmake(`<pre>${preview}</pre>`);
    const documentDefinition = {
      content: html,
      defaultStyle: { font: "THSarabunNew" },
      watermark: {
        text: "SIGNED --- did:ion:EiAmFosP8PQIpI4PftKVt5fZaC_gbcNg8xM6nDAQf4I4FA",
        color: "blue",
        opacity: 0.3,
        bold: true,
        italics: false,
      },
    };
    //pdfMake.createPdf(documentDefinition).open();
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    //let dog;
    pdfDocGenerator.download();
    pdfDocGenerator.getBuffer((buffer) => {
      console.log("check this shit");
      console.log(buffer);
      console.log(sha256(buffer));
    });
    let payloadtosign;
    pdfDocGenerator.getBase64((b) => {
      payloadtosign = b.slice(0, -150);
      //console.log("cat");
      //console.log(cat);
    });

    await delay(3000);
    let jws = await sign({ payload: payloadtosign, privateJwk });

    const fileData = JSON.stringify(jws);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "jws";
    link.href = url;
    link.click();
  }

  function enforce() {
    handleOpen();
    /*
    let startDate = Math.floor(new Date().getTime() / 1000);
    let interval = 1 months;
    uint duration;
    string public status;
    uint public paid;
    //3=rent 4=deposit 5=maxUnpaid 6=advanec
    uint rent;
    uint deposit;
    uint maxUnpaid;
    uint advance;*/
  }

  useEffect(() => {
    fillcontract();
  }, [formdata, template]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          {formtitle.map((title, index) => {
            if (title.slice(-2) != "VC")
              return (
                <>
                  {" "}
                  <TextField
                    fullWidth
                    margin="normal"
                    key={index}
                    id="outlined-controlled"
                    label={title}
                    value={formdata[index]}
                    onChange={(event) => {
                      const tempformdata = formdata.map((data, ii) => {
                        if (ii === index) return event.target.value;
                        else return data;
                      });
                      setFormdata(tempformdata);
                    }}
                  />
                </>
              );
            else {
              return (
                <>
                  <TextField
                    fullWidth
                    key={index}
                    id="outlined-select-currency"
                    select
                    onChange={(event) => {
                      const tempformdata = formdata.map((data, ii) => {
                        if (ii === index) return event.target.value;
                        else return data;
                      });
                      setFormdata(tempformdata);
                    }}
                    label={title}
                    defaultValue={formdata[index]}
                  >
                    {VC.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {VCN[index]} : {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <hr />
                </>
              );
            }
          })}
        </Grid>

        <Grid item xs={9}>
          <div dangerouslySetInnerHTML={{ __html: preview }} id="wtf" />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            endIcon={<EditNoteIcon />}
            onClick={printDocument}
          >
            SIGN
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={enforce} endIcon={<SendIcon />}>
            ENFORCE WITH SMART CONTRACT
          </Button>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >

<>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Customized smart contract condition  <button onClick={handleClose}>close</button>

            </Typography>
  
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              current condition
            </Typography>
             <Box  sx={{display:'flex',alignItems:'center'}}> <Typography >วันเริ่ม</Typography> </Box>  <Box ml={10}><TextField value={submit[0]} label="วันเริ่ม" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)} /></Box>    <br/>
            <TextField value={submit[1]} label="ทุกๆ" variant="outlined"  onChange={(e)=>subhelp(1,e.target.value)}/>  <br/>
            <TextField value={submit[2]} label="งวด" variant="outlined"  onChange={(e)=>subhelp(2,e.target.value)}/><br/>
            <TextField value={submit[3]} label="ค่าเช่า" variant="outlined"  onChange={(e)=>subhelp(3,e.target.value)}/><br/>
            <TextField value={submit[4]} label="เงินมัดจำ" variant="outlined"  onChange={(e)=>subhelp(4,e.target.value)}/><br/>
            <TextField value={submit[5]} label="อนุโลม" variant="outlined" onChange={(e)=>subhelp(5,e.target.value)}/><br/>
            <TextField value={submit[6]} label="จ่ายล่วงหน้า" variant="outlined"  onChange={(e)=>subhelp(6,e.target.value)}/><br/>
            <hr/>
            <TextField value={submit[9]} label="MEMO" variant="outlined"  onChange={(e)=>subhelp(9,e.target.value)}/>

          </CardContent>
          <CardActions>
          <Button onClick={handleSubmit}>SUBMIT</Button>
          </CardActions>
        </Card>
      </>

      </Backdrop>
    </>
  );
};

export default Preview;

//    <div dangerouslySetInnerHTML={{ __html: convertTemplateToHTML("asdsad  \n asdasds") }} />

/*
<Grid item xs={10}>
<p style={{ "white-space": "pre-wrap" }}>{template}</p> 
</Grid>
*/


/*

          
            <TextField id="outlined-basic" label="Interval" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)}/>
            <TextField id="outlined-basic" label="duration" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)}/>
            <TextField id="outlined-basic" label="rent" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)}/>
            <TextField id="outlined-basic" label="deposit" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)}/>
            <TextField id="outlined-basic" label="maxUnpaid" variant="outlined" onChange={(e)=>subhelp(0,e.target.value)}/>
            <TextField id="outlined-basic" label="advance" variant="outlined"  onChange={(e)=>subhelp(0,e.target.value)}/>
            */


            /*
                      <Typography variant="h5" component="div">
              <IconButton size="large">
                {" "}
                <AddIcon style={{ color: "green" }} />
              </IconButton>{" "}
            </Typography> */