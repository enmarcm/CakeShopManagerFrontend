import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AnimatedScroll = ({ animation, duration = 1000, children }) => {
  useEffect(() => {
    AOS.init({
      duration: duration,
      once: false, // La animación solo se ejecutará una vez por elemento
      mirror: false, // La animación no se repetirá en sentido inverso
    });

    return () => {
      AOS.refresh(); // Actualiza AOS al desmontar el componente
    };
  }, [duration]);

  return <div data-aos={animation}>{children}</div>;
};

export default AnimatedScroll;
