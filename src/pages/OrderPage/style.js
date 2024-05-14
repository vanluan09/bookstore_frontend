import { Checkbox, Radio } from "antd";
import styled  from "styled-components";
import { DeleteOutlined} from '@ant-design/icons'


export const WrapperStyleHeader = styled.div`
  background: #d73736;
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 24px;
  };
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);

`
export const WrapperStyleHeaderDilivery = styled.div`
  background: #b98f40;
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);

`


export const WrapperListOrder = styled.div`
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);
  margin-bottom: 40px;
  font-size: 20px;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`


export const WrapperInfo = styled.div`
  width: 100%;
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);

`

export const WrapperTotal = styled.div`
  display: flex;
 
  justify-content: space-between;
  background: #fff ;
 font-size: 24px;
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);
  padding: 10px 20px;

`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9255FD;
    border-color: #9255FD;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255FD;
  }
`

export const WrapperInfor = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`

export const WrapperSpanHover = styled.span`
  &:hover {
    color: rgb(255, 57, 69)!important;
  }
`

export const WrapperDeleteOutlined = styled(DeleteOutlined)`
  &:hover {
    color: rgb( 157 131 81);
  }
`


export const WrapperLabel = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
  background: rgb(240, 248, 255);
  border-radius: 4px;
  padding: 16px;
  font-weight: normal;
`