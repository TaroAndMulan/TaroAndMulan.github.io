
import { Button } from "@mui/material";
import { useState } from "react";
import { generateKeyPair, sign, verify } from '@decentralized-identity/ion-tools';
//import { readFile, writeFile } from 'fs/promises';
import * as ionprivate from '../private/ionkey.json';
import * as ionpublic from '../private/ionkey2.json';


import { Upload } from "@mui/icons-material";
//const fs = require('fs');


function Verify() {


    const [pdf,setPdf] = useState()
    const [proof,setProof] = useState()
    const [ready,setReady] = useState(0)
    const [uploadjws,setUploadjws] = useState()
    const [pdfdata,setPdfdata] = useState()
    const [realjws,setRealjws] = useState();

    function handlefilechange(e){
      const pdfcontent = new FileReader();
      pdfcontent.onloadend = ()=>{setPdfdata(pdfcontent.result)}
      pdfcontent.readAsBinaryString(e.target.files[0])
      setPdf(e.target.files[0]);
      setReady(1)
        
    }
    const publicJwk = {"kty":"EC","crv":"secp256k1",
    "x":"Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
    "y":"NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4"}

    const privateJwk = {"kty":"EC","crv":"secp256k1"
    ,"x":"Wf8DkYrAONM6EXrwPSW6XuVQhKZE7hIYMc29nQAP5YY",
    "y":"NimerdnbjT5vImV1QXcj72Ut0XOJAFtm0ANrvvUIKH4"
    ,"d":"EejP6XsGFZzIOGSgbbIUK1WloScvYL5Kxlbj5PvpzeI"}


    function handlejwschange(e){
        const jwsupload = new FileReader();
        jwsupload.onloadend = ()=>{setUploadjws(jwsupload.result.slice(1,-1))}
        jwsupload.readAsText(e.target.files[0])
    }

    async function downloadjws (){

            let jws = await sign({ payload: pdfdata, privateJwk });
            setRealjws(jws)
            console.log(jws)

            const fileData = JSON.stringify(jws);
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "jws";
            link.href = url;
            link.click();

    }


    async function verifyContract (){

        const testjws = await sign({ payload: pdfdata, privateJwk});
        const isDoclegit = (testjws===uploadjws)?true:false; 
       // console.log(testjws,typeof(testjws))
        //console.log(uploadjws,typeof(uploadjws))
        //console.log(realjws,typeof(realjws))
        console.log("valid document",isDoclegit )
        let jws = uploadjws
        console.log(publicJwk)
        const isSignLegit = await verify({ jws, publicJwk }); // true/false
        console.log("signed by web app legit", isSignLegit)
          //console.log(j)
    
  
  }

    const Upload = ()=>{
        return (<>
        
        <input
          accept="*"
          style={{ display: 'none' }}
          id="jws"
          multiple
          type="file"
          onChange={handlejwschange}
        />
        <label htmlFor="jws">
          <Button variant="raised" component="span" >
            Upload jws
          </Button>
        </label> 


        </>)

    }


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
          <Button variant="raised" component="span" >
            Upload
          </Button>
        </label> 

        {ready?<div>{pdf.name}{pdf.type}{pdf.size}</div>:<div>not uploaded</div>} 
        <Button onClick={downloadjws}> downloda</Button>
        <Upload></Upload>
        <Button onClick={verifyContract}>verify upload contract</Button>
        </>)
}

export default Verify;