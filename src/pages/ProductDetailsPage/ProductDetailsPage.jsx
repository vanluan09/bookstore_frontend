import React, { useEffect, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import service_1 from '../../assets/img/logo/service_1.webp'
import service_2 from '../../assets/img/logo/service_2.webp'
import service_3 from '../../assets/img/logo/service_3.webp'
import service_4 from '../../assets/img/logo/service_4.webp'
import { addOrderProduct, resetOrder} from '../../redux/slides/orderSlide'
import { convertPrice } from '../../utils';
import { Col, Image, Row } from 'antd'
import { WrapperAfter, WrapperButtonAddComponent, WrapperButtonComponent, WrapperColEnd, WrapperInputNumber, WrapperName, WrapperPrice, WrapperSpanDescription, WrapperStatus } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import * as message from '../../components/Message/Message'
import { createCartAndAddToOrder } from '../../redux/actions/orderActions'
import Loading from '../../components/LoadingComponent/Loading'
import SliderCardComponent from '../../components/SliderCardComponent/SliderCardComponent'
import { Helmet } from 'react-helmet'



const ProductDetailsPage = () => {
  const {id} = useParams()
  const [productType, setProductType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [productDetails, setProductDetails] = useState('')
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const [errorLimitOrder,setErrorLimitOrder] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [pdfUrl, setPdfUrl] = useState('');


  useEffect(() => {
      const fetchGetDetailsProduct = async () => {
          setLoading(true)
          const res = await ProductService.getDetailsProduct(id)
          setProductDetails(res.data)
          setNumProduct(1)
          setLoading(false)
          return res.data
        }
        fetchGetDetailsProduct()
  }, [id])

  
  const name = productDetails?.name
  const typeNear = productDetails?.type?.[1]

  const onChange = (value) => {
    setNumProduct(Number(value))
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await ProductService.getProductType(typeNear, limit);
      if (res?.status === 'OK') {
        setProductType(res.data);
      }
    };
    
    fetchData();
  }, [typeNear, limit]);
  
  useEffect(() => {
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
      if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
          setErrorLimitOrder(false)
      } else if(productDetails?.countInStock === 0){
          setErrorLimitOrder(true)
      }
  },[numProduct])
  
  useEffect(() => {
      if(order?.isSuccessOrder) {
          message.success('Đã thêm vào giỏ hàng')
      }
      return () => {
          dispatch(resetOrder())
      }
  }, [order?.isSuccessOrder])
  
  const handleChangeCount = (type, limited) => {
      if(type === 'increase') {
          if(!limited) {
              setNumProduct(numProduct + 1)
          }
      }else {
          if(!limited) {
              setNumProduct(numProduct - 1)
          }
      }
  }
  
  const handleAddOrderProduct = () => {
      if(!user?.id) {
          navigate('/sign-in', {state: location?.pathname})
      }else {
      
          const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
          if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
              const cartData = {
                  userId: user.id,
                  items: {
                      name: productDetails?.name,
                      amount: numProduct,
                      image: productDetails?.image,
                      price: productDetails?.price,
                      product: productDetails?._id,
                      countInStock: productDetails?.countInStock
                  }
              }
              dispatch(addOrderProduct({
                  userId: user.id, 
                  orderItem: cartData.items
              }))
              dispatch(createCartAndAddToOrder({ data: cartData, accessToken: user.access_token }));
  
  
          } else {
              setErrorLimitOrder(true)
          }
      }
  }
  
  const handlePaymentProduct = () => {
      if(!user?.id) {
          navigate('/sign-in', {state: location?.pathname})
      }else {
      
          const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
          if((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
              const cartData = {
                  userId: user.id,
                  items: {
                      name: productDetails?.name,
                      amount: numProduct,
                      image: productDetails?.image,
                      price: productDetails?.price,
                      product: productDetails?._id,
                      countInStock: productDetails?.countInStock
                  }
              }
              dispatch(addOrderProduct({
                  userId: user.id, 
                  orderItem: cartData.items
              }))
              dispatch(createCartAndAddToOrder({ data: cartData, accessToken: user.access_token }));
              navigate('/order', { state: id})
          } else {
              setErrorLimitOrder(true)
          }
      }
  }
  


useEffect(() => {
    // Kiểm tra xem productDetails và productDetails.pdfBook có tồn tại không
    if (productDetails && productDetails.pdfBook) {
        const fetchPdf = async () => {
            try {
                const response = await ProductService.getPdfBookProduct(id);

                const blob = new Blob([response], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("PDF not found for product:", id);
                    setPdfUrl(null); // Set pdfUrl to null if PDF is not found
                } else {
                    console.error("Error fetching PDF:", error);
                }
            }
        };

        fetchPdf();
    }
}, [id, productDetails]); 





  return (
    <Loading isLoading={loading}>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{name}</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
      <TypeProduct type={typeNear} name={name}/>

      <div style={{padding: '0 100px', marginTop:'40px', marginBottom:'50px'}}>
        <Row>
          <Col span={8}>
              <Image src= {productDetails?.image} preview = {false} width="80%" alt='big image'/>
          </Col>

          <Col span={10} style={{padding:'0 auto'}}>
              
              <WrapperName>{productDetails?.name}</WrapperName>
              <div style={{fontWeight: '600',fontSize: '24px',color: '#494949', marginBottom:'15px'}}>Giá:
                  <WrapperPrice>{convertPrice(productDetails?.price*numProduct)}</WrapperPrice>
              </div>
              <div style={{fontSize:'16px', marginBottom:'20px'}}>Tình trạng :
                  <WrapperStatus>Còn hàng</WrapperStatus>
              </div>
              <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
                  <span style={{fontSize:'16px', display:'block', paddingRight:'20px'}}>Số lượng :</span>
                  <div style={{border:'1px solid #ccc', width:'150px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <MinusOutlined style={{fontSize:'16px' }}
                          onClick={() => handleChangeCount('decrease', numProduct === 1)}
                      />
                      <WrapperInputNumber 
                          onChange={onChange} 
                          defaultValue={1} 
                          max={productDetails?.countInStock} 
                          min={1} 
                          value={numProduct}
                      />
                      <PlusOutlined style={{fontSize:'16px' }}
                          onClick={() => handleChangeCount('increase',  numProduct === productDetails?.countInStock)}
                      />
                  </div>
              </div>

              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                  <WrapperButtonAddComponent
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
                      onClick={handleAddOrderProduct}
                      textButton={'Thêm vào giỏ hàng'}
                  />
                  <WrapperButtonComponent
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
                      onClick={handlePaymentProduct}
                      textButton={'Thanh toán'}
                  />
              </div>
              
          </Col>

          <WrapperColEnd span={6}>
              <div style={{display:'flex', alignItems:'center',gap:'10px'}}>
                  <Image src={service_1} preview={false}/>
                  <div>
                      <h3 style={{padding:'0', margin:'0'}}>GIAO HÀNG FREE TẠI HÀ NỘI</h3>
                      <span style={{fontStyle:'italic'}}>Trong vòng bán kính 10km</span>
                  </div>            
              </div>
              <div style={{display:'flex', alignItems:'center',gap:'10px'}}>
                  <Image src={service_2} preview={false}/>
                  <div>
                      <h3 style={{padding:'0', margin:'0'}}>HỖ TRỢ TRẢ HÀNG TRONG 24H</h3>
                      <span style={{fontStyle:'italic'}}>Hỗ trợ trả hàng khi sản phẩm có lỗi</span>
                  </div>            
              </div>
              <div style={{display:'flex', alignItems:'center',gap:'10px'}}>
                  <Image src={service_3} preview={false}/>
                  <div>
                      <h3 style={{padding:'0', margin:'0'}}>KIỂM TRA HÀNG KHI NHẬN HÀNG</h3>
                      <span style={{fontStyle:'italic'}}>Khách hàng kiểm tra hàng trước khi nhận</span>
                  </div>            
              </div>
              <div style={{display:'flex', alignItems:'center',gap:'10px'}}>
                  <Image src={service_4} preview={false}/>
                  <div>
                      <h3 style={{padding:'0', margin:'0'}}>THANH TOÁN COD</h3>
                      <span style={{fontStyle:'italic'}}>Hỗ trợ khách hàng thanh toán COD</span>
                  </div>            
              </div>
          </WrapperColEnd>
        </Row>

        <div style={{marginBottom:'50px'}}>
          <div style={{fontWeight: '600',fontSize: '24px',textTransform: 'uppercase',marginBottom:'16px',color:'#9c8350'}}>THÔNG TIN CHI TIẾT SẢN PHẨM</div>
          {productDetails?.description?.map(desc => {
              return (
                  <WrapperSpanDescription key={desc}>{desc}</WrapperSpanDescription>
              )
          })}
        </div>

        {/* Giới thiệu */}
        {productDetails?.pdfBook && pdfUrl &&
            <div style={{paddingBottom:'40px'}}>
                <WrapperAfter>
                <span style={{fontWeight: '600',fontSize: '24px',textTransform: 'uppercase',marginBottom: '16px',color: '#9c8350',position: 'relative',zIndex: '9', background:'#fff', paddingRight:'10px'}}>GIỚI THIỆU SÁCH</span>
                </WrapperAfter>


                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {pdfUrl ? (
                    <iframe src={pdfUrl} type="application/pdf" width="1000" height="560" allow="autoplay"></iframe>
                    ) : (
                    <p>Loading...</p>
                    )}
                </div>

            </div>
        }


        <div>
          <WrapperAfter>
              <span style={{fontWeight: '600',fontSize: '24px',textTransform: 'uppercase',marginBottom: '16px',color: '#9c8350',position: 'relative',zIndex: '9', background:'#fff', paddingRight:'10px'}}>SẢN PHẨM LIÊN QUAN</span>
          </WrapperAfter>


          <SliderCardComponent
              products={productType}
          />

        </div>
      </div>
    </Loading>
  )
}

export default ProductDetailsPage
