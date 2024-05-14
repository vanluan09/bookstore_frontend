import React from 'react'
import CardComponent from '../../../components/CardComponent/CardComponent'


const ChildComponent

 = ({product}) => {
    

  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:'40px', alignItems:'center', justifyContent:'center'}}>
        {product?.map((pro) => {
            return (
            <CardComponent                   
                key = {pro._id}
                image = {pro.image}
                name = {pro.name}
                price = {pro.price}
                type = {pro.type}
                description = {pro.description}
                discount = {pro.discount}
                countInStock = {pro.countInStock}
                id = {pro._id}
            />
        )})}           


    </div>
  )
}

export default ChildComponent


