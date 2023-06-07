import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useLayoutEffect, useState } from "react";
import { convertTemplateToHTML } from "../utility/toHTML";
import {extractTextInParenthesis} from "../utility/parseform";
import { Box, Card, TextField } from "@mui/material";
import { Grid,Button,Select} from "@mui/material";
import { output ,FormControl,InputLabel} from "@/next.config";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import customVfs from '../utility/vfs_fonts'




const Preview = ({ template,VC,VCN}) => {

  const formtitle= extractTextInParenthesis(template);
  const tempformdata = formtitle.map((title)=> {return ' '})

  const [formdata, setFormdata] = useState(tempformdata);
  const [preview,setPreview] = useState(template);
  function fillcontract(){
    let outputString = template;
    const regex = '/\[(.*?)\]/g';


    for(let i=0;i<formtitle.length;i++){
  
      if(formtitle[i].charAt(formtitle[i].length-1)=="C"){
        console.log("found")
        outputString=outputString.replace(/\[(.*?)\]/,"<span style=\"color:green\">"+formdata[i]+"</span>",1)
      }
      else
      outputString=outputString.replace(/\[(.*?)\]/,"<span style=\"color:red\">"+formdata[i]+"</span>",1)
    }
  

    outputString = outputString.replace(/\n/g,"<br/>");
    const regex2 = '/\*\*(.*)\*\*/g';
    outputString=outputString.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")
    setPreview(outputString);
  
  }

  function printDocument() {
    pdfMake.vfs = customVfs.pdfMake.vfs; 
    pdfMake.fonts={
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf'
      }
    }

    var html = htmlToPdfmake(`<pre>${preview}</pre>`);
    const documentDefinition = { content: html,defaultStyle:{font:"THSarabunNew"} };
    pdfMake.createPdf(documentDefinition).open();
  
  }


  useEffect(() => {fillcontract()},[formdata,template]);




  return (
    <>
    <div  onClick={printDocument}>sdasadsad</div>
    <Button onClick={()=>{console.log("lcick")}}>testset</Button>
    <Grid container spacing={2}>
  <Grid item xs={2}>
    {formtitle.map((title,index)=> {

              if(title.slice(-2)!="VC")
              return (<> <TextField fullWidth  margin="normal" key={index}
              id="outlined-controlled"
              label={title}
              value={formdata[index]}
              onChange={(event) => {
                const tempformdata = formdata.map((data,ii)=>
                {
                  if(ii===index) 
                  return event.target.value; 
                  else 
                  return data;
                })
                setFormdata(tempformdata);
              }}
              /> 
                </>)
            else {
              return ( <> 
              
              <TextField
          id="outlined-select-currency"
          select
          onChange={(event) => {
            const tempformdata = formdata.map((data,ii)=>
            {
              if(ii===index) 
              return event.target.value; 
              else 
              return data;
            })
            setFormdata(tempformdata);
          }}
          label="Select"
          defaultValue={formdata[index]}
          helperText="Please select your currency"
        >
       {VC.map((option,index) => (
            <MenuItem key={index} value={option}>
              {VCN[index]}:{option}
            </MenuItem>
          ))}
        </TextField>

</>
  )
            }
             
      })}
  </Grid>

  <Grid item xs={10}>
  <div
      dangerouslySetInnerHTML={{__html: preview}}
      id="wtf"
    />

  </Grid>
</Grid>

      
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