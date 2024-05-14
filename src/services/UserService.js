import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
        
    }
}

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}


export const refreshToken = async (refreshToken) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {} , {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id')
    return res.data
}

export const forgotPassword = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, data)
    return res.data
}

export const resetPassword = async (id, data, token, access_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/reset-password/${id}/${token}`, data)
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}