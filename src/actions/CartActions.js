import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_DELIVERY_PRICE,
    SAVE_SHIPPING_INFO,
    REMOVE_ALL_CART_ITEMS,
  } from "../constants/cartConstants";
  
  // Add to Cart ---Product
  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v2/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
        nVlPeso: data.product.nVlPeso,
        nVlComprimento: data.product.nVlComprimento,
        nVlAltura: data.product.nVlAltura,
        nVlLargura: data.product.nVlLargura,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // REMOVE FROM CART ---Product
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const removeAllItemsFromCart = () => async(dispatch, getState) => {
    dispatch({
      type: REMOVE_ALL_CART_ITEMS,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }


  // SAVE SHIPPING INFO 
  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  export const saveDeliveryPrice = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_DELIVERY_PRICE,
      payload: data,
    })

    localStorage.setItem("deliveryPrice", JSON.stringify(data));
  };