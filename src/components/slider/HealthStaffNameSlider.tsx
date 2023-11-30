import React from 'react';
import Slider from 'react-slick';

// create props interface with sliderWidth type string and imageArray type array of objects
interface HealthStaffNameSliderProps {
  sliderWidth: string;
  handleStaffClick: Function;
  selectedName: string;
  nameArray: Array<{
    name: string;
  }>;
}

const HealthStaffNameSlider = (props: HealthStaffNameSliderProps) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const renderText = () => {
    return props.nameArray.map((item) => {
      const selectedStyle = {
        fontWeight: '700',
        fontSize: '14px',
        textDecoration: 'underline',
        textDecorationThickness: '2px',
        cursor: 'pointer',
      };
      const notSelectedStyle = { cursor: 'pointer', fontSize: '14px' };
      const style =
        props.selectedName === item.name ? selectedStyle : notSelectedStyle;
      return (
        <div style={{ marginBottom: '10px' }} key={item.name}>
          <a onClick={() => props.handleStaffClick(item.name)}>
            <p style={style}>{item.name}</p>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="healthStaffNameSlider">
      <Slider {...settings}>{renderText()}</Slider>
    </div>
  );
};

export default HealthStaffNameSlider;
