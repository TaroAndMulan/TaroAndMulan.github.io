'use client'

import { Button } from "@mui/material";
import { useState } from "react";
import { generateKeyPair, sign, verify } from '@decentralized-identity/ion-tools';

import { async } from "openlaw-elements";
import { Upload } from "@mui/icons-material";


const test2 = () => {
    console.log("wtf3")
}

function Verify() {

    const [pdf,setPdf] = useState()
    const [proof,setProof] = useState()
    const [ready,setReady] = useState(0)
    const [j,setJ] = useState()
    const [pk,setPk] = useState();
    const [sk,setSK] = useState();
    const [realjws,setRealjws] = useState();
    function handlefilechange(e){
        setPdf(e.target.files[0]);
        setReady(1)
    }

    function handlejwschange(e){
        const jwsupload = new FileReader();
        jwsupload.onloadend = ()=>{setJ(jwsupload.result.slice(1,-1))}
        jwsupload.readAsText(e.target.files[0])
        //setReady(1)
    }
    function handlepkchange(e){

      const pkupload = new FileReader();
      jwsupload.onloadend = ()=>{console.log(jwsupload.result)}
      jwsupload.readAsText(e.target.files[0])
      setJ(jwsupload.result);      
        setPk(e.target.files[0]);
        //setReady(1)
    }
    async function downloadjws (){
            const { privateJwk, publicJwk } = await generateKeyPair();
            console.log(privateJwk)
            console.log(publicJwk)
            setPk(publicJwk)
            setSK(privateJwk)
            const jws = await sign({ payload: pdf, privateJwk });
            setRealjws(jws)

            const fileData = JSON.stringify(jws);
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "jws";
            link.href = url;
            link.click();

            const fileData2 = JSON.stringify(publicJwk);
            const blob2 = new Blob([fileData2], { type: "text/plain" });
            const url2 = URL.createObjectURL(blob2);
            const link2 = document.createElement("a");
            link2.download = "pbk";
            link2.href = url2;
            link2.click();

    }

    async function verifyContract (){
      


        let privateJwk = sk

        const jws5 = await sign({ payload: pdf, privateJwk});
        console.log(jws5)
        let publicJwk = pk
        let jws = j
          const isLegit = await verify({ jws, publicJwk }); // true/false
          console.log(isLegit)
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


        <input
          accept="*"
          style={{ display: 'none' }}
          id="pk"
          multiple
          type="file"
          onChange={handlepkchange}
        />
        <label htmlFor="pk">
          <Button variant="raised" component="span" >
            Upload pk
          </Button>
        </label> 

        </>)

    }

    const testV = ()=>{
  
// Use fs.readFile() method to read the file
console.log(typeof(j),typeof(pk))
console.log(j)
const f = new FileReader()
console.log(f.readAsText(j))      
    // Displtay the file content
  //  console.log(data);

  
console.log('readFile called');

        async function test3 (){
            console.log(typeof(j),pk)
            const jj = new FileReader();
            
            const isLegit2 = await verify({ j, pk }); // true/false
            console.log(isLegit2)
        }
      //  test3();

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
        <Button onClick={downloadjws}> check verify</Button>
        <Upload></Upload>
        <Button onClick={verifyContract}>testV</Button>
        </>)
}



export default Verify;
