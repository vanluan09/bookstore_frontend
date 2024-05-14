import React from 'react'
import { WrapperButtonComponent } from '../HomePage/style';
import { useNavigate } from 'react-router-dom';


function NotFoundPage() {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate('/')
  }
  return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', height:'100vh'}}>
        <div style={{fontSize:'28px', color:'red', marginBottom:'30px'}}>Lỗi đường dẫn</div>
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
          textButton={'Quay trở lại trang chủ'}
          styletextbutton={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}
        />
      </div>
  )
}

export default NotFoundPage
