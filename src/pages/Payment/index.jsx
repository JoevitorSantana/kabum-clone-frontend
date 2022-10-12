import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { HeaderCart } from "../../components/HeaderCart";
import {createOrder} from '../../actions/OrderActions';
import { clearErrors } from "../../actions/userActions";
import styled from "styled-components";
import { BsCartCheckFill } from "react-icons/bs";
import { removeAllItemsFromCart, removeItemsFromCart } from "../../actions/CartActions";

export function Payment({history}){

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    const {error, loading} = useSelector((state) => state.order);

    const paymentData = {
        amount: Math.round(orderInfo.discountPrice)
    }

    const order = {
        shippingInfo: user.shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.Price,
        shippingPrice: orderInfo.shippingPrice,
        totalPrice: orderInfo.discountPrice
    };

    const submitHandler = async(e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const {data} = await axios.post(
                "/api/v2/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name:user.name,
                        email: user.email,
                        address: {
                            line1: user.shippingInfo.street,                            
                            city: user.shippingInfo.city,
                            state: user.shippingInfo.state, 
                            country: 'BR',
                        },
                    },                    
                },
            });

            if(result.error){
                payBtn.current.disabled = false;

                toast.error(result.error.message);
            } else {
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    dispatch(removeAllItemsFromCart());
                    history.push("/success");
                } else {
                    toast.error("Houve um erro ao processar pagamento!")
                }
            }
        } catch(error){
            payBtn.current.disabled = false;
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return(
        <div>
            <HeaderCart />
            <Container>
                <Content>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <Title><BsCartCheckFill size={30} color="#FC6B0F" /><h2>Pagamento</h2></Title>                        
                        <CardNumberElement className="input-number"/>
                        <CardExpiryElement className="input-number"/>
                        <CardCvcElement className="input-number"/>
                        <input 
                            type="submit"
                            value={`Pagar - ${ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(orderInfo && orderInfo.discountPrice)}`}
                            ref={payBtn} 
                            className="paybutton"                           
                        />
                    </form>
                </Content>
                <ToastContainer 
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>
        </div>
    )
}


const Title = styled.div`
    display: flex;
    width: 100%;
    margin: 15px 0; 

    h2 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        margin-left: 1rem;
    }
`;

const Content = styled.div`
    display: flex;
    max-width: 400px;
    margin: 50px auto;
    width: 100%;
    flex-direction: column;

    .input-number{
    
        padding: 15px 10px 15px 10px;        
        height: 50px;
        flex-direction: row;
        border: 1px solid lightgray;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    form{
        margin: 20px;

        .paybutton{
            width: 100%;
            background: var(--orange-text);
            color: white;
            font-size: 18px;
            text-tranform: uppercase;
            font-weight: 700;
            height: 50px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    background: white;
`;