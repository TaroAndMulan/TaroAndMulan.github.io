export default function handler(req, res) {
    console.log(req.method)
    //console.log(req.body)
    if(req.method=="GET")
    res.status(200).json({ name: 'John Doe' })
    /*
    else if (req.method=="POST")
    {
        res.status(200).json({ name: 'John NANA' })
        console.log("WTF")
    }*/
  }