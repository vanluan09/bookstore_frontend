import { Radio } from "antd";
import styled  from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 4px;
`

export const WrapperContainer = styled.div`
  width: 100%;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  margin-top: 12px;
  justify-content: center;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  gap:5px;
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
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperItemOrderInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const WrapperTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`
export const WrapperP = styled.p`
  font-size:16px;
  color: #fff;
`
export const WrapperH3 = styled.h3`
  font-size:20px;
  color: rgb(255, 213, 126);
`

export const WrapperDiv = styled.div`
  width: 45%;
`

export const WrapperInfoPayment = styled.div`
  width: 100%;
`

export const WrapperTotalSuccess = styled.div`
  display: flex;
  
  justify-content: space-between;
  background: #fff ;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(157, 131, 81, 0.8);
  padding: 10px 20px;
`