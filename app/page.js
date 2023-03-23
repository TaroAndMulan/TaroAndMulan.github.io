"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Material from "./materialUI/page";
import { useEffect } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
let socket;

const inter = Inter({ subsets: ["latin"] });
const initSocket = async () => {
  await fetch("api/socket");
  socket = io();
  socket.on("heyuser", (msg) => {
    console.log(msg+"wttfff");
  });
  socket.on("hellofromserver", (msg) => {console.log(msg)})
  console.log("wtf");
};

const SendDog = async (event) => {
  socket.emit("dog");
  console.log("WTF2222");
  event.preventDefault();
};
export default function Home() {
  useEffect(() => {
    initSocket();
  }, []);

  return (
    <main>
  
      <div>
        <Link href="/materialUI"> Click here to move page</Link>
      </div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <div onClick={SendDog}> asdsd</div>
      </form>
    </main>
  );
}
