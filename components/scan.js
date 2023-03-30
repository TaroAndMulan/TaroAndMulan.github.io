import { useRef, useState } from "react";
import QRCode from "react-qr-code";

const Scan = ({name,lift}) => {

    var respPresentationReq = null;
    const [qrvalue, setQrvalue]  = useState("www.google.com");
    const [msg, setMsg] = useState("msg_init");
    const [payload, setPayload] = useState("payload_init");
    let respMsg="start"

 const signin = () => {


    fetch('/api/verifier/presentation-request')
                    .then(function(response) {
                        response.text()
                        .catch(error => console.log("error"))
                        .then(function(message) {
                            respPresentationReq = JSON.parse(message);
                                console.log(`Not Android or IOS. Generating QR code encoded with ${message}`);
                                setQrvalue(respPresentationReq.url);
                                console.log(respPresentationReq.url)
                           
                        }).catch(error => { console.log(error.message); })
                    }).catch(error => { console.log(error.message); })


         var checkStatus = setInterval(function () {
                        if(respPresentationReq){
                            fetch('api/verifier/presentation-response?id=' + respPresentationReq.id )
                            .then(response => response.text())
                            .catch(error => console.log("error"))
                            .then(response => {
                                if (response.length > 0) {
                                    console.log(response)
                                    respMsg = JSON.parse(response);
                                    // QR Code scanned
                                    if (respMsg.status == 'request_retrieved') {
              
                                        setMsg(respMsg.message);
                                    }
                                    
                                    if (respMsg.status == 'presentation_verified') {
                                        setMsg(respMsg.message);
                                        setPayload( "Payload: " + JSON.stringify(respMsg.payload))
                                        lift(respMsg.firstName +" " + respMsg.lastName +" is a Verifiable Credential Expert") 
                                        console.log("lifting up:", name)
                                        clearInterval(checkStatus);
                                    }
                                    if (respMsg.status == 'issuance_failed') {
                                        document.getElementById('qrcode').style.display = "none";
                                        setMsg("Verification error occurred.");
                                        setPayload("Payload: " + respMsg.payload)
                                        clearInterval(checkStatus);
                                    }
                                }
                            })
                        }
                       
                    }, 5000); //change this to higher interval if you use ngrok to prevent overloading the free tier servicerespMsg.message;
            
                  
 }


 return (
    <>
    <div onClick={signin}> Click</div>
    <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
    <QRCode
    size={512}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={qrvalue}
    viewBox={`0 0 256 256`}
    />
</div>
    <div id="qrText">Scan QR Code</div>
    <div id="message" >"message: " {msg} </div>
    <div id="payload"> "payload: "{payload}</div>
    <div id="subject">"subject: "{name}</div>
 </>)
}
export default Scan