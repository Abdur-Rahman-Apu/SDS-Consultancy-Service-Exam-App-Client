import Banner from "../Banner/Banner";

import Certifications from "../Certifications/Certifications";
import Gallery from "../Gallery/Gallery";
import Features from "../Features/Features";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />

      {/* features  */}
      <Features />

      {/* certifications  */}
      <Certifications />

      {/* gallery  */}
      <Gallery />
    </div>
  );
};

export default Home;
