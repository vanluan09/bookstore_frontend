import React from 'react'
import maria from '../../assets/img/pray/maria.webp'
import jesus from '../../assets/img/pray/jesus.jpg'
import body from '../../assets/img/pray/body.jpg'
import ButtonIconComponent from '../../components/ButtonIconComponent/ButtonIconComponent'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const PrayerRoomPage = (props) => {

    const arrText = [
        {
            picture: maria,
            text: 'Phòng cầu nguyện với Đức Maria'
        },
        {
            picture: jesus,
            text: 'Phòng cầu nguyện với Thánh giá'
        },
        {
            picture: body,
            text: 'Phòng cầu nguyện với Thánh Thể'
        },
    ]

    const {
        styletextbutton = {
          display: 'block',
          fontSize:'28px',
          padding: '10px 0'
          
        },
        styleimage = {
          width: '400px',
          height:'226px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
    
        },
        stylebutton = {
          width: '400px',
          height: '288px',
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

    const location = useLocation();

    console.log('state', location)
  return (
    <div style={{display:'flex', flexWrap:'wrap', gap:'40px', padding: '40px 100px', justifyContent:'space-around'}}>
      {arrText.map(room => {
        return (
            <div key={room.picture}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Phòng cầu nguyện</title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>
                <ButtonIconComponent
                    textbutton={room.text}
                    imgicon = {room.picture}
                    styletextbutton={styletextbutton}
                    styleimage={styleimage}
                    stylebutton={stylebutton}
                />
            </div>
        )
      })}
    </div>
  )
}

export default PrayerRoomPage
