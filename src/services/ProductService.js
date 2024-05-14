import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
    let res = {}
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
    }
    
    return res.data
}

export const getProductType = async (type, limit, page, sort, valued) => {
    let res = {}
    if(sort && type) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}&sort=${sort}&sort=${valued}`)
    }

    else if (type) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
    }

    return res.data
}

export const getProductSearchType = async (type, limit) => {
    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}`)

return res.data
}


export const getProductDesc = async (desc, limit) => {
    
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=description&filter=${desc}&limit=${limit}`)

    return res.data
}

export const createProduct = async (formData) => {
    console.log('formData', formData)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, formData)
    
    return res.formData
}

export const getDetailsProduct = async (id) => {
    console.log('id', id)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    console.log('data', res.data)
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyProduct = async (data, access_token,) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data
}

export const getPdfBookProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details-pdf/${id}`, {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf',
        },
      })
    return res.data
}