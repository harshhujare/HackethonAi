import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FilmScene = ({ film, index }) => {
  const sceneRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "+=2000", // Drag out the scene for 1000px of scroll (reduced from 2000)
          scrub: 3,
          pin: true,
          // markers: true, // For debugging
        },
      });

      // 1. Initial State
      // Determine entry side based on index (even = left, odd = right)
      const xStart = index % 2 === 0 ? "-100%" : "100%";

      // Setup initial props
      gsap.set(contentRef.current, { x: xStart, scale: 0.5, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 50 });
      gsap.set(imgRef.current, { borderRadius: "2rem" });

      // 2. Entry to Center (Focus)
      tl.to(contentRef.current, {
        x: "0%",
        scale: 0.7,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      })

        // 3. Full Screen Takeover
        .to(
          contentRef.current,
          {
            scale: 1,
            width: "100vw",
            height: "100vh",
            duration: 2,
            ease: "power2.inOut",
          },
          ">"
        ) // Start after previous

        .to(
          imgRef.current,
          {
            borderRadius: "0rem",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        ) // Sync with scale

        // 4. Text Reveal
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        })

        // 5. Narrative Pause (Hold) using an empty tween
        .to({}, { duration: 1 })

        // 6. Exit
        .to(contentRef.current, {
          opacity: 0,
          scale: 1.1, // Slight zoom out/in on fade
          filter: "blur(10px)",
          duration: 1,
        });
    },
    { scope: sceneRef }
  );

  return (
    <div
      ref={sceneRef}
      className="film-scene-track w-full h-[100vh] bg-black overflow-hidden"
    >
      {/* The Pinned Content Container */}
      <div
        ref={contentRef}
        className="scene-content relative w-full h-full flex items-center justify-center overflow-hidden bg-black text-white will-change-transform"
      >
        {/* Background/Main Image */}
        <img
          ref={imgRef}
          src={film.image}
          alt={film.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div
          ref={textRef}
          className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center"
        >
          <span className="text-yellow-300 font-general uppercase tracking-widest mb-4 inline-block">
            {film.genre} — {film.duration}
          </span>
          <h2 className="special-font font-zentry font-black text-6xl md:text-9xl uppercase leading-[0.8] mb-6">
            {film.title}
          </h2>
          <p className="font-circular-web text-blue-50 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-90">
            {film.description}
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black font-general uppercase tracking-wider hover:bg-yellow-300 transition-colors duration-300 rounded-full">
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmScene;
