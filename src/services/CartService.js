import { axiosJWT } from "./UserService"

export const createCart = async (data, access_token) => {
 console.log('data', data, access_token)

  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/cart/create/${data?.userId}`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllCartByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/cart/get-all-cart/${id}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  console.log('res', res.data)
  return res.data
}


export const cancelCart = async (data, access_token) => {
    
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/cart/cancel-cart/${data?.userId}/${data?.productId}`, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelAllCart = async (data, access_token) => {

  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/cart/cancel-all-cart/${data?.userId}`, {
      headers: {
          token: `Bearer ${access_token}`,
      },
      data: {
        ids: data?.productId
      }
  })
  return res.data
}



