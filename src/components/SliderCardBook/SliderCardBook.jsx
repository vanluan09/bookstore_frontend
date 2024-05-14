import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'; 
import CardBookFreeComponent from '../CardBookFreeComponent/CardBookFreeComponent';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} rotate-180`} style={{ ...style, zIndex: '1' }} onClick={onClick}>
      <svg className='arrowhover' xmlns="http://www.w3.org/2000/svg" stroke="black" height="40" viewBox="0 -960 960 960" width="40" style={{background:'#ccc', borderRadius:'50%', opacity:'0.5'}}>
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
      </svg>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, zIndex: '1' }} onClick={onClick}>
      <svg className='arrowhover' xmlns="http://www.w3.org/2000/svg" stroke="black" height="40" viewBox="0 -960 960 960" width="40" style={{background:'#ccc', borderRadius:'50%', opacity:'0.5'}}>
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
      </svg>
    </div>
  );
};

const SliderCardBook = ({ products, pathname }) => {
  const [slidesToShow, setSlidesToShow] = useState(products?.length)
  const [centerModeEnabled, setCenterModelEnabled] = useState(false);
  const [infiniteEnabled, setinfiniteEnabled] = useState(false);


  useEffect(() => {
    if (products?.length > 4) {
      setSlidesToShow(4);
      setCenterModelEnabled(true);
      setinfiniteEnabled(true)
    } else {
      setSlidesToShow(products?.length);
      setCenterModelEnabled(false);
      setinfiniteEnabled(false)
    }
  }, [products]);
  

  const settings = {
    centerMode: centerModeEnabled,
    infinite: infiniteEnabled,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    speed: 500,
    variableWidth: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

  };

  return (
    <div className='container-card' style={{ paddingBottom: '30px' }}>
      <Slider {...settings}>
        {products && products.map((product) => (
          <CardBookFreeComponent
            key={product._id}
            image={product.image}
            name={product.name}
            type={product.type}
            description={product.description}
            id={product._id}
            pathname = {pathname}
          />
        ))}
      </Slider>
    </div>
  );
};


export default SliderCardBook;
