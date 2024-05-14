import {Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo, WrapperP, WrapperH3, WrapperDiv, WrapperTotal, WrapperInfoPayment, WrapperTotalSuccess, WrapperRadio, WrapperInfor} from './style';
import { CancelAllCart, CancelProductInCart } from '../../redux/actions/orderActions';

import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { useLocation, useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { Helmet } from 'react-helmet';
import { orderContant } from '../../contant';
import signUp from '../../assets/img/background/signin_out.png'

import { WrapperButtonComponent } from '../HomePage/style';

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const {state} = useLocation()
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()




  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount  * cur.amount) / 100)
    },0)
    if(Number(result)){
      return result
    }
    return 0
  },[order])

  const diliveryPriceMemo = useMemo(() => {
    if(priceMemo >= 200000 && priceMemo < 500000){
      return 10000
    }else if(priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  },[priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  },[priceMemo,priceDiscountMemo, diliveryPriceMemo])

  const handleRemoveAllOrder = () => {   
    const cancelCart = {
      userId: user.id,
      productId: state
    }
    dispatch(CancelAllCart({data: cancelCart, accessToken: user.access_token}))
  }


  

  const handleAddOrder = async () => {
    setLoading(true)
    try {
      if(!payment) {
        message.error('Vui lòng chọn phương thức thanh toán')
      }
      else if (
        user?.access_token &&
        order?.orderItemsSlected &&
        user?.name &&
        user?.address &&
        user?.phone &&
        user?.city &&
        priceMemo &&
        user?.id
      ) {
        const data = {
          token: user?.access_token,
          orderItems: order?.orderItemsSlected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
          email: user?.email,
        };
  
        const response = await OrderService.createOrder(data);
        
        if (response.status === 'OK') {
          
          const arrayOrdered = [];
          order?.orderItemsSlected?.forEach((element) => {
            arrayOrdered.push(element.product);
          });
          dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
          handleRemoveAllOrder();
          message.success('Đặt hàng thành công');
          navigate('/orderSuccess', {
            state: {
              orderItems: order?.orderItemsSlected,
              fullName: user?.name,
              address: user?.address,
              phone: user?.phone,
              city: user?.city,
              paymentMethod: payment,
              itemsPrice: priceMemo,
              shippingPrice: diliveryPriceMemo,
              totalPrice: totalPriceMemo,
              email: user?.email,
            },
          });
        }
      }
    } catch (error) {
      message.error('Đặt hàng không thành công');
    }finally {
      setLoading(false);
  }
  };


  const handlePayment = (e) => {
    setPayment(e.target.value)
  }


  return (
    <div style={{height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover', position:'relative'}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thanh toán</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div style={{position:'absolute', width:'100%', height:'100%', padding: '40px 0'}}>

        <div style={{textAlign:'center', fontSize:'32px', paddingBottom:'40px', color:'#e59906'}}>THỰC HIỆN THANH TOÁN</div>
        
        <Loading isLoading={loading}>

          <div style={{display:'flex', justifyContent:'space-between', padding:'0 40px'}}>
            {/* left */}
            <div style={{display:'flex', flexDirection:'column', gap:'20px', width:'45%'}}>
              <div style={{backgroundColor:'#fff', borderRadius:'16px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
                <div style={{fontWeight: 'bold', fontSize:'28px', margin:'20px 40px', color:'rgb(157,131 ,81)'}}>THÔNG TIN NGƯỜI NHẬN HÀNG</div>
                <div style={{margin: '40px', display:'flex', flexDirection:'column', gap: '20px'}}>
                  <WrapperInfor>
                    <span>Họ và tên: </span>
                    <span style={{fontWeight: 'bold'}}>{`${user?.name}`} </span>
                  </WrapperInfor>
                  <WrapperInfor>
                    <span>Thành phố: </span>
                    <span style={{fontWeight: 'bold'}}>{`${user?.city}`} </span>
                  </WrapperInfor>
                  <WrapperInfor>
                    <span>Số điện thoại: </span>
                    <span style={{fontWeight: 'bold'}}>{`0${user?.phone}`} </span>
                  </WrapperInfor>
                  <WrapperInfor>
                    <span>Địa chỉ: </span>
                    <span style={{fontWeight: 'bold'}}>{`${user?.address}`} </span>
                  </WrapperInfor>
              
                </div>
              </div>
              <div style={{backgroundColor:'#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', borderRadius:'16px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}> 
                  <Radio value="later_money" style={{fontSize:'18px'}}> Thanh toán tiền mặt khi nhận hàng</Radio>
                </WrapperRadio>
              </div>
            </div>

          
           
         

            {/* right */}
            <div style={{backgroundColor:'#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', width:'45%', borderRadius:' 16px'}}>
              <div style={{padding:'10px 20px', borderBottom:'1px solid #ccc', fontSize:'20px', fontWeight:'bold'}}>Sản phẩm được đặt hàng </div>

              <div style={{maxHeight:'180px', overflowY:'auto'}}>
                {order?.orderItemsSlected?.map(order => {
                  return (
                    <WrapperItemOrder key={order.name}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 210,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap',
                        }}>{order.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',justifyContent:'space-between'}}>                 
                        <div style={{  color: '#242424', display:'flex', flexDirection:'column' }}>
                          <span>Số lượng:</span> 
                          <span>{order.amount}</span> 
                          
                        </div>
                        <div style={{ color: '#242424', display:'flex', flexDirection:'column', gap:'5px'}}>
                          <span>Giá tiền:</span> 
                          <span>{convertPrice(order.price)}</span> 
                        </div>
                      </div>
                    </WrapperItemOrder>

                  )
                })}

              </div>

              <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
                <WrapperInfoPayment>
                  <div style={{display: 'flex', fontSize:'18px', alignItems: 'center', justifyContent: 'space-between', padding:'10px 20px'}}>
                    <span>Tạm tính</span>
                    <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{display: 'flex', fontSize:'18px', alignItems: 'center', justifyContent: 'space-between', padding:'10px 20px'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                  </div>
                </WrapperInfoPayment>

                <WrapperTotalSuccess>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection: 'column', gap:'10px'}}>
                    <span style={{color: 'rgb(254, 56, 52)',  fontWeight: 'bold', textAlign:'end'}}>{convertPrice(totalPriceMemo)}</span>
                    <span style={{color: '#000', fontSize: '14px'}}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotalSuccess>

              </div>
            </div>

          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px'}}>
            <WrapperButtonComponent
              onClick={handleAddOrder}
              size={40}
              styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  padding: '0 20px',
                  border: 'none',
                  borderRadius: '16px'
              }}
              textButton={'Đặt hàng'}
              styletextbutton={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}
            />
          </div>

        </Loading>
      </div>
    </div>
  )
}

export default PaymentPage