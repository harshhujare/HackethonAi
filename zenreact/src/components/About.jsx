import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { TiDownload, TiLocationArrow } from 'react-icons/ti';
import AnimatedTitle from './AnimatedTitle.jsx';
import Button from './Button.jsx';
gsap.registerPlugin(ScrollTrigger);

const About = ({hello ,subtext,btnlink,imge}) => {
  const containerRef = useRef(); 

  useGSAP(() => {
    const triggerElem = containerRef.current.querySelector('.clip-section');
    const targetElem = containerRef.current.querySelector('.mask-clip-path');

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElem,
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(targetElem, {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    });
  }, { scope: containerRef }); 

  return (
    <div ref={containerRef} className="min-h-screen w-screen">
      <div className="relative mt-36 mb-8 flex flex-col items-center gap-5">
        <h2 className="font-general uppercase text-sm md:text-[15px]">
          welcome to the world of absolute cinema
        </h2>
        <AnimatedTitle
          title={hello}
          containerClass="mt-5 !text-black text-center"
        />
        <div className="about-subtext  mt-10" >{subtext} 
        <div className="ml-52">
         
          </div>
           
        </div>
 <Button src={btnlink} id="Get link" tital="get link" lefticon={<TiDownload/>} containerClass=" !bg-yellow-300 gap-1 flex-center   "    />
      </div>
  
      {/* 👇 just use classNames here, no IDs needed */}
      <div className="h-dvh w-screen  clip-section">
        <div className="mask-clip-path  about-image">
          <img
            src={imge}
            alt=" background"
            className="absolute top-0  left-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
