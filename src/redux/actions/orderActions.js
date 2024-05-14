
// src/store/actions/orderActions.js

import * as CartService from '../../services/CartService'; 
import {setCartData, addOrderProduct, removeOrderProduct} from '../slides/orderSlide';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCartAndUpdate = (userId, accessToken) => async (dispatch) => {
  try {
    const cartData = await CartService.getAllCartByUserId(userId, accessToken);
    dispatch(setCartData(cartData.data));
  } catch (error) {
    console.error('Failed to fetch cart:', error);
  }
};

export const createCartAndAddToOrder = createAsyncThunk(
  'cart/createCartAndAddToCart',
  async ({data, accessToken}, {dispatch, rejectWithValue}) => {
    try {
      const response = await CartService.createCart(data, accessToken);
      // Giả sử response trả về object với item mới thêm
      dispatch(addOrderProduct({ orderItem: response.item }));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CancelProductInCart = createAsyncThunk(
  'cart/cancelProductInCart',
  async ({data, accessToken}, {dispatch, rejectWithValue}) => {
    try {
      const response = await CartService.cancelCart(data, accessToken);
      dispatch(removeOrderProduct({ idProduct: response.productId }));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CancelAllCart = createAsyncThunk(
  'cart/cancelAllCart',
  async ({data, accessToken}, {dispatch, rejectWithValue}) => {
    try {
      const response = await CartService.cancelAllCart(data, accessToken);
      dispatch(removeOrderProduct({ listChecked: response}));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);