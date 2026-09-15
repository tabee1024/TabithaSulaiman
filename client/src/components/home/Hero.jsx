import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import {
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

import portfolioHeadshot from "../../assets/images/portfolioheadshot.png";


const INTRO_LINES = [
    "hi im",
    "tabitha.",
];


function AnimatedHeroTitle() {
    const [introText, setIntroText] = useState("");
    const [mode, setMode] = useState("intro");
    const [finalStep, setFinalStep] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const sleep = (ms) =>
            new Promise((resolve) => window.setTimeout(resolve, ms));

        async function runAnimation() {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) {
                setMode("final");
                setFinalStep(5);
                return;
            }

            const intro = "hi im\ntabitha.";

            while (!cancelled) {
                /* Reset */
                setIntroText("");
                setFinalStep(0);
                setMode("intro");

                /* Type intro */
                for (let i = 1; i <= intro.length; i += 1) {
                    if (cancelled) return;

                    setIntroText(intro.slice(0, i));
                    await sleep(95);
                }

                /* Hold intro */
                await sleep(900);

                if (cancelled) return;

                /* Fade intro */
                setMode("intro-exit");
                await sleep(450);

                /* I... */
                setMode("final");
                setFinalStep(1);
                await sleep(500);

                /* DESIGN */
                setFinalStep(2);
                await sleep(700);

                /* SYSTEMS */
                setFinalStep(3);
                await sleep(1150);

                /* BUILD */
                setFinalStep(4);
                await sleep(750);

                /* IMPACT */
                setFinalStep(5);

                /* Hold completed statement */
                await sleep(2600);

                /* Fade final statement */
                setMode("final-exit");
                await sleep(550);
            }
        }

        runAnimation();

        return () => {
            cancelled = true;
        };
    }, []);

    const [introLineOne = "", introLineTwo = ""] =
        introText.split("\n");

    const showingIntro =
        mode === "intro" ||
        mode === "intro-exit";

    return (
        <div className="hero-title-stage">
            {showingIntro ? (
                <div
                    className={`hero-intro-wrap ${mode === "intro-exit"
                        ? "is-exiting"
                        : ""
                        }`}
                >
                    <div className="hero-intro-line hero-intro-line-small">
                        {introLineOne}
                    </div>

                    <div className="hero-intro-line hero-intro-line-large">
                        {introLineTwo}

                        {mode === "intro" && introLineTwo && (
                            <span className="hero-typewriter-cursor">
                                |
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <h1
                    className={`hero-final-title ${mode === "final-exit"
                        ? "is-exiting"
                        : ""
                        }`}
                >
                    <span
                        className={`hero-final-line hero-final-line-i ${finalStep >= 1 ? "is-visible" : ""
                            }`}
                    >
                        I...
                    </span>

                    <span className="hero-final-combo-line">
                        <span
                            className={`hero-final-word hero-final-word-block ${finalStep >= 2 ? "is-visible" : ""
                                }`}
                        >
                            DESIGN
                        </span>

                        <span
                            className={`hero-final-word hero-final-word-script ${finalStep >= 3 ? "is-visible" : ""
                                }`}
                        >
                            Systems
                        </span>
                    </span>

                    <span className="hero-final-combo-line">
                        <span
                            className={`hero-final-word hero-final-word-block ${finalStep >= 4 ? "is-visible" : ""
                                }`}
                        >
                            BUILD
                        </span>

                        <span
                            className={`hero-final-word hero-final-word-script ${finalStep >= 5 ? "is-visible" : ""
                                }`}
                        >
                            Impact
                        </span>
                    </span>
                </h1>
            )}
        </div>
    );
}


function Hero() {
    return (
        <section className="mockup-hero">

            <div className="mockup-hero-copy">

                <p className="mockup-pill">
                    Product · Design · Engineering
                </p>


                <AnimatedHeroTitle />


                <p className="mockup-hero-description">
                    Computer Science graduate connecting
                    product strategy, UX design, and software
                    engineering to build useful, usable, and
                    scalable digital experiences.
                </p>


                <div className="hero-actions">

                    <Link
                        className="button button-primary"
                        to="/projects"
                    >
                        View My Work
                        <span aria-hidden="true">
                            →
                        </span>
                    </Link>


                    <Link
                        className="button button-secondary"
                        to="/projects"
                    >
                        Explore by Role
                    </Link>

                </div>


                <div
                    className="hero-social-links"
                    aria-label="Social links"
                >

                    <a
                        className="hero-social-link"
                        href="https://www.linkedin.com/in/tabithasulaiman/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn
                            aria-hidden="true"
                        />
                    </a>


                    <a
                        className="hero-social-link"
                        href="https://github.com/tabee1024/tabee1024"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub
                            aria-hidden="true"
                        />
                    </a>


                    <a
                        className="hero-social-link"
                        href="mailto:tabisul04@gmail.com"
                        aria-label="Email Tabitha"
                    >
                        <Mail
                            aria-hidden="true"
                        />
                    </a>

                </div>

            </div>


            <div
                className="mockup-hero-visual"
                aria-label="Portrait of Tabitha Sulaiman"
            >

                <div className="mockup-portrait-placeholder">

                    <img
                        className="mockup-portrait-image"
                        src={portfolioHeadshot}
                        alt="Tabitha Sulaiman"
                    />

                </div>


                <div
                    className="mockup-hero-accent"
                    aria-hidden="true"
                />


                <div
                    className="mockup-dot-column"
                    aria-hidden="true"
                >
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

            </div>

        </section>
    );
}


export default Hero;