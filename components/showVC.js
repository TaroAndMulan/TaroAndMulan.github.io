import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
const ShowVc = ({issuer,name,ID}) => {
    return (
        <>
        <Card sx={{ minWidth: 275 , border: 1 }}>
        <Typography variant="h5" gutterBottom>
        Verifiable credential
      </Typography>
        <div>{issuer}</div>
        <div>{name}</div>
        <div>{ID}</div>
        </Card>
        </>
    )
}

export default ShowVc;