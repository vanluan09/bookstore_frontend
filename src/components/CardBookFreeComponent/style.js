import { Card } from "antd";
import styled from "styled-components";


export const WrapperNameProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 1.5;
    text-align: center;
`

export const WrapperPriceProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: #DD2128;
}
`

export const CardStyle = styled(Card)`
    border: 1px solid rgb(153,131,81);
    & > .ant-card-body {
        position: absolute;
        bottom: 0;
        right:0;
        left: 0;
    }
`