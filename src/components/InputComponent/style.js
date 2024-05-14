import { Input } from "antd";
import styled from "styled-components";

export const WrapperInput = styled(Input)`
    &:hover {
        box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
        border-color: #fff !important;
        cursor: pointer;
    }
`