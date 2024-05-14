import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  background-color:#e59906;
  border: 1px solid #e59906;
  border-radius: 8px;
  .name-info {
    font-size: 16px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .payment-info {
    font-Weight: bold;
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 18px;
  text-transform: uppercase;
  padding: 15px;
  display:flex;
  justify-content: center;
  align-items: center;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:center;
  margin-top: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #e59906;
`

export const WrapperNameProduct = styled.div`
  display: flex;
  align-items: center;
  width: 670px;
  font-size: 18px;
  gap: 20px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  };
  font-size: 18px;
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
  font-size: 20px;
  padding: 5px 0;
  margin-bottom: 5px;
  background-color: #e59906;
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`