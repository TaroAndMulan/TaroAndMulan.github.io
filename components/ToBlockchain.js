import { Box, Paper } from "@mui/material";
const ToBlockchain = ({ SignedBy }) => {
  //console.log("signedBy", SignedBy);
  return (
    <>
      <hr />
      Signed by ETH ACCOUNT: {SignedBy}
      <br /> Contract hash: _____
      <br />
      Signed Date_____ <br /> Contract Detail :_______
      <br /> Contract address: _______
      <hr />
    </>
  );
};

export default ToBlockchain;
