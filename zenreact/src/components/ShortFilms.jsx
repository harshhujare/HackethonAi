import React, { useRef } from "react";
import FilmScene from "./FilmScene";
import GalaxyScene from "./GalaxyScene";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FILMS_DATA = [
  {
    id: 1,
    title: "Azure Echo",
    description:
      "A digital dreamscape where memories are stored in liquid light. The protagonist must dive into the azure depths to retrieve a lost thought.",
    image: "/img/alice.webp",
    duration: "12:45",
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Midnight Void",
    description:
      "In a city that never wakes up, one streetlamp flickers a message in Morse code. A story of isolation and connection in the dark.",
    image: "/img/dark.webp",
    duration: "08:30",
    genre: "Noir",
  },
  {
    id: 3,
    title: "Velvet Decay",
    description:
      "An avant-garde exploration of time, represented by a wilting flower in a room made of mirrors. Visual poetry at its finest.",
    image: "/img/alicein.webp",
    duration: "05:15",
    genre: "Abstract",
  },
  {
    id: 4,
    title: "Neon Samurai",
    description:
      "A cyberpunk warrior seeks redemption in a world ruled by algorithms. Fast-paced action meets philosophical contemplation.",
    image: "/img/gallery-1.webp",
    duration: "15:00",
    genre: "Action",
  },
  {
    id: 5,
    title: "Silent Operator",
    description:
      "A tension-filled thriller about a switchboard operator who overhears a conversation that changes history.",
    image: "/img/death.webp",
    duration: "10:20",
    genre: "Thriller",
  },
  {
    id: 6,
    title: "Terra Nova",
    description:
      "The last garden on Earth is guarded by a single robot. A touching story of preservation and hope.",
    image: "/img/entrance.jpg",
    duration: "11:50",
    genre: "Drama",
  },
];

const ShortFilms = () => {
  // We don't need the old stagger logic here anymore
  // Each FilmScene handles its own trigger

  return (
    <div className="bg-black w-full">
      {/* Intro Section - Standard Scroll */}
      <section className="h-[100vh] flex items-center justify-center bg-black relative z-10 overflow-hidden">
        {/* 3D Background */}
        <GalaxyScene />

        <div className="text-center relative z-20 pointer-events-none">
          <h1 className="hero-heading text-blue-50/90 !text-6xl md:!text-9xl mix-blend-overlay">
            Cine-File
          </h1>
          <p className="text-blue-50/80 font-circular-web mt-4 uppercase tracking-[0.2em] text-sm md:text-base backdrop-blur-sm p-2 rounded-full border border-white/10 inline-block">
            Immersive Short Film Showcase
          </p>
          <div className="mt-12 animate-bounce text-blue-50 opacity-50">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* The Film Scenes */}
      <div className="relative z-0">
        {FILMS_DATA.map((film, index) => (
          <FilmScene key={film.id} film={film} index={index} />
        ))}
      </div>

      {/* Footer spacer */}
      <div className="h-[20vh] bg-black"></div>
    </div>
  );
};

export default ShortFilms;
