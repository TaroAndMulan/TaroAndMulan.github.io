'use client'
import { Typography } from '@mui/material';
import Verify from '../../components/verify'
import Link from 'next/link';
import DrawIcon from "@mui/icons-material/Draw";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Vpage(){
  return (<>
         <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >
        <span style={{ float: "right" }}>
          <Link href="/lease" underline="none">
                   <HomeWorkIcon />

          </Link>
        </span>
        <span style={{ float: "right" }}>
          <Link href="/verify" underline="none">
            <CheckCircleIcon />
          </Link>
        </span>

        <span style={{ float: "right" }}>
          <Link href="/draft" underline="none">
          <DrawIcon></DrawIcon> 
          </Link>{" "}
        </span>
        <br />
      </nav>
      <hr/>

  <Verify></Verify>
  
  
  </>)
}

export default Vpage;
