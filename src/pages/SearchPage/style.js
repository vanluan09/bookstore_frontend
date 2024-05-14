import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";


export const WrapperButtonComponent = styled(ButtonComponent)`

    &:hover {
        opacity: 0.8;
    }
`

export const WrapperSpan = styled.span`
    display: block;
    margin: 40px 100px;
    font-size: 32px;
    font-weight: bold;
`