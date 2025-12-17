import react, { useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiDownload, TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const [TransformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();
  const HandelMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };
  const HandelMouseLeav = () => {
    setTransformStyle("");
  };
  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={HandelMouseMove}
      onMouseLeave={HandelMouseLeav}
      style={{ transform: TransformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, tital, descrption, btnlink }) => {
  return (
    <div className="size-full relative ">
      <img
        className="absolute top-0 left-0 size-full object-cover object-center"
        src={src}
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50 ">
        <div>
          <h1 className="bento-title special-font"> {tital}</h1>
          {descrption && (
            <p className="mt-3 text-xs max-w-64 md:text-base"> {descrption}</p>
          )}
          <Button
            src={btnlink}
            id="Get link"
            tital="get link"
            lefticon={<TiDownload />}
            containerClass=" !bg-yellow-300 gap-1 flex-center top-5  "
          />
        </div>
      </div>
    </div>
  );
};
const Feactures = () => {
  return (
    <section className="bg-black pb-10">
      <div className="container mx-auto px-3 md:px-10">
        <div className=" px-5 py-32 ">
          <p className="text-blue-50 font-circular-web text-lg">
            welcome to the world of cinema,
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Here, we feature only the finest films in each category. Curated,
            not crowded.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="img/gvf.webp"
            tital={
              <>
                <b>Grave of the fire flies</b>
              </>
            }
            descrption="This isn’t a movie. It’s a quiet scream. A story so tender and tragic, it doesn’t break your heart all at once—it shatters it in slow motion. Set in the ashes of war, it follows two siblings clinging to each other as the world forgets them. No heroes. No victories. Just love, loss, and the kind of silence that lingers long after the credits roll. "
            btnlink="https://www.vegamovies-nl.biz/download-grave-of-the-fireflies-1988-hindi-dubbed/"
          />
        </BentoTilt>
        <div className="grid h-auto w-full grid-cols-1 gap-7 md:h-[100vh] md:grid-cols-2 md:grid-rows-3">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="img/alicein.webp"
              tital={
                <>
                  {" "}
                  <b>Alice in borderland</b>
                </>
              }
              descrption="Alice in Borderland is a gripping mix of psychological thrills and deadly games, keeping you hooked with every twist. at first it feels like squid games but its very brutal than that"
              btnlink="https://www.vegamovies-nl.biz/download-alice-in-borderland-netflix-original-2022-season-1-dual-audio/"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-32 md:row-span-1">
            <BentoCard
              src="img/dark.webp"
              tital={
                <>
                  {" "}
                  <b>dark</b>
                </>
              }
              descrption="Dark is a mind-bending German sci-fi thriller that weaves time travel."
              btnlink="https://www.vegamovies-nl.biz/download-dark-season-1-3-english-with-subtitles-netflix-series-complete/"
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="img/death.webp"
              tital={
                <>
                  {" "}
                  <b>Death Note</b>
                </>
              }
              descrption=" Smart guy gets a god-like notebook. Moral grey zones everywhere."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};
export default Feactures;
