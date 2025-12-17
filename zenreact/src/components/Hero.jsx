import React, { useState, useRef, useEffect } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow, TiVolumeUp, TiVolumeMute } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [videoIndex, setVideoIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  const nextVref = useRef(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      nextVref.current?.play();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsAudioPlaying(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const upcomingVideoIndex = (videoIndex % totalVideos) + 1;
  const handelvideoload = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleClick = () => {
    setHasClicked(true);
    setVideoIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => nextVref.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [videoIndex],
      revertOnUpdate: true,
    }
  );
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: " polygon(8% 3%, 78% 5%, 91% 89%, 0 100%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
      borderRadius: "0% 0% 0% 0%",

      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className=" absolute flex-center z-[100] h-dvh w-screen overflow-hidden bg-blue-75">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden  bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVref}
                src={getVideoSrc((videoIndex % totalVideos) + 1)}
                loop
                muted={!isAudioPlaying}
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handelvideoload}
              />
            </div>
          </div>
          <video
            ref={nextVref}
            src={getVideoSrc(videoIndex)}
            loop
            muted={!isAudioPlaying}
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handelvideoload}
          />
          <video
            src={getVideoSrc(videoIndex === totalVideos - 1 ? 1 : videoIndex)}
            autoPlay
            loop
            muted={!isAudioPlaying}
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handelvideoload}
          />
        </div>
        <h1 className=" special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          <b>cinema</b>
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="uppercase  font-zentry text-blue-75 text-5xl sm:right-10 sm:text-7xl md:text-9xl lg:text-[8rem]">
              REDEFI<b>N</b>E
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100 uppercase">
              "Not a fan of typical South movies ? You're in the right place.
              This site features only the best of the best in every
              category—handpicked!"
            </p>
            <Button
              id="watch-trailar"
              tital="Watch Trailer"
              lefticon={<TiLocationArrow />}
              containerClass=" !bg-yellow-300 gap-1 flex-center  "
            />
          </div>
        </div>
        <div
          className="absolute bottom-5 right-5 z-40 cursor-pointer rounded-full bg-black p-4 text-yellow-300 hover:bg-yellow-300 hover:text-black transition-colors duration-300 ease-in-out"
          onClick={toggleAudioIndicator}
        >
          {isAudioPlaying ? (
            <TiVolumeUp className="size-6" />
          ) : (
            <TiVolumeMute className="size-6" />
          )}
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>cinema</b>
      </h1>
    </div>
  );
};

export default Hero;
