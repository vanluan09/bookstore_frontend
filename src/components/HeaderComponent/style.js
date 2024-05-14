import { Col, Row } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";



export const WrapperHeader = styled(Row)`
    padding: 5px 100px;
    background: rgb(39,39,40);
`


export const WrapperColHeader = styled(Col)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const WrapperAccount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
`

export const WrapperCartHeader = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    cursor: pointer;

`

export const WrapperMenuHeader = styled(Row)`
    padding: 0 100px;
    height: 40px;
    background: #fff;
    display: flex;
    background:'rgb(157,131,81)';

`
export const WrapperMenuUl = styled.ul`
    display: flex;
    height: 40px;
    align-items: center;
    font-size: 16px;
    color: rgb(171,131,81);
    gap: 20px;
    margin: 0;
    justify-content: flex-end;
`

export const WrapperMenuLi = styled.li`
    text-decoration: none;
    padding: 0 10px;
    display: flex;
    gap: 4px;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
        opacity: 0.8;
        color: rgb(171,131,81);
    }
`

export const WrapperIcon = styled.div`
    padding: 10px;
   
`



export const WrapperListMenu = styled.div`
    max-width: 0;
    z-index: -1;
    display: flex;
    font-size: 20px;
    gap: 60px;
    font-weight: 600;
    padding: 28px 16px 16px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    position:absolute;
    top: 144px;
    background: #fff;
    transform-origin: 0% 0%;
    transform: perspective(600px) rotateX(-90deg);
    transition: transform 0.5s ease, opacity 0.6s ease, max-height 0.6s step-end, max-width 0.6s step-end, padding 0.6s step-end;
`

export const WrapperButtonComponent = styled.div`
    &:hover {
        ${WrapperListMenu} {
            overflow: visible;
            max-width: 1000px;
            z-index: 99;
            transform: perspective(600px) rotateX(0deg);
            transition: transform 0.5s ease, opacity 0.2s ease, max-height 0s step-end, max-width 0s step-end, padding 0s step-end;
        }
    }
`

export const HoverTitleUl = styled.div`
    margin-bottom:16px;
    cursor:pointer;

    &:hover {
        color:rgb(171,131,81);
    }
`

export const HoverTitleLi = styled.div`
    font-weight:350; 
    font-size:18px; 
    padding-bottom:12px;
    cursor:pointer;

    &:hover {
    color:rgb(171,131,81);
    }
`
export const WrapperSpanIcon = styled.span`
    color: #000;
    transition: all 0.1s ease;
    
    &:hover {
        opacity: 0.8;
        color: rgb(171,131,81);
    }
`

export const WrapperTextSign = styled.p`
    font-size: 20px;
    padding: 10px 20px;
    margin: 0;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s;
    text-align: center;
    &:hover {
        color: rgb(171,131,81);
    }
`

export const WrapperButton = styled(ButtonComponent)`
    &:hover {
        opacity: 0.7;
    }
`