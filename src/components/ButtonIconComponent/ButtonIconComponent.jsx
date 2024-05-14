import { Button, Image } from 'antd'
import React from 'react'
import { WrapperButtonIcon } from './style'
import { useNavigate } from 'react-router-dom'


const ButtonIconComponent = ({size, stylebutton, textbutton, styletextbutton, imgicon, styleimage, ...rest}) => {

  const navigate = useNavigate()
  const handleClickNavigate = (key) => {
    if(key === 'Sách' || key === 'Tranh ảnh') {
      navigate(`/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: key }, {replace: true})
      window.scrollTo(0, 0)
    }
    else if(key === 'Tràng hạt') {
      navigate(`Đo_luu_niem/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: key }, {replace: true})
      window.scrollTo(0, 0)
    }
    else if(key === 'Nến') {
      navigate(`Đo_phung_tu/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: key }, {replace: true})
      window.scrollTo(0, 0)
    }
    else if(key === 'Chân đèn') {
      navigate(`Đo_phung_tu/${key.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: key }, {replace: true}) 
      window.scrollTo(0, 0)
    }
    else if(key === 'Phòng cầu nguyện với Đức Maria') {
      navigate('maria', {state: key}, {replace: true}) 
      window.scrollTo(0, 0)
    }
    else if(key === 'Phòng cầu nguyện với Thánh giá') {
      navigate('Thanh_gia', {state: key}, {replace: true}) 
      window.scrollTo(0, 0)
    }
    else if(key === 'Phòng cầu nguyện với Thánh Thể') {
      navigate('body_of_Chirst', {state: key}, {replace: true}) 
      window.scrollTo(0, 0)
    }
  }
  return (
      <WrapperButtonIcon
        size={size}
        style={stylebutton}
        onClick={() => handleClickNavigate(textbutton)}
        {...rest}
      >
        <Image src={imgicon} preview={false} style={styleimage}/>
        <span style={styletextbutton}>{textbutton}</span>
      </WrapperButtonIcon>
  )
}

export default ButtonIconComponent
