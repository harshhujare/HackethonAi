import { useEffect } from 'react';

const Feve = () => {
  useEffect(() => {
    const Originalfi = "/img/logo.png";
    const Hiddenfi = "/img/eye.webp";

    const handleVisibilityChange = () => {
      const favicon = document.querySelector("link[rel='shortcut icon']");
    

      if( document.hidden ){
        favicon.href = Hiddenfi ;
      }
      else{
        favicon.href = Originalfi ;
      }
     
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    
  });
};

export default Feve;
