import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import ScheduleIcon from '@mui/icons-material/Schedule';



const Lease = ({  }) => {


  return (
    <>
<Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Lease Agreement
        </Typography>
        <Typography variant="h5" component="div">
        Smart Contract Address : 0xcb51e09ba325d43123d2fed346150afbfcf64dbf
        </Typography>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          INFO
        </Typography>
        <Typography variant="body2">
          Landlord  = did:ion:EiBAhyd-INTO4D9oa_IE040HqgS66-7nb3oxDZyLAjwSJw <br/>
          Tenant  = did:ion:JxsesFosP8PQIpI4PftKVt5fZaC_gbcNg8xM6nDAQf4I4FA <br/>
          Signed Date = 12 June 2023
          
        </Typography>
        <br/>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          STATE
        </Typography>
        <Typography variant="body2">
          status = ongoing   <ScheduleIcon style={{ color: "green" }}/>
          <br />
          deposit = 1 eth
          <br />
          landlord payment address = 0xB1d1aE061e066AEd70E2cC794938a619fE7FBFAd
          <br />
          payment = 111100000000 (4/12)
          <br />
 

          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">PAY RENT </Button>
      </CardActions>
    </Card>
    </>
  );
};

export default Lease;
