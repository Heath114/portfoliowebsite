"use client";
import "./ProcessCards.css";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessCards = () => {
  const processCardsData = [
    {
      index: "01",
      title: "Principles",
      label: "(About the principles)",
      image: "/images/process/process_001.jpeg",
      description:
        "We design with restraint and intention. Every decision is shaped by a set of values, clarity, structure, and calm execution.",
    },
    {
      index: "02",
      title: "Approach",
      label: "(About the approach)",
      image: "/images/process/process_002.jpeg",
      description:
        "Our process is iterative and deliberate. We prioritize simplicity over excess, and build systems that scale with clarity.",
    },
    {
      index: "03",
      title: "Practice",
      label: "(About the practice)",
      image: "/images/process/process_003.jpeg",
      description:
        "We work at the intersection of design and code. Every detail is shaped by consistency, rhythm, and quiet precision.",
    },
    {
      index: "04",
      title: "Vision",
      label: "(About the vision)",
      image: "/images/process/process_004.jpeg",
      description:
        "We believe the web should feel honest and effortless. Our aim is to create digital experiences that stand the test of time.",
    },
  ];

  useGSAP(() => {
    const processCards = gsap.utils.toArray(".process-card");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px)", () => {
      processCards.forEach((card, index) => {
        if (index < processCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: processCards[processCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
            id: `card-pin-${index}`,
          });
        }

        if (index < processCards.length - 1) {
          ScrollTrigger.create({
            trigger: processCards[index + 1],
            start: "top 75%",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    });

    mm.add("(max-width: 1000px)", () => {
      gsap.set(processCards, { clearProps: "transform" });
      processCards.forEach((card) => card.style.setProperty("--after-opacity", 0));
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData, index) => (
        <div key={index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-img">
                <img src={cardData.image} alt="" />
              </div>

              <div className="process-card-copy">
                <div className="process-card-copy-title">
                  <p className="caps">{cardData.label}</p>
                </div>
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
