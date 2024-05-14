import { Image } from 'antd'
import React from 'react'
import Slider from 'react-slick'

const SliderComponent = ({arrImage}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:3000,
        pauseOnHover: true
      };
  return (
    <Slider {...settings} >
        {arrImage.map((image) => {
            return (
                <Image src={image} key={image} width={'100%'}  alt='slider' preview ={false} />
            )
        })}
    </Slider>

    
  )
}

export default SliderComponent
