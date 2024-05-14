import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Select } from 'antd';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { getItemProduct } from '../../utils';
import { WrapperMenu } from './style';
import ChildComponent from './components/ChildComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import usePaginate from '../../hooks/usePaginate';
import './style.css'; 
import { Helmet } from 'react-helmet';


const Books = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  console.log('statebook', state)
  const { paginate, onChange, ChangeSelect, productTypes, options } = usePaginate({
    page: 0,
    limit: 6,
    total: 1,
    sort: '',
    valued: '',
  });

  const [keySelected, setKeySelected] = useState(state);

  useEffect(() => {
    setKeySelected(state);
  }, [state]);

  const handleOnChange = (current, pageSize) => {
    onChange(current, pageSize)
  }

  const handleChangeSelect = (value) => {
    ChangeSelect(value)

  };

  const typeBooks = ['Sách', 'Sách giáo lý', 'Sách thiêng liêng', 'Sách lịch sử', 'Sách thiếu nhi', 'Sách tâm lý', 'Thánh Kinh'];


  

  const items = [
    getItemProduct('SÁCH', 'Sách', [
      getItemProduct('Sách giáo lý', 'Sách giáo lý'),
      getItemProduct('Sách thiêng liêng', 'Sách thiêng liêng'),
      getItemProduct('Sách tâm lý', 'Sách tâm lý'),
      getItemProduct('Sách thiếu nhi', 'Sách thiếu nhi'),
      getItemProduct('Sách lịch sử', 'Sách lịch sử'),
      getItemProduct('Thánh Kinh', 'Thánh Kinh'),
    ], 'Sách'),
  ];





  const handleOnClick = ({ key }) => {
    setKeySelected(key);
    navigate(`/${typeBooks[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,{ state: key }, {replace: false})

  };




  const renderPage = (key) => {
    switch (key) {
      case 'Sách giáo lý':
        return <ChildComponent product={productTypes['Sách giáo lý']} />;
      case 'Sách thiêng liêng':
        return <ChildComponent product={productTypes['Sách thiêng liêng']} />;
      case 'Sách tâm lý':
        return <ChildComponent product={productTypes['Sách tâm lý']} />;
      case 'Sách thiếu nhi':
        return <ChildComponent product={productTypes['Sách thiếu nhi']} />;
      case 'Sách lịch sử':
        return <ChildComponent product={productTypes['Sách lịch sử']} />;
      case 'Thánh Kinh':
        return <ChildComponent product={productTypes['Thánh Kinh']} />;
      case 'Sách':
      default:
        return <ChildComponent product={productTypes['Sách']} />;
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{keySelected}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <TypeProduct name={keySelected} type={keySelected} />
      <div style={{ padding: '40px 100px' }}>
        <Row>
          <Col span={6}>
            <WrapperMenu
              onClick={handleOnClick}
              mode="inline"
              defaultOpenKeys={['Sách']}
              selectedKeys={[keySelected]}
              style={{
                width: 256,
              }}
              items={items}
            />
          </Col>

          <Col span={18}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
              <Select
                defaultValue="New"
                labelInValue
                style={{
                  width: 300,
                  fontSize:16,
                  height:45,
                  marginBottom: 20
                }}
                onChange={handleChangeSelect}
                options={options}
              />
            </div>
            {renderPage(keySelected)}
            <Pagination defaultPageSize={paginate.limit} defaultCurrent={paginate.page + 1} total={paginate?.total} onChange={handleOnChange} style={{ textAlign: 'center', marginTop: '20px' }} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Books;
