import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
const ShowVc = ({VC}) => {
    return (
        <>
        <Card sx={{ minWidth: 275 , border: 1 }}>
        <Typography variant="h5" gutterBottom>
        Verifiable credential
      </Typography>
        <div>{VC.issuer}</div>
        <div>{VC.name}</div>
        <div>{VC.dob}</div>
        <div>{VC.ID}</div>
        </Card>
        </>
    )
}

export default ShowVc;