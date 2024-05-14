import React from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { SearchOutlined } from '@ant-design/icons'
import { WrapperHover } from './style'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ButtonInputSearch = (props) => {

    const {
        size = 'large',
        variant,
        placeholder = 'Tìm kiếm sản phẩm ...', 
        style = {
          background: '#fff', 
          width:'320px', 
          height:'42px', 
          border:'none',                          
          borderBottomLeftRadius:'25px',
          borderTopLeftRadius:'25px',
          borderTopRightRadius:'inherit',
          borderBottomRightRadius:'inherit',
          appearance:'none'},
        styleSearch = {
          width: '42px',
          height: '42px',
          fontSize:'16px',
          background:'#fff',
          display:'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomRightRadius: '25px',
          borderTopRightRadius: '25px',
          cursor: 'pointer'
        }, search
    } = props

  const navigate = useNavigate()
  const handleClickSearch = () => {
    if(search?.length > 0)
    navigate('/search')
  };

  return (
    <div style={{display:'flex'}}>
      <InputComponent
        placeholder={placeholder}
        variant={variant}
        size={size}
        style = {style}
        {...props}
      />

      <WrapperHover
        style={styleSearch}
        onClick = {handleClickSearch}
      />
      
    </div>
  )
}

export default ButtonInputSearch
