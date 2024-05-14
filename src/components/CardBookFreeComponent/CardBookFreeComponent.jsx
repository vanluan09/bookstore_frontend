import { Card } from 'antd'
import React from 'react'
import { CardStyle, WrapperNameProduct, WrapperPriceProduct } from './style'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CardBookFreeComponent = (props) => {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const { image, name, id, pathname } = props;
  const bookName = { state: pathname, name: name };
  console.log('wer', bookName)
  const navigate = useNavigate();
  
  const handleDetailProduct = (id) => {
    if(!user?.id) {
      navigate('/sign-in', {state: location?.pathname})
  }else {
    navigate(`pray/${id}`, { state: bookName }, { replace: true });
    window.scrollTo(0, 0);
  }}

  return (
    <div style={{padding:'10px'}}>
        <CardStyle
            
            hoverable
            style={{header:{width:'150px', maxHeight:'1560px'}, width: 240, height: 350, borderRadius:25, padding:5, body: {padding:'12px'}}}
            cover={<img style={{width:'200px', margin:'auto'}} alt="example" src={image} />}
            onClick={() => handleDetailProduct(id)}
        >
         
            <WrapperNameProduct>{name}</WrapperNameProduct>    
        </CardStyle>
    </div>
    
    
  )
}

export default CardBookFreeComponent
