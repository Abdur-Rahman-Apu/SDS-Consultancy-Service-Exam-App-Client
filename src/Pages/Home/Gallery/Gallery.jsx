import style from "./Gallery.module.css";
import image1 from "../../../assets/Gallery/image-1.jpeg";
import image2 from "../../../assets/Gallery/image-2.jpeg";
import image3 from "../../../assets/Gallery/image-3.jpeg";
import image4 from "../../../assets/Gallery/image-4.jpeg";
import image5 from "../../../assets/Gallery/image-5.jpeg";
import image6 from "../../../assets/Gallery/image-6.jpeg";
import image7 from "../../../assets/Gallery/image-7.jpeg";
import image8 from "../../../assets/Gallery/image-8.jpeg";
import image9 from "../../../assets/Gallery/image-9.jpeg";

const Gallery = () => {
  return (
    <div className={`${style.container}`}>
      <div>
        <div></div>
      </div>
      <div>
        <img src={image1} alt="image"  />
      </div>
      <div>
        <img src={image2} alt="image" />
      </div>
      <div>
        <img src={image3} alt="image"  />
      </div>
      <div>
        <img src={image4} alt="image"/>
      </div>
      <div>
        <img src={image5} alt="image" />
      </div>
      <div>
        <img src={image6} alt="image" />
      </div>
      <div>
        <img src={image7} alt="image" />
      </div>
      <div>
        <img src={image8} alt="image" />
      </div>
      <div></div>
      <div>
        <img src={image9} alt="image"/>
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
