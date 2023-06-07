'use client'
import { Button } from "@mui/material";
import { useState } from "react";
import { generateKeyPair, sign, verify } from '@decentralized-identity/ion-tools';

async function test (){
    const { privateJwk } = await generateKeyPair();
    const jws = await sign({ payload: 'hello world', privateJwk });
    const isLegit = await verify({ jws, publicJwk }); // true/false
    console.log(isLegit)
}

function Verify() {

    const [pdf,setPdf] = useState()
    const [proof,setProof] = useState()
    const [ready,setReady] = useState(0)
    function handlefilechange(e){
        setPdf(e.target.files[0]);
        setReady(1)
    }
    return (<>
        <input
          accept="image/*"
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
        <Button onChange={test}> check verify</Button>
        </>)
}



export default Verify;
