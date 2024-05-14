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

const Pictures = () => {
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

  const items = [
    getItemProduct('TRANH ẢNH', 'Tranh ảnh',  [
      getItemProduct('Ảnh để bàn', 'Ảnh để bàn'),
      getItemProduct('Ảnh đeo', 'Ảnh đeo'),
      getItemProduct('Ảnh treo tường', 'Ảnh treo tường'),
    ]),
  ];
  
  const typeLiturgical = ['Tranh ảnh', 'Ảnh để bàn', 'Ảnh đeo', 'Ảnh treo tường']; 

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
    navigate(`/${typeLiturgical[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,{ state: key }, {replace: true})
  }


  const renderPage = (key) => {
    switch (key) {
      case 'Ảnh để bàn':
        return (
          <ChildComponent  product={productTypes['Ảnh để bàn']} />
        )
      case 'Ảnh đeo':
        return (
          <ChildComponent product={productTypes['Ảnh đeo']}/>
        )
      case 'Ảnh treo tường':
        return (
          <ChildComponent product={productTypes['Ảnh treo tường']}/>
        )
      
      default:
        return (
          <ChildComponent  product={productTypes['Tranh ảnh']} />
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
              defaultOpenKeys={['Tranh ảnh']}
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

export default Pictures
