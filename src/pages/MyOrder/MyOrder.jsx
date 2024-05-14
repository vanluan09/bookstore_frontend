import React, { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import { format } from 'date-fns'; // Import thư viện date-fns
import { WrapperButtonAddComponent, WrapperButtonComponent } from '../ProductDetailsPage/style';
import { Helmet } from 'react-helmet';

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };

  const user = useSelector((state) => state.user);

  const queryOrder = useQuery(
    { queryKey: ['orders'], queryFn: fetchMyOrder },
    {
      enabled: state?.id && state?.token
    }
  );

  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    });
  };

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems, userId } = data;
      const res = OrderService.cancelOrder(id, token, orderItems, userId);
      return res;
    }
  );

  const handleCanceOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch();
      },
    });
  };

  const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
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
            width: 260,
            overflow: 'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            marginLeft: '10px'
          }}>{order?.name}</div>
          <span style={{color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
        </WrapperHeaderItem>
      );
    });
  };

  const [orders, setOrders] = useState([]); // Danh sách các đơn hàng cùng với thời điểm đặt hàng

  useEffect(() => {
    if (data) {
      // Lưu danh sách đơn hàng và thời điểm đặt hàng vào state
      const ordersWithTimestamp = data.map(order => ({
        ...order,
        orderTimestamp: new Date(order.createdAt).getTime() // Lưu thời điểm đặt hàng dưới dạng timestamp
      }));
      setOrders(ordersWithTimestamp);
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Kiểm tra mỗi đơn hàng xem đã trôi qua 24 giờ chưa, nếu có, loại bỏ nút "Hủy đơn hàng"
      const updatedOrders = orders.map(order => {
        const currentTimestamp = new Date().getTime();
        const orderTimestamp = order.orderTimestamp;
        const twentyFourHoursInMilliseconds = 24*60*60*1000;
        const isTwentyFourHoursPassed = currentTimestamp - orderTimestamp > twentyFourHoursInMilliseconds;

        return {
          ...order,
          isCancelable: !isTwentyFourHoursPassed // Tạo một trường isCancelable để xác định xem có thể hủy đơn hàng hay không
        };
      });
      setOrders(updatedOrders);
    }, 1000); 

    return () => clearInterval(timer);
  }, [orders]);


  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đơn hàng của tôi</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <WrapperContainer>
        <div style={{ height: '100%', margin: '0 auto' }}>
          <div style={{fontWeight:'600', fontSize:'24px', color:'#e59906', paddingBottom:'20px'}}>Đơn hàng của tôi</div>
          <WrapperListOrder>
            {orders?.map((order, index) => {
              const isLastItem = index === 0
              const isCancelable = order.isCancelable;
              console.log('isCancelable ', isCancelable)
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Ngày tạo đơn: </span>
                      {/* Sử dụng format từ thư viện date-fns để định dạng ngày tháng năm và giờ */}
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{format(new Date(order.createdAt), "dd/MM/yyyy")}</span>
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Giờ: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{format(new Date(order.createdAt), "HH:mm:ss")}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                      <span style={{ color: 'rgb(56, 56, 61)', fontWeight: 700 }}>{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {isCancelable && 
                        <WrapperButtonAddComponent
                          onClick={() => handleCanceOrder(order)}
                        
                          styleButton={{
                            width: '100%',
                                  color: '#fff',
                                  border: '1px solid #494949',
                                  fontWeight: '700',
                                  textAlign: 'center',
                                  fontSize: '18px',
                                  borderRadius: '8px',
                                  background: '#494949',
                                  margin:'0 auto 20px', 
                                  display:'block',
                                  height:'auto', 
                          }}
                          textButton={'Hủy đơn hàng'}
                        >
                        </WrapperButtonAddComponent>
                      }

                      <WrapperButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                  
                        styleButton={{
                          width: '100%',
                                color: '#fff',
                                border: '1px solid #9c8350',
                                fontWeight: '700',
                                textAlign: 'center',
                                fontSize: '18px',
                                borderRadius: '8px',
                                background: '#9c8350',
                                margin:'0 auto 20px', 
                                display:'block',
                                height:'auto', 
                        
                                padddingLeft: '10px',
                                transition: '0.2 ease'
                        }}
                        textButton={'Xem chi tiết'}
                
                      >
                      </WrapperButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
