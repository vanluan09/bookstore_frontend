import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Helmet } from 'react-helmet'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  return (
   <Loading isLoading={isLoading}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chi tiết đơn hàng</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
     <div style={{margin:'40px 100px'}}>
      
        <div style={{fontWeight:'600', fontSize:'24px', color:'#e59906', paddingBottom:'20px', paddingTop:'20px'}}>Chi tiết đơn hàng</div>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>{data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span style={{fontWeight:'600'}}>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span style={{fontWeight:'600'}}>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tận nơi</div>
              <div className='delivery-fee'><span style={{fontWeight:'600'}}>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>

        <WrapperStyleContent>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize:'18px', background:'#e59906', padding:'10px'}}>
            <div style={{width: '670px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct key={order?.name}>
                <WrapperNameProduct>
                  <img src={order?.image} 
                    style={{
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                  }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                
              </WrapperProduct>
            )
          })}
          
          <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
          </WrapperAllPrice>
      </WrapperStyleContent>
     
    </div>
   </Loading>
  )
}

export default DetailsOrderPage