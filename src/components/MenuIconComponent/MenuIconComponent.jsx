import React from 'react'
import ButtonIconComponent from '../ButtonIconComponent/ButtonIconComponent'
import { WrapperButton, WrapperMenuIcon } from './style'

const MenuIconComponent = ({arrButtonIcon}, props) => {
  const {
    styletextbutton = {
      display: 'block',
      fontSize:'18px'
      
    },
    styleimage = {
      width: '100%',

    },
    stylebutton = {
      width: '100px',
      height: '100px',
      padding: '10px',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap:'10px',
      border: '1px solid rgb( 157 131 81)',
      borderRadius: '16px',
      color : 'rgb( 157 131 81)'
    }

  } = props


  return (
    <WrapperMenuIcon>
      {arrButtonIcon.map((imgicon) => {
        return (
            <ButtonIconComponent
              key={imgicon.icon}
              imgicon={imgicon.icon}
              textbutton={imgicon.text}
              styletextbutton={styletextbutton}
              styleimage={styleimage}
              stylebutton={stylebutton}

            />
        )
      })}
    </WrapperMenuIcon>
  )
}

export default MenuIconComponent
