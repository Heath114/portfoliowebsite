"use client";
import "./page.css";
import { useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

import Copy from "@/components/Copy/Copy";
import BtnLink from "@/components/BtnLink/BtnLink";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const sampleProjectRef = useRef(null);
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0) scale(1)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-30%) scale(0.90)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleProjectRoute = (e, route) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    router.push(route, {
      onTransitionReady: () => {
        slideInOut();
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        });
        setTimeout(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 220);
      },
    });
  };

  useGSAP(
    () => {
      const progressContainer = sampleProjectRef.current.querySelector(
        ".sp-images-scroll-progress-container"
      );
      const projectImages = Array.from(
        sampleProjectRef.current.querySelectorAll(".sp-images-container img")
      );
      const firstImage = sampleProjectRef.current.querySelector(
        ".sp-images-container .sp-img:first-child"
      );
      const counter = sampleProjectRef.current.querySelector(
        "#sp-images-scroll-counter"
      );
      const bannerImg =
        sampleProjectRef.current.querySelector(".sp-banner-img");
      const btnLinkWrapper =
        sampleProjectRef.current.querySelector(".sp-link-wrapper");

      gsap.set(bannerImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(bannerImg, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power4.out",
      });

      if (btnLinkWrapper) {
        gsap.set(btnLinkWrapper, { y: 30, opacity: 0 });

        ScrollTrigger.create({
          trigger: btnLinkWrapper.closest(".sp-copy-description"),
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(btnLinkWrapper, {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 1,
              ease: "power4.out",
            });
          },
        });
      }

      ScrollTrigger.create({
        trigger: sampleProjectRef.current,
        start: "top top",
        end: () => {
          const scrollDistance =
            sampleProjectRef.current.scrollHeight - window.innerHeight;
          return `+=${Math.max(scrollDistance, 1)}`;
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Math.round(gsap.utils.clamp(0, 1, self.progress) * 100);
          counter.textContent = progress;

          const containerHeight = progressContainer.offsetHeight;

          const isMobile = window.innerWidth < 1000;
          const baseDistance = window.innerHeight + containerHeight;
          const mobileMultiplier = isMobile ? 1.25 : 1;
          const moveDistance = baseDistance * mobileMultiplier;

          gsap.to(progressContainer, {
            y: -self.progress * moveDistance,
            duration: 0.1,
            ease: "none",
          });
        },
      });

      if (firstImage) {
        ScrollTrigger.create({
          trigger: firstImage,
          start: "top 85%",
          onEnter: () => {
            gsap.to(progressContainer, {
              autoAlpha: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 0.8,
              ease: "power4.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(progressContainer, {
              autoAlpha: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              duration: 0.45,
              ease: "power3.out",
            });
          },
        });
      }

      gsap.set(progressContainer, {
        position: "fixed",
        top: "100vh",
        left: "1.5rem",
        right: "1.5rem",
        autoAlpha: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      const refreshScrollMetrics = () => ScrollTrigger.refresh();

      projectImages.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", refreshScrollMetrics);
          img.addEventListener("error", refreshScrollMetrics);
        }
      });

      requestAnimationFrame(refreshScrollMetrics);

      return () => {
        projectImages.forEach((img) => {
          img.removeEventListener("load", refreshScrollMetrics);
          img.removeEventListener("error", refreshScrollMetrics);
        });
      };
    },
    { scope: sampleProjectRef }
  );

  return (
    <div className="sample-project" ref={sampleProjectRef}>
      <section className="sp-hero">
        <Copy delay={0.85}>
          <h1>The Way Mobile</h1>
        </Copy>
      </section>

      <section className="sp-banner-img">
        <img src="/images/work/The Way Mobile/main.png" alt="" />
      </section>

      <section className="sp-copy">
        <div className="sp-info">
          <div className="sp-col sp-col-lg">
            <div className="sp-tags">
              <Copy>
                <p className="sm caps mono">Website Design</p>
                <p className="sm caps mono">UI/UX</p>
                <p className="sm caps mono">Brand Identity</p>
              </Copy>
            </div>
          </div>
          <div className="sp-col sp-col-sm">
            <div className="sp-year">
              <Copy delay={0.15}>
                <p className="sm caps mono">2026</p>
              </Copy>
            </div>

            <div className="client">
              <Copy delay={0.3}>
                <p className="sm caps mono">The Way Mobile</p>
              </Copy>
            </div>
          </div>
        </div>

        <div className="sp-copy-wrapper">
          <div className="sp-col-lg">
            <div className="sp-copy-title">
              <Copy>
                <h3>A Clear, Modern Website Identity for The Way Mobile</h3>
              </Copy>
            </div>
          </div>
          <div className="sp-col-sm">
            <div className="sp-copy-description">
              <Copy>
                <p>
                  The Way Mobile is a full website identity project built to
                  communicate trust, clarity, and modernity. The site combines
                  clean typography, intuitive layout systems, and a strong
                  visual hierarchy to make content feel both premium and easy to
                  navigate.
                </p>
                <br />
                <p>
                  The identity extends across key web pages with consistent UI
                  components, interaction patterns, and responsive behavior.
                  Each section was designed to reduce friction and guide users
                  naturally through the experience, balancing visual character
                  with practical usability.
                </p>
              </Copy>

              <div className="sp-link">
                <div className="sp-link-wrapper">
                  <BtnLink route="#" label="View Project" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-images">
        <div className="sp-images-scroll-progress-container">
          <h1 id="sp-images-scroll-counter">0</h1>
          <h1>/100</h1>
        </div>
        <div className="sp-images-container">
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/1.png" alt="" />
          </div>
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/2.png" alt="" />
          </div>
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/3.png" alt="" />
          </div>
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/4.png" alt="" />
          </div>
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/5.png" alt="" />
          </div>
          <div className="sp-img">
            <img src="/images/work/The Way Mobile/6.png" alt="" />
          </div>
        </div>
      </section>

      <section className="sp-next-project">
        <div className="sp-next-project-copy">
          <Copy>
            <p className="sm">(More Projects)</p>
          </Copy>
          <div className="sp-next-project-names">
            <Copy>
              <a
                href="/work/newlook"
                onClick={(e) => handleProjectRoute(e, "/work/newlook")}
              >
                <h1>New Look - Finishing & Coating</h1>
              </a>
            </Copy>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
