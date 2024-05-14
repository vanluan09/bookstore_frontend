import { Col, Image, Row } from 'antd'
import Logo from '../../assets/img/logo/Logo.png'
import React from 'react'
import BackgroundImage from '../../assets/img/logo/backgroundimage.png'
import { WrapperAroundImage, WrapperHover, WrapperImageType, WrapperSpan, WrapperSpanHover, WrapperText } from './style'
import {FacebookOutlined, InstagramOutlined, YoutubeOutlined} from '@ant-design/icons'

const FooterComponent = () => {
  return (
    <WrapperImageType id='footerComponent'>
        <Image src={BackgroundImage} preview ={false} />
        <WrapperAroundImage>
            <Row style={{padding: '30px 100px'}}>
                <Col span={6}>
                    <img 
                        src={Logo} alt="logo"
                        width={200}
                        style={{marginBottom:'15px'}}
                    />
                    <div style={{display:'flex', flexDirection:'column', gap:'30px'}}>
                        <WrapperText>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 15" fill="none">
                                        <path d="M6.12974 0.164062C3.16706 0.164062 0.75676 2.57437 0.75676 5.53702C0.75676 9.21376 5.56505 14.6114 5.76977 14.8394C5.96205 15.0536 6.29777 15.0532 6.48971 14.8394C6.69443 14.6114 11.5027 9.21376 11.5027 5.53702C11.5027 2.57437 9.09239 0.164062 6.12974 0.164062ZM6.12974 8.2403C4.63914 8.2403 3.42649 7.02761 3.42649 5.53702C3.42649 4.04642 4.63917 2.83376 6.12974 2.83376C7.62031 2.83376 8.83296 4.04645 8.83296 5.53705C8.83296 7.02764 7.62031 8.2403 6.12974 8.2403Z" fill="#9C8350"></path>
                            </svg>
                            <WrapperSpan><span style={{fontWeight:'600', color:'rgb(255, 213, 126)'}}>Địa chỉ:</span>  Số 116, khu 2, Thị trấn Trạm Trôi, Huyện Hoài Đức , TP Hà Nội</WrapperSpan>
                        </WrapperText>

                        <WrapperText>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path d="M11.7337 9.69307C11.1397 10.5089 10.1774 11.0403 9.09323 11.0403H7.57198C7.04647 11.0403 6.59895 10.7067 6.42949 10.2397C6.22032 10.1773 6.01519 10.0963 5.81503 9.99688C5.39114 9.78627 5.00624 9.50093 4.66742 9.14746C2.46964 9.63029 0.824745 11.5886 0.824745 13.9315V14.2377C0.824745 14.6586 1.16601 14.9999 1.58697 14.9999H13.413C13.8339 14.9999 14.1752 14.6586 14.1752 14.2377V13.9315C14.1752 12.1216 13.1935 10.5412 11.7337 9.69307Z" fill="#9C8350"></path>
                                        <path d="M3.85729 7.57649C4.18489 7.57649 4.47003 7.39492 4.61775 7.12698C4.62164 7.13759 4.62559 7.14813 4.62957 7.15867C4.63074 7.16183 4.63192 7.165 4.63309 7.16816C4.97965 8.08037 5.65396 8.84507 6.54312 9.17919C6.75817 8.8375 7.13843 8.61025 7.57202 8.61025H9.09327C9.24501 8.61025 9.38624 8.56743 9.51005 8.49822C9.71798 8.38195 9.90496 8.08699 10.0015 7.93065C10.156 7.68046 10.2758 7.41545 10.3819 7.12652C10.4416 7.23486 10.5236 7.32911 10.6219 7.40295V7.77597C10.6219 8.61886 9.93616 9.30463 9.09323 9.30463H7.57198C7.2844 9.30463 7.05124 9.53779 7.05124 9.82537C7.05124 10.113 7.2844 10.3461 7.57198 10.3461H9.09323C10.5104 10.3461 11.6634 9.19316 11.6634 7.77597V7.40295C11.8742 7.24459 12.0106 6.99254 12.0106 6.7086V5.13837V4.53624C12.0106 4.24647 11.8684 3.99008 11.6502 3.83243C11.481 1.69087 9.68427 0 7.49996 0C5.31563 0 3.51893 1.69087 3.3497 3.8324C3.13149 3.99004 2.98937 4.24647 2.98937 4.53621V6.70854C2.98937 7.18924 3.37988 7.57649 3.85729 7.57649ZM7.49996 1.04152C9.11696 1.04152 10.4507 2.27724 10.6066 3.85393C10.5042 3.93444 10.4204 4.03733 10.3626 4.15539C9.87125 2.8734 8.77435 1.98084 7.49993 1.98084C6.19804 1.98084 5.11872 2.90407 4.63916 4.15027C4.63851 4.15196 4.63789 4.15369 4.63724 4.15542C4.57948 4.03736 4.49564 3.93447 4.39331 3.85397C4.54929 2.27724 5.88297 1.04152 7.49996 1.04152Z" fill="#9C8350"></path>
                            </svg>
                            <WrapperSpan>
                                <span style={{fontWeight:'600', color:'rgb(255, 213, 126)'}}>Điện thoại:</span> 0349336615
                            </WrapperSpan>
                        </WrapperText>

                        <WrapperText>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <g clipPath="url(#clipm)">
                                        <path d="M13.6606 13.3928C13.9978 13.3928 14.29 13.2814 14.5383 13.0616L10.2886 8.81169C10.1866 8.8847 10.0878 8.9557 9.99443 9.02321C9.6764 9.25753 9.41828 9.44037 9.22008 9.57139C9.0219 9.70271 8.75823 9.83656 8.42909 9.97322C8.09973 10.11 7.79289 10.1782 7.50824 10.1782H7.49991H7.49158C7.20691 10.1782 6.90007 10.1101 6.57073 9.97322C6.2414 9.83656 5.97773 9.70271 5.77974 9.57139C5.58156 9.44037 5.32358 9.25756 5.00539 9.02321C4.91671 8.95821 4.81837 8.88688 4.71205 8.81055L0.461494 13.0616C0.709836 13.2814 1.00219 13.3928 1.33934 13.3928H13.6606Z" fill="#9C8350"></path>
                                        <path d="M0.845514 6.13556C0.52751 5.92354 0.245509 5.68073 0 5.40723V11.8731L3.7457 8.1274C2.99635 7.60425 2.03085 6.94106 0.845514 6.13556Z" fill="#9C8350"></path>
                                        <path d="M14.163 6.13556C13.0228 6.90724 12.0538 7.57157 11.2558 8.1289L15 11.8733V5.40723C14.7599 5.67523 14.481 5.91788 14.163 6.13556Z" fill="#9C8350"></path>
                                        <path d="M13.6607 1.60693H1.33942C0.909571 1.60693 0.579094 1.75209 0.347583 2.0421C0.115881 2.33224 0.000221252 2.6951 0.000221252 3.13026C0.000221252 3.48176 0.153709 3.86262 0.460547 4.27294C0.767386 4.68311 1.09389 5.00528 1.43989 5.23962C1.62957 5.37363 2.20158 5.7713 3.15592 6.43247C3.67109 6.78947 4.11911 7.10064 4.50411 7.36916C4.83227 7.59781 5.11528 7.79582 5.34894 7.96015C5.37576 7.97897 5.41795 8.00914 5.47394 8.04918C5.53426 8.0925 5.6106 8.14749 5.70477 8.21549C5.88612 8.34665 6.03677 8.45267 6.15676 8.53366C6.27659 8.61468 6.42177 8.70517 6.59209 8.80566C6.76227 8.90602 6.92278 8.98148 7.07344 9.03167C7.22412 9.08184 7.36361 9.107 7.49193 9.107H7.50027H7.5086C7.6369 9.107 7.77641 9.08184 7.92712 9.03167C8.07775 8.98148 8.23813 8.90618 8.40845 8.80566C8.5786 8.70517 8.72359 8.61449 8.8438 8.53366C8.96379 8.45267 9.11444 8.34667 9.29582 8.21549C9.3898 8.14749 9.46614 8.09248 9.52646 8.04931C9.58248 8.00912 9.62464 7.97913 9.65162 7.96015C9.83365 7.83349 10.1173 7.63629 10.4987 7.37147C11.1927 6.88931 12.2147 6.17963 13.569 5.23962C13.9764 4.95511 14.3167 4.61178 14.5902 4.21012C14.8632 3.80845 15.0001 3.38712 15.0001 2.94627C15.0001 2.57794 14.8674 2.26277 14.6025 2.00027C14.3374 1.73809 14.0234 1.60693 13.6607 1.60693Z" fill="#9C8350"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clipm">
                                            <rect width="15" height="15" fill="white"></rect>
                                        </clipPath>
                                    </defs>
                            </svg>
                            <WrapperSpan><span style={{fontWeight:'600', color:'rgb(255, 213, 126)'}}>Email:</span>  Jnluan09@gmail.com</WrapperSpan>
                        </WrapperText>
                    </div>
                    

                </Col>

                <Col span={6} style={{display:'flex', justifyContent:'end'}}>
                    <div>
                        <div style={{fontWeight:'800', color:'rgb(255, 213, 126)', marginBottom:'30px' ,marginTop:'15px'}}>THỜI GIAN LÀM VIỆC</div>
                        <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                            <WrapperSpan>Từ thứ 2 đến Chủ Nhật</WrapperSpan>
                            <WrapperSpan>Sáng: 8:00 - 11:00</WrapperSpan>
                            <WrapperSpan>Chiều: 13:30 - 17:00</WrapperSpan>
                            
                        </div>
                    </div>
                    
                </Col>

                <Col span={6} style={{display:'flex', justifyContent:'end'}}>
                    <div>
                        <div style={{fontWeight:'800', color:'rgb(255, 213, 126)', marginBottom:'30px' ,marginTop:'15px'}}>HỖ TRỢ KHÁCH HÀNG</div>
                        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                            <WrapperSpanHover>Hướng dẫn mua hàng</WrapperSpanHover>
                            <WrapperSpanHover>Chính sách bảo mật</WrapperSpanHover>
                            <WrapperSpanHover>Chính sách vận chuyển</WrapperSpanHover>
                            <WrapperSpanHover>Chính sách đổi - Trả - Hoàn tiền</WrapperSpanHover>
                            
                        </div>
                    </div>
                    
                </Col>

                <Col span={6} style={{display:'flex', justifyContent:'end'}}>
                    <div>
                        <div style={{fontWeight:'800', color:'rgb(255, 213, 126)', marginBottom:'30px' ,marginTop:'15px'}}>THEO DÕI CHÚNG TÔI TRÊN</div>
                        <div style={{fontSize: '40px', display:'flex', justifyContent:'space-around', color:'#e59906'}}>
                            <WrapperHover><FacebookOutlined /></WrapperHover>
                            <WrapperHover><InstagramOutlined /></WrapperHover>
                            <WrapperHover><YoutubeOutlined /></WrapperHover>
                        </div>
                    </div>
                    
                </Col>
            </Row>
            <div style={{margin: '0 100px',borderTop:'1px solid rgba(255, 255, 255, 0.8)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', padding: '25px', fontStyle:'italic', fontSize:'16px'}}>
                @ Bản quyền thuộc về Nhà sách Hy Vọng
            </div>
        </WrapperAroundImage>
        
    </WrapperImageType>
  )
}

export default FooterComponent
