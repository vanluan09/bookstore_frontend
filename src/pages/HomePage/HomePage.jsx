import React, { useEffect, useMemo, useState } from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/img/slider/slider1.png'
import slider2 from '../../assets/img/slider/slider2.png'
import icon1 from '../../assets/img/icon/icon1.png'
import icon2 from '../../assets/img/icon/icon2.png'
import icon3 from '../../assets/img/icon/icon3.png'
import icon4 from '../../assets/img/icon/icon4.png'
import icon5 from '../../assets/img/icon/icon5.png'
import MenuIconComponent from '../../components/MenuIconComponent/MenuIconComponent'
import TitleComponent from '../../components/TitleComponent/TitleComponent'
import {  WrapperButtonComponent, WrapperGoodBook} from './style'
import SliderCardComponent from '../../components/SliderCardComponent/SliderCardComponent'
import * as ProductService from '../../services/ProductService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartAndUpdate } from '../../redux/actions/orderActions'
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'



const HomePage = () => {


  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [productTypes, setProductTypes] = useState({});
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const type = ['Sách', 'Sách giáo lý', 'Sách thiêng liêng', 'Sách tâm lý', 'Tranh ảnh', 'Phẩm phục', 'Đồ lưu niệm', 'Đồ phụng tự']; 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const promises = type.map(async (t) => {
        const res = await ProductService.getProductType(t, limit);
        return { type: t, data: res?.status === 'OK' ? res.data : [] };
      });
  
      const results = await Promise.all(promises);
      const updatedProductTypes = results.reduce((acc, curr) => {
        acc[curr.type] = curr.data;

        return acc;
      }, {});
  
      setProductTypes(updatedProductTypes);
      setLoading(false);
    };
  
    fetchData();
  }, [limit]);


  useEffect(() => {
    if (user?.id && user?.access_token) {
      dispatch(fetchCartAndUpdate(user?.id, user?.access_token));
    }
  }, [dispatch, user?.id, user?.access_token]);
  

  const memoizedProductTypes = useMemo(() => productTypes, [productTypes]);

  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang chủ - Nhà sách hy vọng</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{padding:'0 100px'}}>
        <SliderComponent arrImage={[slider1, slider2]}/>
      </div>

      <MenuIconComponent 
        arrButtonIcon={[
          {icon: icon1, text: 'Sách'}, 
          {icon: icon2, text: 'Tranh ảnh'}, 
          {icon: icon3, text: 'Tràng hạt'}, 
          {icon: icon4, text: 'Nến'},
          {icon: icon5, text: 'Chân đèn'},
        ]}
        style = {{padding:'0 100px'}}
      /> 



      {/* Sách hay nên đọc */}
      <WrapperGoodBook >

        <TitleComponent 
          text={'SÁCH MỚI CHO BẠN'}
        />

        <div>
          <SliderCardComponent
            products={memoizedProductTypes['Sách']} 
          />
        </div>
        

        <WrapperButtonComponent
          onClick={() => {
            navigate('/Sach', { state: 'Sách' });
            window.scrollTo(0, 0);
          }}
          textButton={'Xem thêm'}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </WrapperGoodBook>

      {/* sách giáo lý */}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'SÁCH GIÁO LÝ'}
        />

        <div >

          <SliderCardComponent
            products={memoizedProductTypes['Sách giáo lý']} 
          />
        </div>

        <WrapperButtonComponent
          textButton={'Xem thêm'}
          onClick = {() => {navigate('/Sach/Sach_giao_ly', {state: 'Sách giáo lý'})
          window.scrollTo(0, 0)
         }}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>

      {/* sách thiêng liêng*/}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'SÁCH THIÊNG LIÊNG'}
        />

        <div >

          <SliderCardComponent
            products={memoizedProductTypes['Sách thiêng liêng']} 
          />
        </div>

        <WrapperButtonComponent
          textButton={'Xem thêm'}
          onClick={() => {
            navigate('/Sach/Sach_thieng_lieng', {state: 'Sách thiêng liêng'})
            window.scrollTo(0, 0)
          
          }}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>

      {/*sách tâm lý*/}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'SÁCH TÂM LÝ'}
        />

        <div >

          <SliderCardComponent
            products={memoizedProductTypes['Sách tâm lý']} 
          />
        </div>

        <WrapperButtonComponent
          onClick = {() => {
            navigate('/Sach/Sach_tam_ly', {state: 'Sách tâm lý'}) 
            window.scrollTo(0, 0)
          }}
          textButton={'Xem thêm'}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>

      {/* tranh ảnh*/}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'TRANH ẢNH'}
        />

        <div >

          <SliderCardComponent
            products={memoizedProductTypes['Tranh ảnh']} 
          />
        </div>

        <WrapperButtonComponent
          textButton={'Xem thêm'}
          onClick = {() => {
            navigate('/Tranh_anh', {state: 'Tranh ảnh'}) 
            window.scrollTo(0, 0)}}

          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>

      

      {/* Đồ phụng tự */}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'ĐỒ PHỤNG TỰ'}
        />

        <div  >

          <SliderCardComponent
            products={memoizedProductTypes['Đồ phụng tự']} 
          />
        </div>

        <WrapperButtonComponent
          textButton={'Xem thêm'}
          onClick = {() => {navigate('/Do_phung_tu', {state: 'Đồ phụng tự'})
          window.scrollTo(0, 0)}}

          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>



      {/* phẩm phục */}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'PHẨM PHỤC'}
        />

        <div  >

          <SliderCardComponent
            products={memoizedProductTypes['Phẩm phục']} 
          />
        </div>

        <WrapperButtonComponent
          textButton={'Xem thêm'}
          onClick = {() => {navigate('/Pham_phuc', {state: 'Phẩm phục'})
          window.scrollTo(0, 0)}}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>



      {/* Đồ lưu niệm */}
      <div 
        style={{
          margin: '40px 100px 0'
        }}
      >
        <TitleComponent 
          text={'ĐỒ LƯU NIỆM'}
        />

        <div  >

          <SliderCardComponent
            products={memoizedProductTypes['Đồ lưu niệm']} 
          />
        </div>

        <WrapperButtonComponent
          onClick = {() => {navigate('/Đo_luu_niem', {state: 'Đồ lưu niệm'})
          window.scrollTo(0, 0)}}
          textButton={'Xem thêm'}
          styletextbutton={{fontSize:'24px', color:'#fff'}}
          styleButton={{margin:'0 auto 20px', display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px'}}
        />
      </div>
      
    </div>
  )
}

export default HomePage
