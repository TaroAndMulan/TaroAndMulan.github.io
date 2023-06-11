
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { generateKeyPair, sign, verify } from '@decentralized-identity/ion-tools';
//import { readFile, writeFile } from 'fs/promises';
import * as ionprivate from '../private/ionkey.json';
import * as ionpublic from '../private/ionkey2.json';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { Check, Upload } from "@mui/icons-material";
import { sha256 } from "crypto-hash";
//const fs = require('fs');


function Verify() {


    const [pdf,setPdf] = useState()
    const [proof,setProof] = useState()
    const [ready,setReady] = useState(0)
    const [readyj,setReadyj] = useState(0)
    const [uploadjws,setUploadjws] = useState()
    const [pdfdata,setPdfdata] = useState()
    const [realjws,setRealjws] = useState();
    const [valid,setValid] = useState(false)
    const [verified,setVerified] = useState(0);
    const [pdfbuffer,setPdfbuffer] = useState();
    const [jwsfile,setJwsfile] = useState()


    function handlefilechange(e){
      const pdfcontent = new FileReader();
      pdfcontent.onloadend = ()=>{setPdfdata(pdfcontent.result)}
      pdfcontent.readAsBinaryString(e.target.files[0])
      const pdfcontent2 = new FileReader();
      pdfcontent2.onloadend = ()=>{var uint8View = new Uint8Array(pdfcontent2.result);
        setPdfbuffer(uint8View)}
      pdfcontent2.readAsArrayBuffer(e.target.files[0])
      setPdf(e.target.files[0]);
      setReady(1)
      setVerified(0)
        
    }

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });


    const publicJwk = {"kty":"EC","crv":"secp256k1",
    "x":"Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
    "y":"NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4"}

    const privateJwk = {"kty":"EC","crv":"secp256k1"
    ,"x":"Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
    "y":"NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4"
    ,"d":"EejP6XsGFZzIOGSgbbIUK1WloScvYL5Kxlbj5PvpzeI"}


    function handlejwschange(e){
        const jwsupload = new FileReader();
        jwsupload.onloadend = ()=>{ setUploadjws(jwsupload.result.slice(1,-1))}
        jwsupload.readAsText(e.target.files[0])
        setVerified(0)
        setJwsfile(e.target.files[0])
        setReadyj(1)
    }

    async function downloadjws (){
            let payloadtosign = await toBase64(pdf)
            payloadtosign = (payloadtosign.split(',')[1]).slice(0,-150)
            console.log(payloadtosign)
            let jws = await sign({ payload: payloadtosign, privateJwk });
            setRealjws(jws)
            //console.log(jws[0],jws[100],jws[200],jws[400])

            const fileData = JSON.stringify(jws);
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "jws";
            link.href = url;
            link.click();

    }


    async function verifyContract (){
   
        setVerified(1)
        let payloadtosign = await toBase64(pdf)
        payloadtosign = (payloadtosign.split(',')[1]).slice(0,-150)
        //console.log(payloadtosign)
          const testjws = await sign({ payload: payloadtosign, privateJwk});
          const isDoclegit = (testjws===uploadjws)?true:false; 
         // console.log(testjws,typeof(testjws))
          //console.log(uploadjws,typeof(uploadjws))
          //console.log(realjws,typeof(realjws))
          //console.log("correct DOCUMENT: ",isDoclegit )
          let jws = uploadjws
          const isSignLegit = await verify({ jws, publicJwk }); // true/false
          //console.log("Correct JWS", isSignLegit)
          setValid(isSignLegit && isDoclegit)


      }

  

    const Upload = ()=>{
        return (<>
                <input
          accept="*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handlefilechange}
        />
        <label htmlFor="raised-button-file">
        <Typography> 1. Upload document </Typography>

          <Button variant="raised" component="span" >
            Upload   
          </Button>
          {ready?<span>File name : {pdf.name}</span>:<span>not uploaded</span>} 

        </label> 
        <input
          accept="*"
          style={{ display: 'none' }}
          id="jws"
          multiple
          type="file"
          onChange={handlejwschange}
        />
        <label htmlFor="jws">
        <Typography> 2. Upload digital signature </Typography>

          <Button variant="raised" component="span" >
            Upload 
          </Button>
          {readyj?<span>File name : {jwsfile.name}</span>:<span>not uploaded</span>} 

        </label> 


        </>)

    }


    return (<>
      <Typography variant="h3"> verify contract </Typography>

        <Upload/> <br/>
        <Button onClick={verifyContract}>check</Button> <br/>
        <div> {valid?<CheckIcon style={{ color: 'green' }}/>:<DangerousIcon style={{ color: 'red' }}/>}</div>
        </>)
}

export default Verify;

//<Button onClick={downloadjws}> downloda</Button>
//<Button onClick={async ()=>{console.log(pdfbuffer);console.log(await sha256(pdfbuffer))}}>ddd</Button>
//        
