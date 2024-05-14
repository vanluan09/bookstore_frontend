import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({size, styleButton, textButton, styletextbutton, disabled, ...rest}) => {
  return (
    <div>
      <Button
        size={size}
        style={{
          ...styleButton,
          background: disabled ? 'rgb(157, 131, 81)' : (styleButton && styleButton.background),
          pointerEvents: disabled ? 'none' : (styleButton && styleButton.pointerEvents)
        
        }}
        {...rest}
      >
        <span style={styletextbutton}>{textButton}</span>
      </Button>
    </div>
  )
}

export default ButtonComponent
