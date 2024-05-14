import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo, WrapperP, WrapperH3, WrapperDiv, WrapperTotal, WrapperInfoPayment, WrapperTotalSuccess} from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import Logo from '../../assets/img/logo/Logo.png'
import signUp from '../../assets/img/background/signin_out.png'

import { WrapperButtonComponent } from '../HomePage/style';
import { Helmet } from 'react-helmet';



const OrderSuccess = () => {
  const  {state} = useLocation()
  const navigate = useNavigate()
  const handleHome = () => {
    navigate('/')
  }

  return (
    <div style={{height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover', position:'relative'}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đặt hàng thành công</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'rgba(0, 0, 0, 0.6)'}}>
        
        <Loading isLoading={false}>
          <div style={{padding:'20px 0 20px', display:'flex', justifyContent:'center'}}>
            <img 
              src={Logo} alt="logo"
              width={200}
                
            />
          </div>

          <div style={{display:'flex', justifyContent:'space-between', padding:'0 40px'}}>
            {/* left */}
            <div style={{display:'flex', flexDirection:'column', gap:'20px', padding:'0 10px', width:'50%'}}>
              <div style={{display:'flex', gap:'10px', justifyContent:'center', alignItems:'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                  <g fill="none" stroke="#8EC343" strokeWidth="2">
                    <circle cx="36" cy="36" r="35" style={{strokeDasharray:'240px 240px', strokeDashoffset: '480px'}}></circle>
                    <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style={{strokeDasharray:'50px 50px', strokeDashoffset: '0px'}}></path>
                  </g>
                </svg>

                <div style={{fontWeight:'500', fontSize:'24px', color:'#fff'}}>Cám ơn bạn đã đặt hàng</div>
              </div>

              <div style={{border:'1px solid #ccc', display:'flex', flexWrap:'wrap', gap:'10px', padding:'0 10px'}}>
                <WrapperDiv>
                  <WrapperH3>Thông tin người mua hàng</WrapperH3>
                  <WrapperP>{state.fullName}</WrapperP>
                  <WrapperP>{state.email}</WrapperP>
                  <WrapperP>0{state.phone}</WrapperP>
                </WrapperDiv>

                <WrapperDiv>
                  <WrapperH3>Địa chỉ nhận hàng</WrapperH3>
                  <WrapperP>{state.address}</WrapperP>
                </WrapperDiv>
                
                <WrapperDiv>
                  <WrapperH3>Phương thức thanh toán</WrapperH3>
                  <WrapperP>{orderContant.payment[state?.paymentMethod]}</WrapperP>  
                </WrapperDiv>

                <WrapperDiv>
                  <WrapperH3>Phương thức vận chuyển</WrapperH3>
                  <WrapperP>Giao hàng tận nơi</WrapperP>
                  
                </WrapperDiv>
              </div>
            </div>

            {/* right */}
            <div style={{backgroundColor:'#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', width:'45%'}}>
              <div style={{padding:'5px', borderBottom:'1px solid #ccc', fontSize:'20px'}}>Sản phẩm được đặt hàng </div>

              <div style={{maxHeight:'180px', overflowY:'auto'}}>
                {state?.orderItems?.map(order => {
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
                      <div style={{flex: 1, display: 'flex', alignItems: 'center',gap: '20px'}}>                 
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
                    <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(state.itemsPrice)}</span>
                  </div>
                  <div style={{display: 'flex', fontSize:'18px', alignItems: 'center', justifyContent: 'space-between', padding:'10px 20px'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(state.shippingPrice)}</span>
                  </div>
                </WrapperInfoPayment>

                <WrapperTotalSuccess>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection: 'column', gap:'10px'}}>
                    <span style={{color: 'rgb(254, 56, 52)',  fontWeight: 'bold', textAlign:'end'}}>{convertPrice(state.totalPrice)}</span>
                    <span style={{color: '#000', fontSize: '14px'}}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotalSuccess>

              </div>
            </div>

          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20px'}}>
            <WrapperButtonComponent
              onClick={handleHome}
              size={40}
              styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '320px',
                  border: 'none',
                  borderRadius: '16px'
              }}
              textButton={'Tiếp tục mua hàng'}
              styletextbutton={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}
            />
          </div>

        </Loading>
      </div>
    </div>
  )
}

export default OrderSuccess