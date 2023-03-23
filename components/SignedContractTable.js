import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { address } from "../utility/smartcontract";
import { BigNumber } from "ethers";
function DenseTable({ contracts,user }) {
  function createData(id,creator,signer, create_at, signed_at, hash, detail, isSigned) {
    return { id, creator, signer, create_at, signed_at, hash, detail, isSigned };
  }

  const rows = [];

  for (let i = 0; i < contracts.length; i++) {
    rows.push(
      createData(
        contracts[i][0],
        contracts[i][1],
        contracts[i][2],
        contracts[i][3],
        contracts[i][4],
        contracts[i][5],
        contracts[i][6],
        contracts[i][7],
      )
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Contract ID</TableCell>
            <TableCell align="center">detail</TableCell>
            <TableCell align="center">Contract Creator</TableCell>
            <TableCell align="center">Signed By</TableCell>

            <TableCell align="center">hash</TableCell>
            <TableCell align="center">signed Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {(row.id).toNumber()}
              </TableCell>
              <TableCell align="center">{row.detail}</TableCell>
               <TableCell align="center">{row.creator}</TableCell>
              <TableCell align="center">{row.signer}</TableCell>
              <TableCell align="center">{row.hash}</TableCell>
              <TableCell align="center">{row.signed_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const SignedContractTable = ({ contracts,user }) => {
  if (contracts !== undefined) {
    if (contracts.length !== 0)
      return (
        <>

          <DenseTable contracts={contracts} user={user}/>
        </>
      );
  } else return <>No Complete contracted</>;
};
