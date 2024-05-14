import { Input} from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    outline: none;
    &:focus {
        background: rgb(232, 240, 254);
        border-color: rgb(157,131,81);
    }

    &:hover {
        border-color: rgb(157,131,81);
    }
`