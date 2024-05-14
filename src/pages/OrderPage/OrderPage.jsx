import { Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperListOrder, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal, WrapperInfor, WrapperSpanHover, WrapperDeleteOutlined, WrapperRadio } from './style';
import { MinusOutlined, PlusOutlined} from '@ant-design/icons'
import * as OrderService from '../../services/OrderService'

import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';

import { useNavigate, useLocation } from 'react-router-dom';
import StepComponent from '../../components/StepConponent/StepComponent';
import './style.css'
import { WrapperButtonComponent } from '../HomePage/style';
import { CancelAllCart, CancelProductInCart } from '../../redux/actions/orderActions';
import { WrapperInputNumber } from '../ProductDetailsPage/style';
import { Helmet } from 'react-helmet';


const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)
  const location = useLocation()



  const [listChecked, setListChecked] = useState(location?.state ? [location.state] : [])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const dispatch = useDispatch()


  const onChange = (e) => {
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    }else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if(type === 'increase') {
      if(!limited) {
        dispatch(increaseAmount({idProduct}))
      }
    }else {
      if(!limited) {
        dispatch(decreaseAmount({idProduct}))
      }
    }
  }

  const handleDeleteOrder = (idProduct) => {
    const cancelCart = {
      userId: user.id,
      productId: idProduct
    }
    dispatch(removeOrderProduct({idProduct}))
    dispatch(CancelProductInCart({ data: cancelCart, accessToken: user.access_token }))
  }

  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    }else {
      setListChecked([])
    }
  }

  useEffect(() => {
    dispatch(selectedOrder({listChecked}))
  },[listChecked])

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

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
      dispatch(removeAllOrderProduct({listChecked}))
      const cancelCart = {
        userId: user.id,
        productId: listChecked
      }
      dispatch(CancelAllCart({data: cancelCart, accessToken: user.access_token}))
  }
  


  const handleAddCard = () => {
    if(!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    }else if(!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true)
    }
    else {
      navigate('/payment', {state: listChecked})
    } 
  }

  const handleHome = () => {
    navigate('/')
  }


  const handleUpdateInforUser = async () => {
    try {
      const { name, address, city, phone } = stateUserDetails;
      if (name && address && city && phone) {
        const data = {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetails,
        };
        const response = await UserService.updateUser(data.id, { ...data }, data.token);
        if (response.status === 'OK') {

          dispatch(updateUser({ name, address, city, phone }));
          setIsOpenModalUpdateInfo(false);
        }
      }
    } catch (error) {
      console.error('Cập nhật thông tin người dùng không thành công:', error);
    }
  };

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description : 'Trên 500.000 VND',
    },
  ]



  return (
    <Loading isLoading={loading}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giỏ hàng của tôi</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{padding:'40px 100px'}}>
        {order?.orderItems?.length > 0 ? (
          <div> 
            <div>
              <WrapperStyleHeaderDilivery>
                <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000 
                  ? 2 : diliveryPriceMemo === 20000 ? 1 
                  : order.orderItemsSlected.length === 0 ? 0:  3}/>
              </WrapperStyleHeaderDilivery>

              <WrapperStyleHeader>
                  <span style={{display: 'inline-block', width: '390px'}}>
                    <CustomCheckbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
                    <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                  </span>
                  <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <WrapperDeleteOutlined style={{cursor: 'pointer'}} onClick={handleRemoveAllOrder}/>
                  </div>
              </WrapperStyleHeader>

              <WrapperListOrder>
                {order?.orderItems?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
                        <img src={order?.image} style={{width: '80px', height: '82px', objectFit: 'cover'}}/>
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow:'ellipsis',
                          whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>
                          <span style={{ color: '#242424' }}>{convertPrice(order?.price)}</span>
                        </span>

                        <WrapperCountOrder>
                          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease',order?.product, order?.amount === 1)}>
                              <MinusOutlined style={{ color: '#000', fontSize: '12px' }} />
                          </button>
                          <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase',order?.product ,order?.amount === order.countInStock, order?.amount === 1)}>
                              <PlusOutlined style={{ color: '#000', fontSize: '12px' }}/>
                          </button>
                        </WrapperCountOrder>
                        <span style={{color: 'rgb(255, 66, 78)', fontWeight: 500}}>{convertPrice(order?.price * order?.amount)}</span>
                        <WrapperDeleteOutlined style={{cursor: 'pointer', fontSize:'24px'}} onClick={() => handleDeleteOrder(order?.product)}/>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperListOrder>
            </div>

            <div style={{display:'flex', gap: '40px'}}>
                <WrapperInfo>
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
                      <span style={{fontWeight: 'bold'}}>{`(+84) ${user?.phone}`} </span>
                    </WrapperInfor>
                    <WrapperInfor>
                      <span>Địa chỉ: </span>
                      <span style={{fontWeight: 'bold'}}>{`${user?.address}`} </span>
                    </WrapperInfor>
                    <WrapperSpanHover onClick={handleChangeAddress} style={{color: '#9255FD', cursor:'pointer', fontSize:'24px', padding:'5px', textAlign:'end'}}>Thay đổi</WrapperSpanHover>
                  </div>
                </WrapperInfo>

                <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
                  <WrapperInfo>
                    <div style={{display: 'flex', fontSize:'20px', alignItems: 'center', justifyContent: 'space-between', padding:'10px 20px'}}>
                      <span>Tạm tính</span>
                      <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                    </div>
                    <div style={{display: 'flex', fontSize:'20px', alignItems: 'center', justifyContent: 'space-between', padding:'10px 20px'}}>
                      <span>Phí giao hàng</span>
                      <span style={{color: '#000', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                    </div>
                  </WrapperInfo>

                  <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style={{display:'flex', flexDirection: 'column', gap:'10px'}}>
                      <span style={{color: 'rgb(254, 56, 52)',  fontWeight: 'bold', textAlign:'end'}}>{convertPrice(totalPriceMemo)}</span>
                      <span style={{color: '#000', fontSize: '14px'}}>(Đã bao gồm VAT nếu có)</span>
                    </span>
                  </WrapperTotal>

                  <WrapperButtonComponent
                    onClick={() => handleAddCard()}
                    size={40}
                    styleButton={{
                        background: 'rgb(255, 57, 69)',
                        height: '48px',
                        width: '320px',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    textButton={'Tiếp tục thanh toán'}
                    styletextbutton={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}
                  />
                </div>
            </div>
          
          </div>
        ) : (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <div style={{fontSize:'28px', color:'red', marginBottom:'30px'}}>Hiện không có đơn hàng nào trong giỏ hàng</div>
            <WrapperButtonComponent
              onClick={() => handleHome()}
              size={40}
              styleButton={{
                  background: 'rgb(205,146,34)',
                  height: '48px',
                  width: 'fix-content',
                  border: 'none',
                  borderRadius: '28px'
              }}
              textButton={'Tiếp tục mua hàng'}
              styletextbutton={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}
            />
          </div>
        )}
        

        <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser} width='70%'>
          <div>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                // onFinish={onUpdateUser}
                autoComplete="on"
                form={form}
              >
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng điền tên của bạn!' }]}
                >
                  <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                </Form.Item>
                <Form.Item
                  label="Thành phố"
                  name="city"
                  rules={[{ required: true, message: 'Vui lòng điền thành phố của bạn!' }]}
                >
                  <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại (+84)"
                  name="phone"
                  rules={[{ required: true, message: 'Vui lòng điền số điên thoại của bạn!' }]}
                >
                  <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Vui lòng điền địa chỉ của bạn!' }]}
                >
                  <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                </Form.Item>
            </Form>
          </div>
        </ModalComponent>
      </div>
    </Loading>
  )
}

export default OrderPage