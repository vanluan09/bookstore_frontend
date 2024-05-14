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
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperContainer = styled.div`
  padding:40px 100px;
  background-color: #f5f5fa;
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction : column;
  gap: 20px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items:flex-end;
  padding-top: 10px;
  font-size:18px;
`

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items:center;
  padding:10px 0;
  width: 100%;
  gap: 20px;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 12px 12px #ccc;
  font-size: 18px;
`

export const WrapperStatus = styled.div`
  display:flex;
  align-item:flex-start;
  width: 100%;
  padding:10px 0;
  gap: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction:column;
  font-size: 18px;
`