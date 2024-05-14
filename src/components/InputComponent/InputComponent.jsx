import React from 'react'
import { WrapperInput } from './style'

const InputComponent = ({placeholder, variant, style, size, ...rests}) => {
  return (
    <div>
      <WrapperInput
        placeholder={placeholder}
        style={style}
        size={size}
        variant={variant}
        {...rests}
      />
    </div>
  )
}

export default InputComponent




