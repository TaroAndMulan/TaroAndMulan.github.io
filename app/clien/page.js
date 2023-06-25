'use client'

import { useState } from "react";

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json())


async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


async function getUser(){
    const res = await fetch("http://localhost:8080/api/cat")
    return res.json()
}

async function getPost(){
    const data = {dog:"1",cat:"2"}
    const res = await fetch("http://localhost:8080/api/savefile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json()
}



export default async function Clien(){
    const res= await getPost()

    return (
        <>{res.in.dog} <br/> {res.out}</>

    )
}