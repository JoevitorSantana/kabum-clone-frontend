import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_DELIVERY_PRICE,
    SAVE_SHIPPING_INFO,
    REMOVE_ALL_CART_ITEMS
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {}, deliveryPrice: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
     
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
      }

      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };

      case REMOVE_ALL_CART_ITEMS:
        return {
          ...state,
          cartItems: state.cartItems.splice()
      }
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };

      case SAVE_DELIVERY_PRICE:
        return {
          ...state,
          deliveryPrice: action.payload,
        };
  
      default:
        return state;

    }
  };

