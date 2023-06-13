import style from "./Gallery.module.css";
import image1 from "../../../assets/Gallery/gallery-1.jpg";
import image2 from "../../../assets/Gallery/gallery-2.jpg";
import image3 from "../../../assets/Gallery/gallery-3.jpg";
import image4 from "../../../assets/Gallery/gallery-4.jpg";
import image5 from "../../../assets/Gallery/gallery-5.jpg";
import image6 from "../../../assets/Gallery/gallery-6.jpg";
import image7 from "../../../assets/Gallery/gallery-7.jpg";
import image8 from "../../../assets/Gallery/gallery-8.jpg";
import image9 from "../../../assets/Gallery/gallery-9.jpg";

const Gallery = () => {
  return (
    <div className={`${style.container}`}>
      <div>
        <div></div>
      </div>
      <div>
        <img src={image1} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image2} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image3} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image4} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image5} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image6} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image7} alt="image" loading="lazy" />
      </div>
      <div>
        <img src={image8} alt="image" loading="lazy" />
      </div>
      <div></div>
      <div>
        <img src={image9} alt="image" loading="lazy" />
      </div>
      <div></div>
      <div>
        <div className={`${style.circle1}`}></div>
        <div className={`${style.circle2}`}></div>
      </div>
      <div></div>
    </div>
  );
};

export default Gallery;
