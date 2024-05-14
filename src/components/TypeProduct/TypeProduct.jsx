import React from 'react'
import { WrapperAroundImage, WrapperImageType, WrapperSpanHome } from './style'
import typeimg from '../../assets/img/logo/typeimg.png'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'


const TypeProduct = ({name, type}) => {
  const navigate = useNavigate()

  return (
    <div>
      <WrapperImageType>
        <Image src={typeimg} preview ={false} />
        <WrapperAroundImage>
          <div style={{display:'flex', gap:'10px', fontSize:'30px', color:'#fff', flexDirection:'column'}}>

            <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>
              <WrapperSpanHome onClick={() => (navigate('/'))}>Trang chủ</WrapperSpanHome>
              <span>/</span>
              <span style={{color: '#FFD57E', paddingLeft:'5px'}}>{type}</span>
            </div>

            <span style={{color: '#fff', textAlign:'center'}}>{name}</span>

          </div>
        </WrapperAroundImage>
          
      </WrapperImageType>  
    </div>
  )
}

export default TypeProduct
