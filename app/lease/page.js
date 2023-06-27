'use client'
import Homepage from "@/components/homepage";
import Smartgenerate from "@/components/smartgenerate";
import Lease from "@/components/leaseStatus";
import DrawIcon from "@mui/icons-material/Draw";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
function Test(){
  return (
    <>
    <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >
        <span style={{ float: "right" }}>
          <Link href="/draft" underline="none">
            <HomeWorkIcon />
          </Link>{" "}
        </span>
        <span style={{ float: "right" }}>
          <Link href="/verify" underline="none">
            <CheckCircleIcon />
          </Link>
        </span>
        <span style={{ float: "right" }}>
          <Link href="/lease" underline="none">
            <DrawIcon></DrawIcon>
          </Link>
        </span>
        <br />
      </nav>
      <Lease></Lease>

    </>
  )
}

export default Test;
