import classes from "./header.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);
export default function Header(){
    const main__container = useRef();
useGSAP(()=>{
    gsap.fromTo(`.${classes["main__title"]}`,
        {
            width:"0vh",
            height:"0vh",
        },
        {
            display:"flex",
            width:"20vh",
            height:"20vh",
            duration:1,
            ease:"back.out"
        }
    ),
    gsap.to(`.${classes["main__title"]}`,{
        delay:0.8,
        duration:1,
        width:0,
        height:0,
        ease:"back.in"
    }),
    gsap.to(`.${classes["main__title"]}`,{
        width:"clamp(400px,70vw,50vw)",
        height:"clamp(400px,70vw,50vw)",
        delay:1.8,
        duration:.5,
        ease:"circ",
    })
    gsap.fromTo(`.${classes["text__content"]}`,
        {   
            y:100
        },
        {
            delay:2,
            duration:1,
            stagger:.1,
            y:0,
        }
    )
    const beforeRule=CSSRulePlugin.getRule(`.${classes["dummy__text__content"]}::before`);
    gsap.to(beforeRule, {
        delay:3,
        duration: 1,
        height:"100%",
        ease:"circ"
    }),
    gsap.to(`.${classes["dummy__text"]}`,{
        delay:3.8,
        color:"white"
    }),
    gsap.to(beforeRule,
        {
            delay:4,
            paddingRight:"0%",
            ease:"circ"
        }
    )
    },{scope:main__container})
    return(
        <article className={classes["main__container"]} ref={main__container} >
            <div className={classes["tokyo__main__img"]}>
                <h1 className={classes["main__title"]}>
                    <span className={classes["text__container"]}><p className={classes["text__content"]}>Tokyo At Night </p><p className={classes["text__content"]}>With AI</p></span>
                </h1>
            </div>
            <div className={classes["dummy__text"]}>
                <div className={classes["dummy__text__content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus minus repellat quisquam eaque rem voluptatum suscipit nisi provident molestias ut, nesciunt eum cupiditate magnam quis a! Voluptatem deleniti modi quae.</div>
                <div className={classes["dummy__text__content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit eos, ea mollitia voluptas temporibus fugiat iure soluta excepturi maxime saepe animi illo vel labore? At sapiente in dolores laborum!</div>
                <div className={classes["dummy__text__content"]}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus nobis aspernatur deleniti alias dolores odio, corporis sed? Quos, ad? Alias, porro rerum. Eius alias blanditiis temporibus nam excepturi! Ad, quam!</div>
                <div className={classes["dummy__text__content"]}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae facere, aut error eaque molestiae tempore, exercitationem provident perspiciatis enim labore, impedit numquam iste beatae minima maiores perferendis voluptatum a laboriosam?</div>
                <div className={classes["dummy__text__content"]}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum blanditiis facere culpa quia fugiat dicta hic doloremque quasi minus distinctio. Fuga at, consequatur exercitationem placeat sit maxime consequuntur quas repellendus.</div>
            </div>
        </article>
    )
}