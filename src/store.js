import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { 
    productsReducer,  
    deleteProductReducer,
    deleteReviewReducer,
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReviewsReducer,
} from './reducers/ProductReducers'
import { cartReducer } from './reducers/cartReducers';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    user: userReducer,    
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword:forgotPasswordReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    productReviews: productReviewsReducer,
    deleteProduct: deleteProductReducer,
    newReview: newReviewReducer,
    createProduct: newProductReducer,
    deleteReview: deleteReviewReducer,
    cart: cartReducer,
    order: newOrderReducer,
    myOrder: myOrdersReducer,
    myOrderDetails: orderDetailsReducer,
    AllOrders: allOrdersReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
         ? JSON.parse(localStorage.getItem("cartItems"))
         : [],

         shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem('shippingInfo'))
          : {},
        deliveryPrice: localStorage.getItem("deliveryPrice")
        ? JSON.parse(localStorage.getItem("deliveryPrice"))
        : {}
    }   
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;