'use client'
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
       <Link href="/draft">sign</Link>
        <Link href="/verify">verify</Link>
      </nav>

  <Verify></Verify>
  
  
  </>)
}

export default Vpage;
