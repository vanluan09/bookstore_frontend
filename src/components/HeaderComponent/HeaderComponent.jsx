import React, { useEffect, useState } from 'react'
import Logohope from '../../assets/img/logo/Logohope.png'
import { Badge, Col, Popover } from 'antd'
import { HoverTitleLi, HoverTitleUl, WrapperButton, WrapperButtonComponent, WrapperColHeader, WrapperHeader, WrapperIcon, WrapperListMenu, WrapperMenuHeader, WrapperMenuLi, WrapperMenuUl, WrapperSpanIcon, WrapperTextSign } from './style'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { CustomerServiceOutlined, HomeOutlined, PhoneOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading'
import { searchProduct } from '../../redux/slides/productSlide';
import { logoutUser } from '../../redux/store'




const lists = [
  {
    id: '1',
    name:'Sách',
    element: ['Sách giáo lý', 'Sách thiêng liêng', 'Sách tâm lý', 'Sách thiếu nhi', 'Sách lịch sử', 'Thánh Kinh'],
    path:'/Sach'
  },
  {
    id: '2',
    name:'Đồ phụng tự',
    element: ['Chân đèn', 'Nến', 'Chuông'],
    path:'/Do-phung-tu'
  },
  {
    id: '3',
    name:'Phẩm phục',
    element: ['Áo Alba', 'Khăn thánh', 'Áo rửa tội'],
    path:'/Pham-phuc'
  },
  {
    id: '4',
    name:'Tranh ảnh',
    element: ['Ảnh để bàn', 'Ảnh đeo', 'Ảnh treo tường'],
    path:'/Tranh-anh'
  },
  
  {
    id: '5',
    name:'Đồ lưu niệm',
    element: ['Tràng hạt', 'Sổ tay'],
    path:'/Do-luu-niem'
  }
]


function HeaderComponent(props) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)

  const handleScrollToFooter = () => {
    const footerElement = document.getElementById('footerComponent');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const handleNavigateSignUp = () => {
        navigate('/sign-up')
  }
  const handleNavigateSignIn = () => {
        navigate('/sign-in')
  }
  const handleLogOut = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    dispatch(logoutUser())
    navigate('/sign-in')
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })
    }else {
      handleLogOut()
    }
    setIsOpenPopup(false)
  }

  const handleClickType = (name) => {
      navigate(`/${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: name }, {replace: true})  
    
  }
  const handleClickTypeChild = (type, typeChild) => {
    navigate(`/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}/${typeChild.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: typeChild}, {replace: true})

  }

  
  const {
    textButton = 'Phòng cầu nguyện',
    styleButton = {padding:'0', border: 'none', fontWeight:'600', width:'200px', height:'42px',
    background:'rgb(157,131,81)', borderRadius: '25px' },
    styleIcon = {color:'#fff', fontSize:'30px', cursor:'pointer'},
    textButtonMenu = 'Danh mục sản phẩm',
    styleButtonMenu = {background:'rgb(157,131,81)', width:'auto', height:'40px', border:'none', borderRadius:'0', color:'rgb(255,255,255)', fontSize:'20px', fontWeight:'300', position:'relative'},
     isHiddenSearch = false, 
     isHiddenCart = false,
     isHiddenMenuProductList = false,
     isHiddenPhone = false
  } = props

  const content = (
    <div>
      <WrapperTextSign onClick={handleNavigateSignUp}>Đăng ký</WrapperTextSign>
      <WrapperTextSign onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextSign>
    </div>
  )

  const contentAfter = (
    <div>
      <WrapperTextSign onClick={() => handleClickNavigate('profile')} >{userName?.length ? userName : user?.email}</WrapperTextSign>
      {user?.isAdmin && (

      <WrapperTextSign onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperTextSign>
      )}
      <WrapperTextSign onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperTextSign>
      <WrapperTextSign onClick={() => handleClickNavigate()}>Đăng xuất</WrapperTextSign>
    </div>
  )


  const handleCart = () => {
    if(user?.access_token)
      navigate('/order')
    else 
      navigate('/sign-in')
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/search')
    }
  };



  const onSearch = (e) => {
    setLoading(true)
    if(e.target.value) {
      setSearch(e.target.value)
      dispatch(searchProduct(e.target.value))

    }
    else {
      navigate('/')
      setSearch(e.target.value)
    }
    setLoading(false)
  }
  

  return (
    <div>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>

        {/* Logo */}
        <Col span={7}>
          <Link to ="/">
            <img 
              src={Logohope} alt="logo"
              style={{cursor: 'pointer'}}
            />
          </Link>
        </Col>

        {/* sreachInput */}
        {!isHiddenSearch && (
          <WrapperColHeader span={10}>
            <ButtonInputSearch
              onChange={onSearch}
              onKeyDown = {handleKeyPress}
              search = {search}
            />
          </WrapperColHeader>
        )}

        {/* contract and account */}
        <WrapperColHeader span={7}>

          {!isHiddenPhone && (
            <WrapperButton
              styleButton = {styleButton}
              textButton={textButton}
              onClick={() => navigate('/phong-cau-nguyen')}
              styletextbutton={{
                color:'#fff',
                fontSize:'16px'
              }}
            />
          )}
          {!isHiddenCart && (
            <WrapperIcon onClick={handleCart} style={{cursor: 'pointer'}}>
              <Badge count={order?.orderItems?.length}>
                <ShoppingCartOutlined
                  style={styleIcon}
                />  
              </Badge>
            </WrapperIcon>  
          )}

          <Loading isLoading = {loading}>    
  
            {user?.access_token ? (
              <Popover style={{cursor:'pointer'}} content={contentAfter} trigger="click" placement="bottomRight">
                {userAvatar ? (
                  <img src={userAvatar}  alt="avatar" style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} />
                ) : (
                  <WrapperIcon>
                      <UserOutlined 
                        style={styleIcon}
                      />
                  </WrapperIcon>
                )}
              </Popover>
            ) : (

              <Popover style={{cursor:'pointer'}} content={content} trigger="click" placement="bottomRight" >
                <WrapperIcon>
                    <UserOutlined 
                      style={styleIcon}
                    />
                </WrapperIcon>
              </Popover>
            )}
          </Loading>


        </WrapperColHeader>
      </WrapperHeader>
      
      {!isHiddenMenuProductList && (
        <WrapperMenuHeader>

          <div
            style={{display:'flex', justifyContent:'space-between', width:'100%'}}
          >
            <WrapperButtonComponent>
              
              <ButtonComponent
              
                
                textButton={textButtonMenu}
                style = {styleButtonMenu}
              />

              {
                <WrapperListMenu
                
              
                >
                  {lists.map(list => {
                    return (
                      <div key={list.id}>
                       
                          <HoverTitleUl onClick={() => handleClickType(list.name)}>
                            {list.name}
                          </HoverTitleUl>
                 
                        {list.element.map(ele => {
                          return (
                            
                              <HoverTitleLi key={ele} onClick={() => handleClickTypeChild(list.name, ele)}>
                                {ele}
                              </HoverTitleLi>
                            
                          )
                        })}
                      </div>
                    )
                  })}
                </WrapperListMenu>
              }
            </WrapperButtonComponent>
            
              
            

            <WrapperMenuUl>
              <Link to= "/" style={{color:'rgb(157 131 81)'}}>
                <WrapperMenuLi>
                  <HomeOutlined />
                  <WrapperSpanIcon>Trang chủ</WrapperSpanIcon>
                </WrapperMenuLi>
              </Link>
              

              
              <WrapperMenuLi>
                <PhoneOutlined />
                
                  <WrapperSpanIcon onClick={handleScrollToFooter}>Liên hệ</WrapperSpanIcon>
                
              </WrapperMenuLi>

              <WrapperMenuLi>
                <CustomerServiceOutlined />
                
                  <WrapperSpanIcon onClick={handleScrollToFooter}>Hỗ trợ</WrapperSpanIcon>
                
              </WrapperMenuLi>
            </WrapperMenuUl>
          </div>

          

          
        </WrapperMenuHeader>
      )}
    
    </div>

  )
}

export default HeaderComponent
