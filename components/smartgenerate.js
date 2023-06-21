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

function Tempform() {

    return (
        <>
        <FormControl >
  <InputLabel id="demo-simple-select-label">type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={10}
    label="condition"
    onChange={()=>{}}
  >
    <MenuItem value={10}>Termination</MenuItem>
    <MenuItem value={20}>Payment</MenuItem>
  </Select>
</FormControl>
        </>
    )
}

function Conditionform({t}){
    return (<TextField id="outlined-basic" label={t} variant="outlined" />
    )
}





const Smartgenerate = ({  }) => {


  return (
    <>
<Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Customized smart contract condition
        </Typography>
        <Typography variant="h5" component="div">
        <IconButton size="large"> <AddIcon  style={{ color: "green" }}/></IconButton> <Tempform/>  <Conditionform t={"condition"}/> <Conditionform t={"value"}/>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          current condition
        </Typography>
        <Typography variant="body2">
          Payment :  200 ether per months 
          <br />
          Deposit fee : 500 return after fullfill
          <br />
          Landlord payment address : 0xB1d1aE061e066AEd70E2cC794938a619fE7FBFAd
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">SUBMIT </Button>
      </CardActions>
    </Card>
    </>
  );
};

export default Smartgenerate;
