import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperGoodBook = styled.div`
    margin: 0px 100px;
    border-radius: 40px;
    border: 4px solid #DD2128;
`


export const WrapperButtonComponent = styled(ButtonComponent)`

    &:hover {
        opacity: 0.8;
    }
`