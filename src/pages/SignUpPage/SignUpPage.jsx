import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperButtonComponent, WrapperCreateAccount, WrapperNotAccount, WrapperTitle } from './style'
import { useNavigate } from 'react-router-dom'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import Loading from '../../components/LoadingComponent/Loading'
import * as UserService from '../../services/UserService'
import * as message from '../../components/Message/Message'
import signUp from '../../assets/img/background/sinup_out.png'
import { Helmet } from 'react-helmet'

const SignUpPage = () => {
    const navigate = useNavigate()

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [previousEmail, setPreviousEmail] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');
    const [previousConfirmPassword, setPreviousConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    let data
    useEffect(() => {
        if (success && data && data.status === 'OK') {
            message.success()
            handleNavigateSignIn()
        } else if (error || (success && data && data.status === 'ERR')) {
            message.error()
        }
    }, [success, error, data])

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleSignUp = async () => {
        setPreviousEmail(email)
        setPreviousPassword(password)
        setPreviousConfirmPassword(confirmPassword)
        if (email && password && confirmPassword) {
            setIsLoading(true);
            try {
                const response = await UserService.signupUser({ name, email, password, confirmPassword });
                setError(response.message)
                data = response
                if (response.status === 'OK') {
                    setSuccess()
                    message.success();
                    handleNavigateSignIn();
                }
            } catch (error) {
                setError(error.response.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        }
    }
    const TouchSignUp = () => {
        setPreviousEmail(email)
        setPreviousPassword(password)
        setPreviousConfirmPassword(confirmPassword)
        if (email && password && confirmPassword) {
            handleSignUp();
        }
    }

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover'}}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Đăng ký</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div style={{ width: '432px', height: '560px', borderRadius: '20px', border: '1px solid rgba(157, 131, 81, 0.6)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                <WrapperTitle>Đăng ký</WrapperTitle>
                <div style={{ margin: '36px 45px 0', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>

                    <div style={{ marginBottom: '20px' }}>
                        <InputForm style={{ fontSize: '15px', lineHeight: '1.2', width: '100%', height: '45px', borderRadius: '27px', padding: '0 35px 0 35px', background: '#ebebeb' }} placeholder="Tên đăng nhập" value={name} onChange={handleOnchangeName} />
                    </div>

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
                        />
                    </div>


                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '20px',
                                right: '20px'
                            }}
                        >{
                                isShowConfirmPassword ? (
                                    <EyeFilled style={{ fontSize: '18px' }} />
                                ) : (
                                    <EyeInvisibleFilled style={{ fontSize: '18px' }} />
                                )
                            }
                        </span>
                        <InputForm
                            style={{ fontSize: '15px', lineHeight: '1.2', width: '100%', height: '45px', borderRadius: '27px', padding: '0 35px 0 35px', background: '#ebebeb' }}
                            placeholder="Nhập lại mật khẩu"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleOnchangeConfirmPassword}
                            onKeyDown={TouchSignUp}
                        />
                    </div>

                    {error && previousEmail === email && previousPassword === password && previousConfirmPassword === confirmPassword && <span style={{ color: 'red', display: 'block', textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>{error}</span>}
                    
                    <Loading isLoading={isLoading}>
                        <WrapperButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
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
                                transition: ' all 0.4s ease 0s',
                                background: '#e59906',
                                border: ' none',
                                borderRadius: ' 27px',
                                width: ' 50%',
                                margin: '0 auto 30px',
                                cursor: 'pointer',
                                PointerEvent: 'auto'
                            }}
                            onClick={handleSignUp}
                            textButton={'ĐĂNG KÝ'}
                        />
                    </Loading>

                    <WrapperNotAccount>Bạn đã có tài khoản?</WrapperNotAccount>
                    <WrapperCreateAccount onClick={handleNavigateSignIn}>ĐĂNG NHẬP</WrapperCreateAccount>

                </div>
            </div>
        </div>
        
    )
}

export default SignUpPage
