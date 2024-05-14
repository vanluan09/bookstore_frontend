import React, { useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperButtonComponent, WrapperCreateAccount, WrapperNotAccount, WrapperTitle } from './style';
import * as UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import signUp from '../../assets/img/background/signin_out.png';
import { Helmet } from 'react-helmet';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    }

    const [email, setEmail] = useState('');
    const [previousEmail, setPreviousEmail] = useState('');
    const mutation = useMutationHooks(data => UserService.forgotPassword(data));
    const { data, isLoading } = mutation;
  
    const handleOnchangeEmail = (value) => {
      setEmail(value)
    }
  
    const handleSendMail = () => {
      if (email) {
        setPreviousEmail(email);
        mutation.mutate({email});
      }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover' }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Xác minh mật khẩu</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div style={{ width: '380px', height: '380px', borderRadius: '20px', border: '1px solid rgba(157, 131, 81, 0.6)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                <WrapperTitle>Quên mật khẩu</WrapperTitle>
                <div style={{ margin: '50px 45px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    {data?.status === 'OK' ? (
                        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize:'20px' }}>
                            Vui lòng qua Gmail để xác nhận yêu cầu
                        </div>
                    ) : (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <InputForm style={{ fontSize: '15px', lineHeight: '1.2', width: '100%', height: '45px', borderRadius: '27px', padding: '0 35px 0 35px', background: '#ebebeb' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                            </div>

                            {data?.status === 'ERR' && previousEmail === email && (
                                <span style={{ color: 'red', display: 'block', textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>{data?.message}</span>
                            )}
                            <Loading isLoading={isLoading}>
                                <WrapperButtonComponent
                                    disabled={!email.length}
                                    styleButton={{
                                        display: ' flex',
                                        justifyContent: ' center',
                                        alignItems: ' center',
                                        padding: ' 0px 20px',
                                        height: ' 45px',
                                        fontFamily: ' UbuntuBold',
                                        fontSize: ' 15px',
                                        color: ' rgb(255, 255, 255)',
                                        lineHeight: ' 1.2',
                                        background: ' #e59906',
                                        border: ' none',
                                        borderRadius: ' 27px',
                                        width: ' 80%',
                                        margin: '0 auto 30px',
                                        cursor: 'pointer',
                                        PointerEvent: 'auto'
                                    }}
                                    onClick={handleSendMail}
                                    textButton={'Gửi mã xác minh qua Email'}
                                    styletextbutton={{ color: '#fff' }}
                                />
                            </Loading>
                            <WrapperNotAccount>Bạn chưa có tài khoản?</WrapperNotAccount>
                            <WrapperCreateAccount onClick={handleNavigateSignUp}>TẠO TÀI KHOẢN</WrapperCreateAccount>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
