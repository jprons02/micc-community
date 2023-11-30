import React from 'react';
import Slider from 'react-slick';

// create props interface with sliderWidth type string and imageArray type array of objects
interface ImageSliderProps {
  sliderWidth: string;
  imageArray: Array<{
    src: string;
    alt: string;
  }>;
}

const ImageSlider = (props: ImageSliderProps) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ width: props.sliderWidth }}>
      <Slider {...settings}>
        {props.imageArray.map((image) => (
          <div>
            <img src={image.src} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
