import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperButtonComponent, WrapperContentProfile, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { getBase64 } from '../../utils'
import * as UserService from '../../services/UserService'
import { Helmet } from 'react-helmet'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success()
    //         handleGetDetailsUser(user?.id, user?.access_token)
    //     } else if (isError) {
    //         message.error()
    //     }
    // }, [isSuccess, isError])

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }

    const handleUpdate = async () => {
        try {
            const { id, access_token, ...rests } = user;
            await UserService.updateUser(id, { ...rests, email, name, phone, address, avatar }, access_token);
            message.success("Cập nhật thành công");
            handleGetDetailsUser(id, access_token);
        } catch (error) {
            message.error("Cập nhật thất bại");
            console.error("Cập nhật thất bại: ", error);
        }
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Thông tin cá nhân</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <TypeProduct name={'Thông tin người dùng'}/>
            <div style={{padding: "40px 100px"}}>
                <Loading isLoading={false}>
                    <WrapperContentProfile>
                        <WrapperInput>
                            <WrapperLabel htmlFor="name">Tên đăng nhập</WrapperLabel>
                            <InputForm style={{ width: '350px', fontSize:'18px' }} id="name" value={name} onChange={handleOnchangeName} placeholder="tên đăng nhập" />
                            <WrapperButtonComponent
                                onClick={handleUpdate}
                                textButton={'Cập nhật'}
                                styletextbutton={{fontSize:'24px', color:'#fff'}}
                                styleButton={{ display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', }}
                            ></WrapperButtonComponent>
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="email">Email</WrapperLabel>
                            <InputForm style={{ width: '350px', fontSize:'18px'}} id="email" value={email} onChange={handleOnchangeEmail} placeholder="abc@gmail.com" />
                            <WrapperButtonComponent
                                onClick={handleUpdate}
                                textButton={'Cập nhật'}
                                styletextbutton={{fontSize:'24px', color:'#fff'}}
                                styleButton={{ display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', }}
                            ></WrapperButtonComponent>
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="phone">Số điện thoại (+84)</WrapperLabel>
                            <InputForm style={{ width: '350px', fontSize:'18px'}} id="email" value={phone} onChange={handleOnchangePhone} placeholder="123456789" />
                            <WrapperButtonComponent
                                onClick={handleUpdate}
                                textButton={'Cập nhật'}
                                styletextbutton={{fontSize:'24px', color:'#fff'}}
                                styleButton={{ display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', }}
                            ></WrapperButtonComponent>
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </WrapperUploadFile>
                            {avatar && (
                                <img src={avatar} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} alt="avatar"/>
                            )}
                           
                            <WrapperButtonComponent
                                onClick={handleUpdate}
                                textButton={'Cập nhật'}
                                styletextbutton={{fontSize:'24px', color:'#fff'}}
                                styleButton={{ display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', }}
                            ></WrapperButtonComponent>
                        </WrapperInput>
                        <WrapperInput>
                            <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
                            <InputForm style={{ width: '350px', fontSize:'18px'}} id="address" value={address} onChange={handleOnchangeAddress} placeholder="Số nhà A, phường B, Quận C, Tỉnh D" />
                            <WrapperButtonComponent
                                onClick={handleUpdate}
                                textButton={'Cập nhật'}
                                styletextbutton={{fontSize:'24px', color:'#fff'}}
                                styleButton={{ display:'block', background:'#DC2129', border:'none', height:'auto', width:'auto', borderRadius:'12px', }}
                            ></WrapperButtonComponent>
                        </WrapperInput>
                    </WrapperContentProfile>
                </Loading>
            </div>
        </>
    )
}

export default ProfilePage;
