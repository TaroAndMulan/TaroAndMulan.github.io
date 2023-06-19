'use client'
import { Typography } from '@mui/material';
import Verify from '../../components/verify'
import Link from 'next/link';
function Vpage(){
  return (<>
      <nav
        style={{
          borderBottom: "solid 2px",
          paddingBottom: "1rem",
        }}
      >

<span style={{ float: "right" }}> <Link href="/draft" underline="none">SIGN</Link></span>

      
      </nav>
      <hr/>

  <Verify></Verify>
  
  
  </>)
}

export default Vpage;
