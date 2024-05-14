import React, { useEffect, useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperButtonComponent, WrapperTitle } from './style';
import * as UserService from '../../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import * as message from '../../components/Message/Message'
import signUp from '../../assets/img/background/signin_out.png'
import { Helmet } from 'react-helmet';

const ResetPassword = () => {
    const navigate = useNavigate();
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    }

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [previousConfirmPassword, setPreviousConfirmPassword] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');


    const user = useSelector((state) => state.user)


    const {id, token} = useParams()

    const mutation = useMutationHooks(
        (data) => {
          
            const res = UserService.resetPassword(
              id, data, token)
            return res
          },
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data && data.status === 'OK') {
            message.success()
            handleNavigateSignIn()
        } else if (isError || (isSuccess && data && data.status === 'ERR')) {
            message.error()
        }
    }, [isSuccess, isError, data])

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }


    const handleUpdatePassword = () => {
        setPreviousPassword(password);
        setPreviousConfirmPassword(confirmPassword)
        if (password, confirmPassword) {
            mutation.mutate({password, confirmPassword, accessToken: user?.access_token});
        }
        if(data?.status === 'OK') {
            navigate('/sign-in')
        }
    }



  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: `url(${signUp}) no-repeat fixed`, backgroundSize: 'cover' }}>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Thay đổi mật khẩu</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <div style={{ width: '380px', height: '380px', borderRadius: '20px', border: '1px solid rgba(157, 131, 81, 0.6)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
            <WrapperTitle>Cập nhật mật khẩu</WrapperTitle>
            <div style={{ margin: '50px 45px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>

                

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
                        placeholder="Nhập mật khẩu mới"

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
                    />
                </div>

                {data?.status === 'ERR' && previousPassword === password && previousConfirmPassword === confirmPassword && (
                    <span style={{ color: 'red', display: 'block', textAlign: 'center', fontSize: '16px', marginBottom: '20px' }}>{data?.message}</span>
                )}


                <Loading isLoading={isLoading}>
                    <WrapperButtonComponent
                        disabled={!password.length || !confirmPassword.length}
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
                        onClick={handleUpdatePassword}
                        textButton={'CẬP NHẬT'}
                        styletextbutton={{ color: '#fff' }}
                    />
                </Loading>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword
