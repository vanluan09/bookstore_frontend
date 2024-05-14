import React from 'react'
import { CardStyle, WrapperNameProduct, WrapperPriceProduct } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'


const CardComponent = (props) => {
  const {image, name, price, type, description, countInStock, id} = props

  const navigate = useNavigate()
  const handleDetailProduct = (id) => {
    navigate(`/product-details/${id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div style={{padding:'10px'}}>
        <CardStyle
            
            hoverable
            style={{header:{width:'150px', maxHeight:'1560px'}, width: 240, height: 350, borderRadius:25, padding:5, body: {padding:'12px'}}}
            cover={<img style={{width:'200px', margin:'auto'}} alt="example" src={image} />}
            onClick={() => handleDetailProduct(id)}
        >
         
            <WrapperNameProduct>{name}</WrapperNameProduct>
            <WrapperPriceProduct>Giá: {convertPrice(price)}</WrapperPriceProduct>
         
        </CardStyle>
    </div>
    
    
  )
}

export default CardComponent
