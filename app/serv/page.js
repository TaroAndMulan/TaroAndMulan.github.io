async function getUser(){
    const res = await fetch("http://localhost:8080/api/user",{ cache: 'no-store' })
    return res.json()
}

export default async function Serv(){
    const dog2 = await getUser();
    console.log(dog2)
    const dog = "cat"
    console.log(dog)
    return (
        <>{dog}</>

    )
}