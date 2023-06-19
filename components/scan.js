import { Box, Button, Typography,Card } from "@mui/material";
import { useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import QRCode from "react-qr-code";
const ShowVC = ({ VC }) => {
  console.log("showVC", VC, "type", typeof VC);
  const claims = JSON.parse(VC).claims;
  const key = Object.keys(claims);
  const value = Object.values(claims);

  return (<>
  <Box>
  <Card>Issued by: LAKNAINAM for IAMBEST2023</Card>
  {
  key.map((data, index) => {
    return (
      <Card> 
        {data}:{claims[data]}
      </Card>
    )
  })
  }
  </Box>
  <Typography color="success.main"><CheckIcon style={{ color: "green" }} />valid verifiable credentials</Typography>

  
  
  </>)

};

const Scan = ({ name, payloadLift }) => {
  var respPresentationReq = null;
  const [qrvalue, setQrvalue] = useState("www.google.com");
  const [msg, setMsg] = useState("msg_init");
  const [payload, setPayload] = useState("payload_init");
  const [isScan, setIsScan] = useState(0);
  let respMsg = "start";

  const signin = () => {
    fetch("/api/verifier/presentation-request")
      .then(function (response) {
        response
          .text()
          .catch((error) => console.log("error"))
          .then(function (message) {
            respPresentationReq = JSON.parse(message);
            console.log(
              `Not Android or IOS. Generating QR code encoded with ${message}`
            );
            setQrvalue(respPresentationReq.url);
            console.log(respPresentationReq.url);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });

    var checkStatus = setInterval(function () {
      if (respPresentationReq) {
        fetch("api/verifier/presentation-response?id=" + respPresentationReq.id)
          .then((response) => response.text())
          .catch((error) => console.log("error"))
          .then((response) => {
            if (response.length > 0) {
              console.log(response);
              respMsg = JSON.parse(response);
              // QR Code scanned
              if (respMsg.status == "request_retrieved") {
                setMsg(respMsg.message);
              }

              if (respMsg.status == "presentation_verified") {
                setMsg(respMsg.message);
                const pl = JSON.stringify(respMsg.payload).slice(1, -1);
                setPayload(pl);
                payloadLift(pl);
                //setPayload(respMsg.payload)
                //lift(respMsg.firstName +" " + respMsg.lastName)
                //lift(respMsg);

                console.log("scan pl", pl, "typeof", typeof pl);
                setIsScan(1);
                clearInterval(checkStatus);
              }
              if (respMsg.status == "issuance_failed") {
                document.getElementById("qrcode").style.display = "none";
                setMsg("Verification error occurred.");
                setPayload(respMsg.payload);
                clearInterval(checkStatus);
              }
            }
          });
      }
    }, 5000); //change this to higher interval if you use ngrok to prevent overloading the free tier servicerespMsg.message;
  };

  return (
    <>
      {isScan ? (
        <ShowVC VC={payload} />
      ) : (
        <div>
          <Box sx={{ justifyContent:"center", alignItems:"center",border:1}}>
            <Button onClick={signin}>
              <Typography variant="h6">SCAN VC</Typography>
            </Button>
            <br/>
            <QRCode size={128} value={qrvalue} />
          </Box>
        </div>
      )}
    </>
  );
};
export default Scan;
