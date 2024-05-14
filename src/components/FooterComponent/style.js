import styled from "styled-components";

export const WrapperImageType = styled.div`
    position: relative;

`

export const WrapperAroundImage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    font-size: 14px;
`

export const WrapperSpan = styled.span`
    font-size: 16px;
    color: rgb(255, 255, 255);
`

export const WrapperSpanHover = styled.span`
    font-size: 16px;
    color: rgb(255, 255, 255);
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`
export const WrapperHover = styled.div`
    &:hover {
        cursor: pointer;
        color:rgb(255, 213, 126);
    }
`


export const WrapperText = styled.div`
    display: flex;
    gap: 20px;
`