import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useLayoutEffect, useState } from "react";
import { convertTemplateToHTML } from "../utility/toHTML";
import {extractTextInParenthesis} from "../utility/parseform";
import { Box, Card, TextField } from "@mui/material";
import { Grid,Button} from "@mui/material";
import { output } from "@/next.config";




const Preview = ({ template}) => {

  const formtitle= extractTextInParenthesis(template);
  const tempformdata = formtitle.map((title)=> {return ' '})

  const [formdata, setFormdata] = useState(tempformdata);
  const [preview,setPreview] = useState(template);

  function fillcontract(){
    let outputString = template;
    const regex = '/\[(.*?)\]/g';

    for(let i=0;i<formtitle.length;i++){
    outputString=outputString.replace(/\[(.*?)\]/,"<span style=\"color:red\">"+"<b>"+formdata[i]+"</b>"+"</span>",1)
    }
    outputString = outputString.replace(/\n/g,"<br/>");
    const regex2 = '/\*\*(.*)\*\*/g';
    console.log(outputString)
    outputString=outputString.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")
    console.log("after"+outputString)
    setPreview(outputString);
  
  }
  useEffect(() => {fillcontract()},[formdata]);


  return (
    <>
    <Grid container spacing={2}>
  <Grid item xs={2}>
    {formtitle.map((title,index)=> {
            return  (<> <TextField fullWidth  margin="normal" key={index}
              id="outlined-controlled"
              label={title}
              value={formdata[index]}
              onChange={(event) => {
                const tempformdata = formdata.map((data,ii)=>
                {
                  console.log(data);
                  if(ii===index) 
                  return event.target.value; 
                  else 
                  return data;
                })
                setFormdata(tempformdata);
              }}
              /> 
                </>)
      })}
  </Grid>

  <Grid item xs={10}>
  <div
      dangerouslySetInnerHTML={{__html: preview}}
    />
  </Grid>
</Grid>

<div
      dangerouslySetInnerHTML={{__html: preview}}
    />
      
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