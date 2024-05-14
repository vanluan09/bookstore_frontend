import React, { useEffect, useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperButtonComponent, WrapperCreateAccount, WrapperForgetPassword, WrapperNotAccount, WrapperTitle } from './style';
import * as UserService from '../../services/UserService';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import Loading from '../../components/LoadingComponent/Loading';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import signUp from '../../assets/img/background/signin_out.png';
import { updateUserPersistKey } from '../../redux/store';
import { Helmet } from 'react-helmet';

const SignInPage = () => {
    const navigate = useNavigate();

    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    }

    const handleResetPassword = () => {
        navigate('/forgotPassword');
    }

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [previousEmail, setPreviousEmail] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        setPreviousEmail(email);
        setPreviousPassword(password);
        if (email && password) {
            setIsLoading(true);
            try {
                const response = await UserService.loginUser({ email, password });

                setError(response.message)
                if (response.access_token) {
                    if (location.state) {
                        navigate(location.state);
                    } else {
                        if(email === "admin@gmail.com") {
                            navigate('/system/admin', {state: response.access_token});
                            updateUserPersistKey(response.userId);

                        }
                        else {
                            navigate('/');
                            updateUserPersistKey(response.userId);
                            navigate(0);
                        }
                    }

                    localStorage.setItem('access_token', JSON.stringify(response.access_token));
                    localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token));
                    localStorage.setItem('id', JSON.stringify(response.userId));

                    const decoded = jwt_decode(response.access_token);
                    if (decoded.id) {
                        await handleGetDetailsUser(decoded.id, response.access_token);
                    }
                }
            } catch (error) {
                setError(error.response.message);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token');
        const refreshToken = JSON.parse(storage);
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    }

    const handleOnchangePassword = (value) => {
        setPassword(value);
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }

    const TouchSignIn = (e) => {
        if(e.key === "Enter") {
            setPreviousEmail(email);
            setPreviousPassword(password);
            if (email && password) {
                handleSignIn();
            }
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover' }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Đăng nhập</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div style={{ width: '432px', height: '550px', borderRadius: '20px', border: '1px solid rgba(157, 131, 81, 0.6)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                <WrapperTitle>Đăng nhập</WrapperTitle>
                <div style={{ margin: '50px 45px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>

                    <div style={{ marginBottom: '20px' }}>
                        <InputForm style={{ fontSize: '15px', lineHeight: '1.2', width: '100%', height: '45px', borderRadius: '27px', padding: '0 35px 0 35px', background: '#ebebeb' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    </div>

                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '20px',
                                right: '20px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled style={{ fontSize: '18px' }} />
                                ) : (
                                    <EyeInvisibleFilled style={{ fontSize: '18px' }} />
                                )
                            }
                        </span>
                        <InputForm
                            style={{ fontSize: '15px', lineHeight: '1.2', width: '100%', height: '45px', borderRadius: '27px', padding: '0 35px 0 35px', background: '#ebebeb' }}
                            placeholder="Nhập mật khẩu"

                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                            onKeyDown={TouchSignIn}
                        />
                    </div>

                    {error && previousEmail === email && previousPassword === password && (
                        <span style={{ color: 'red', display: 'block', textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>{error}</span>
                    )}


                    <WrapperForgetPassword onClick={handleResetPassword}>Quên mật khẩu?</WrapperForgetPassword>


                    <Loading isLoading={isLoading}>
                        <WrapperButtonComponent
                            disabled={!email.length || !password.length}
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
                                textTransform: ' uppercase',
                                background: ' #e59906',
                                border: ' none',
                                borderRadius: ' 27px',
                                width: ' 50%',
                                margin: '0 auto 30px',
                                cursor: 'pointer',
                                PointerEvent: 'auto'
                            }}
                            onClick={handleSignIn}
                            textButton={'ĐĂNG NHẬP'}
                            styletextbutton={{ color: '#fff' }}
                        />
                    </Loading>
                    <WrapperNotAccount>Bạn chưa có tài khoản?</WrapperNotAccount>
                    <WrapperCreateAccount onClick={handleNavigateSignUp}>TẠO TÀI KHOẢN</WrapperCreateAccount>

                </div>
            </div>
        </div>
    )
}

export default SignInPage;
