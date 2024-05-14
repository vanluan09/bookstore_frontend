import { Image } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import backgroundBody from '../../assets/img/pray/thanhthe.jpg'
import backgroundThanhGia from '../../assets/img/pray/passion.jpg'
import backgroundMaria from '../../assets/img/pray/mancoi.png'
import TitleComponent from '../../components/TitleComponent/TitleComponent'
import * as ProductService from '../../services/ProductService'
import SliderCardBook from '../../components/SliderCardBook/SliderCardBook'
import praise from '../../assets/audio/praise.mp3';
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";


const RoomPage = () => {
  const [productTypes, setProductTypes] = useState([])
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [background, setBackground] = useState('');
  const location = useLocation();
 console.log('location', location)
  
  useEffect(() => {

    let type 
    if (location.pathname === '/phong-cau-nguyen/maria') {
      setBackground(backgroundMaria);
      type = 'Đức Mẹ'
    } else if (location.pathname === '/phong-cau-nguyen/Thanh_gia') {
      setBackground(backgroundThanhGia);
      type = 'Thánh Giá'
    } else if (location.pathname === '/phong-cau-nguyen/body_of_Chirst') {
      setBackground(backgroundBody);
      type = 'Thánh Thể'
    }
    const fetchData = async () => {
      setLoading(true);
      const res = await ProductService.getProductType(type, limit)
      const product = res.data
      setProductTypes(product)
      setLoading(false);
    };
  
    fetchData();
  },[ location.state, limit])


  return (
    <div style={{background:'#000'}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{location.state}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{ position: 'relative' }}>
        <Image src={background} alt="background" preview={false} style={{ objectFit:'cover', height: '620px', width:'1348px'}} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <audio controls>
            <source src={praise} type="audio/mpeg" />
          </audio>
        </div>
      </div>

      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent
          text={'SÁCH MƯỢN ĐỌC KHI CẦU NGUYỆN'}
        />

        <div >

          <SliderCardBook
            products={productTypes} 
            pathname = {location.pathname}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomPage
