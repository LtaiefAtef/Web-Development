"use client";
import classes from "./page.module.css"
import Header from "@/components/header";
export default function Home(){
  return(
    <main className={classes["home"]}> 
        <Header/> 
        <article className={classes["tokyo__container"]}>
          <h1 className={classes["tokyo__work"]}>Work 01</h1>
          <div className={classes["tokyo__night"]} data_image="tokyo_night1"></div>
        </article>
        <article className={classes["tokyo__container"]}>
          <h1 className={classes["tokyo__work"]}>Work 02</h1>
          <div className={classes["tokyo__night"]} data_image="tokyo_night2"></div>
        </article>
        <article className={classes["tokyo__container"]}>
          <h1 className={classes["tokyo__work"]}>Work 03</h1>
          <div className={classes["tokyo__night"]} data_image="tokyo_night3"></div>
        </article>
        <article className={classes["tokyo__container"]}>
          <h1 className={classes["tokyo__work"]}>Work 04</h1>
          <div className={classes["tokyo__night"]} data_image="tokyo_night4"></div>
        </article>
        <article className={classes["tokyo__container"]}>
          <h1 className={classes["tokyo__work"]}>Work 05</h1>
          <div className={classes["tokyo__night"]} data_image="tokyo_night5"></div>
        </article>z 
    </main>
  )
}