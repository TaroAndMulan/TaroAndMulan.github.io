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

const Preview = ({ template, VC, VCN }) => {
  const formtitle = extractTextInParenthesis(template);
  const tempformdata = formtitle.map((title) => {
    return " ";
  });

  const [formdata, setFormdata] = useState(tempformdata);
  const [preview, setPreview] = useState(template);
  function fillcontract() {
    let outputString = template;
    const regex = "/[(.*?)]/g";

    for (let i = 0; i < formtitle.length; i++) {
      let filled = (formdata[i].length>1)?formdata[i]:"______"
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
    console.log(outputString)
    outputString = outputString+`<br/> <span> signed by VCsignThesis </span> <br/> <span> did:ion:EiAmFosP8PQIpI4PftKVt5fZaC_gbcNg8xM6nDAQf4I4FA </span>`
    setPreview(outputString);
  }

  function printDocument() {
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
      watermark: { text: 'SIGNED --- did:ion:EiAmFosP8PQIpI4PftKVt5fZaC_gbcNg8xM6nDAQf4I4FA', color: 'blue', opacity: 0.3, bold: true, italics: false },

    };
    pdfMake.createPdf(documentDefinition).open();
  }

  useEffect(() => {
    fillcontract();
  }, [formdata, template]);

  return (
    <>
      <hr />
      <Grid container spacing={2}>
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
                  <Button variant="contained"  endIcon={<EditNoteIcon/>} onClick={printDocument}>SIGN</Button>

        </Grid>

        <Grid item xs={9}>
          <div dangerouslySetInnerHTML={{ __html: preview }} id="wtf" />
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
