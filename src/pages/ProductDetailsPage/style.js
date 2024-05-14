import { Col, Image, InputNumber, Row } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperCol = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
`

export const WrapperImage = styled(Image)`
    width: 100%;
    height: auto;
    background-size: cover;
    background-position: center;
`
export const WrapperName = styled.div`
    font-weight: 600;
    font-size: 24px;
    color: #494949;
    margin-bottom: 10px;
    line-height: 28px;
    letter-spacing: 0.3px;

`

export const WrapperPrice = styled.span`
    color: #9c8350;
    font-weight: 600;
    font-size: 24px;
    padding-left: 15px;
`

export const WrapperStatus = styled.span`
    font-weight: bold;
    color: #5B5B5E;
    padding-left: 5px;

`

export const WrapperInputNumber = styled(InputNumber)`
    padding:10px;
    border: none;
    &.ant-input-number-input-wrap {

        max-width: 150px;
        font-size: 20px;
        text-align: center;
    }

    & > .ant-input-number-handler-wrap {
       display: none;
    }

    & > .ant-input-number-input-wrap > .ant-input-number-input {
        text-align: center;
        font-size: 16px;
    }
`

export const WrapperButtonComponent = styled(ButtonComponent)`
    &:hover {
        background: #fff !important;
        color: #9c8350 !important;
    }
`

export const WrapperButtonAddComponent = styled(ButtonComponent)`
    &:hover {
        background: #9c8350 !important;
        border: 1px solid #9c8350 !important;
    }
`

export const WrapperColEnd = styled(Col)`
    display:flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #9c8350;
    border-radius: 15px;
    padding: 0 10px;
    max-height: 400px;
    justify-content: center;
`

export const WrapperSpanDescription = styled.span`
    display: list-item;
    font-size: 20px;
    color: #131315;
    list-style-type: disc;
    margin-bottom: 10px;
    margin-left: 20px;
`

export const WrapperSpan = styled.span`
    
  
`
export const WrapperAfter = styled.div`
    margin-bottom: 40px;
    position: relative;
    &::after {
        display: block;
        width: 100%;
        height: 1px;
        margin: auto;
        background: #000;
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

`