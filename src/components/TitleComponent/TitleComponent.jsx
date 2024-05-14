import React from 'react'
import icontitle from '../../assets/img/icon/icontitle.webp'
import { WrapperTitleImage, WrapperTitleSpan } from './style'



const TitleComponent = ({text}) => {
  return (
    <div style={{padding:'40px  0'}}>
        <WrapperTitleSpan>
            {text}
        </WrapperTitleSpan>
        <WrapperTitleImage src={icontitle}/>
        
    </div>
  )
}

export default TitleComponent
