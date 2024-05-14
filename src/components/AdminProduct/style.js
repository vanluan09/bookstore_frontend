import { Button, Upload } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 28px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const WrapperButtonComponent = styled(ButtonComponent)`

    &:hover {
        opacity: 0.8;
    }
`

export const WrapperButtonChooseFile = styled(Button)`
    &:hover {
        color: rgb(157,131,81)!important;
        border-color:rgb(157,131,81) !important;
    }
`

export const WrapperButtonApply = styled(Button)`
    background-color: rgb(157,131,81);
    &:hover {
        background-color: rgb(157,131,81) !important;
        opacity: 0.7;
    }
`