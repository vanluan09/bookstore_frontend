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


const Clothes = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const { paginate, onChange, ChangeSelect, loading, productTypes, options } = usePaginate({
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

  const typeClothes = ['Phẩm phục', 'Áo Alba', 'Khăn Thánh', 'Áo rửa tội']; 

  const items = [
    getItemProduct('PHẨM PHỤC', 'Phẩm phục',  [
      getItemProduct('Áo Alba', 'Áo Alba'),
      getItemProduct('Khăn Thánh', 'Khăn Thánh'),
      getItemProduct('Áo rửa tội', 'Áo rửa tội'),
    ]),

  ];


  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
    navigate(`/${typeClothes[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,{ state: key }, {replace: true})
  }


  const renderPage = (key) => {
    switch (key) {
      case 'Áo Alba':
        return (
          <ChildComponent  product={productTypes['Áo Alba']} />
        )
      case 'Khăn Thánh':
        return (
          <ChildComponent product={productTypes['Khăn Thánh']}/>
        )
      case 'Áo rửa tội':
        return (
          <ChildComponent product={productTypes['Áo rửa tội']}/>
        )
      
      default:
        return (
          <ChildComponent  product={productTypes['Phẩm phục']} />
        )
    }
  }



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{keySelected}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <TypeProduct name={keySelected} type={keySelected}/>

      <div style={{padding: "40px 100px"}}>
        <Row>
          <Col span={6}>
            <WrapperMenu
              onClick={handleOnCLick}
              mode="inline"
              defaultOpenKeys={['Phẩm phục']}
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
    
  )
}

export default Clothes
