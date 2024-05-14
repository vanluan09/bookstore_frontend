import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const { default: styled } = require("styled-components");

export const WrapperTitle = styled.span`
    background: #e59906;
    display: flex;
    align-items: center;
    font-size: 30px;
    justify-content: center;
    padding: 36px 0 25px;
    border-radius: 20px 20px 0 0;
    font-weight: 500;
    font-family: sans-serif;
    color: #fff;
`
export const WrapperForgetPassword = styled.span`
    display: flex;
    justify-content: end;
    font-size: 15px;
    line-height: 1.4;
    cursor: pointer;
    color: #e59906;
    margin-bottom: 20px;

    &:hover {
        color: red;
        
    }

`
export const WrapperButtonComponent = styled(ButtonComponent)`

    &:active {
        opacity: 0.5;
    }
`

export const WrapperNotAccount = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    margin-bottom: 10px;

`

export const WrapperCreateAccount = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(157,131,81);
    padding: 10px;
    cursor: pointer;

    &:hover {
        color: #e59906;
    }
`