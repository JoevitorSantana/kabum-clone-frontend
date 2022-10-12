import { FaShoppingCart, FaTrash, FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HeaderCart } from "../../components/HeaderCart";
import {ImLocation} from 'react-icons/im'
import {MdShoppingBasket, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addItemsToCart, removeAllItemsFromCart, removeItemsFromCart, saveDeliveryPrice} from '../../actions/CartActions';
import {HiDocumentSearch} from 'react-icons/hi'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../components/Loader";
import { StatusOrderBar } from "../../components/StatusOrderBar";
import MetaData from "../../utils/Metadata";

export function Cart({history}){

    const dispatch = useDispatch();

    const {cartItems, shippingInfo} = useSelector((state) => state.cart);
    const {user, loading} = useSelector((state) => state.user)    

    const [deliveryPrices, setDeliveryPrices] = useState([]);    

    const [cep, setCep] = useState([]);

    const [finalDeliveryPrice, setFinalDeliveryPrice] = useState(0);
    const [finalService, setFinalService] = useState('');
    const [finalDeliveryPrize, setFinalDeliveryPrize] = useState(0);

    
    const handleSetFinalDeliveryPrice = () => {
        if(finalDeliveryPrice === 0){            
            toast.error('Selecione um Frete')
        }else{
            dispatch(saveDeliveryPrice({finalDeliveryPrice, finalService, finalDeliveryPrize}));            
            history.push('/paymentmethod')
        }
    }

    const cepSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();        

        myForm.set('cep', cep);
        axios.post('/api/v2/entrega', myForm).then((response) => setDeliveryPrices(response.data)).catch((error) => console.log(error))
    }    

    const cepForm = useRef(null);  

    
    let Price = cartItems.reduce((acc, item) =>
        acc + item.quantity * item.price, 0
    );

    let Weight = cartItems.reduce((acc, item) => 
        acc + item.quantity * item.nVlPeso, 0
    );
    let Height = cartItems.reduce((acc, item) => 
        acc + item.quantity * item.nVlAltura, 0
    );
    let Width = cartItems.reduce((acc, item) => 
        acc + item.quantity * item.nVlLargura, 0
    );
    let Length = cartItems.reduce((acc, item) => 
        acc + item.quantity * item.nVlComprimento, 0
    );    
    

    let totalPrice = Price + parseFloat(finalDeliveryPrice);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity){
            return toast.error("Estoque acabou!")
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }
    
    const deleteAllCartItems = () => {
        dispatch(removeAllItemsFromCart());
    }

    useEffect(() => {

        setFinalDeliveryPrice(0);
        
        if(user?.shippingInfo){
            axios.post(`/api/v2/entrega`, {
                cep: user.shippingInfo?.cep,
                nVlPeso: Weight,                
                nVlComprimento: Length,
                nVlAltura: Height,
                nVlLargura: Width,
            }).then((response => setDeliveryPrices(response.data))).catch((error) => console.log('deu merda'))            
        } else {
            return
        }

    }, [user, Height, Width, Length, Weight])

    return(
        <>
            {loading ? (<Loader />) : (
                <>
                    <MetaData title="KaBooM! | Maior Ecommerce de Tecnologia e Games da América Latina"/>
                    <HeaderCart />                    
                    <Container>
                        <Content>  
                            {cartItems.length === 0 ? (
                                <EmptyCart>
                                    <h1><b>Seu Carrinho está vazio!</b></h1>
                                    <span>Deseja olhar outros produtos similares?</span>
                                    <Link to="/" style={{textDecoration: 'none'}}><div className="button"><FaShoppingCart size={25} style={{margin: 5}} /> Continuar Comprando</div></Link>
                                </EmptyCart>
                            ):(
                            <>

                            {/*<StatusOrderBar percentage={20} />*/}
                            <div className="cartContent">
                                <LeftSection>
                                    <AddressCard>
                                        <AddressCardTitle>
                                            <InfoSection>
                                                <ImLocation size={30} color="#FC6B0F"/>
                                                <h2>Selecione o Endereço</h2>
                                            </InfoSection>
                                        </AddressCardTitle>
                                        {user?.shippingInfo ? (
                                            <AddressInfoCard>
                                                <span>Endereço Principal</span>
                                                <p>{user.shippingInfo?.street}</p>
                                                <p>Número: {user.shippingInfo?.number}</p>
                                                <p>CEP {user.shippingInfo?.cep} - {user.shippingInfo?.city}, {user.shippingInfo?.state}</p>
                                                <AddressOptions>                                                
                                                    <Link to='/me/details'><button className="isSelected">Editar</button></Link>
                                                </AddressOptions>                                                
                                            </AddressInfoCard>
                                        ) : (
                                            <AddressInfoCard>
                                                <span>Você não possui nenhum endereço</span>
                                                <AddressOptions>
                                                    <Link to='/me/details'><button className="isSelected">Cadastrar</button></Link>
                                                </AddressOptions>                                                
                                            </AddressInfoCard>
                                        )}
                                        
                                    </AddressCard>  
                                    <AddressCard>
                                        <AddressCardTitle>
                                            <InfoSection>
                                                <MdShoppingBasket size={30} color="#FC6B0F"/>
                                                <h2>Produto e Frete</h2>                                
                                            </InfoSection>                                
                                            <Button onClick={deleteAllCartItems} ><p><FaTrash style={{marginRight: 5}} />Remover todos os produtos</p></Button>                                
                                        </AddressCardTitle>
                                        <ProductInfo>
                                            <Sender>
                                                <span>Vendido e Entregue por<b>Kabum</b></span>                        
                                            </Sender>
                                            {cartItems && cartItems.map((item) => (
                                                <Product key={item.product}>
                                                    <ProductEsseentials>
                                                        <ProductImageSection>
                                                            <img src={item.image} alt="123" />
                                                        </ProductImageSection>
                                                        <ProductDescriptionSection>
                                                            <span>RedDragon</span>
                                                            <p>{item.name}</p>
                                                            <span>Com Desconto PIX: <b style={{fontSize: 11}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price * item.quantity)}</b></span>
                                                            <span>Parcelado no cartão em até <b style={{fontSize: 11}}>10x</b> sem juros <b style={{fontSize: 11}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format((item.price * item.quantity) / 10)}</b></span>
                                                        </ProductDescriptionSection>
                                                    </ProductEsseentials>    
                                                    <ProductPriceAndQuantityInfo>
                                                        <ProductQuantitySection>
                                                            <span>Quant.</span>
                                                            <Quantity>
                                                                <MdOutlineArrowBackIosNew onClick={() => decreaseQuantity(item.product, item.quantity)} color={ item.quantity === 1 ? "lightgray" : 'darkorange'}/>
                                                                <input disabled value={item.quantity}/>
                                                                <MdOutlineArrowForwardIos onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} color="darkorange" />
                                                            </Quantity>
                                                            <RemoveProductButton onClick={() => deleteCartItems(item.product)}>
                                                                <FaTrash />
                                                                Remover
                                                            </RemoveProductButton>
                                                        </ProductQuantitySection>
                                                        <ProductPriceSection>
                                                            <span>Preço à vista no Pix</span>
                                                            <span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price * item.quantity)}</span>
                                                        </ProductPriceSection>                                                    
                                                    </ProductPriceAndQuantityInfo>                                                                                                
                                                </Product>
                                            ))}
                                        </ProductInfo>
                                        {shippingInfo.length === 0 ? (
                                            <></>
                                        ):(
                                            <DeliveryPricing ref={cepForm} onSubmit={cepSubmit}>
                                                <DeliveryTitle><FaTruck size={20} style={{marginRight: 10}} color="#FC6B0F"/>FRETE</DeliveryTitle>                                                                                                    
                                                <DeliveryServiceForm> 
                                                    {deliveryPrices.response && deliveryPrices.response.map((service) => (
                                                        <DeliveryService key={service.Codigo}>                                                                                                        
                                                            <label htmlFor={service.Codigo}>                                                                                                                       
                                                                <input type="radio" id={service.Codigo} className="shipping" name="shipping" onClick={(e) => {setFinalDeliveryPrice(e.target.value); setFinalService(service.Codigo); setFinalDeliveryPrize(service.PrazoEntrega)}} value={service.Valor.toString().replace(',', '.')}/>
                                                                <b>{service.Codigo === '04014' ? 'SEDEX' : 'PAC'}</b>
                                                                -
                                                                Em até {service.PrazoEntrega} dias úteis
                                                            </label>
                                                            <span>R${service.Valor}</span>
                                                        </DeliveryService>
                                                    ))}                                                                                                                                                           
                                                </DeliveryServiceForm>
                                            </DeliveryPricing>                           

                                        )} 
                                    </AddressCard>
                                </LeftSection>
                                <OrderInfoContainer>
                                    <OrderInfo>
                                        <AddressCardTitle><div style={{display: "flex",alignItems: 'center'}}><HiDocumentSearch size={30} color="#FC6B0F"/><h2>Resumo</h2></div></AddressCardTitle>
                                        <PricingInfo>
                                            <ProductPrice>
                                                Valor dos Produtos: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Price)}</b>
                                            </ProductPrice>
                                            <Divider />
                                            <ProductPrice>
                                                Frete: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(finalDeliveryPrice)}</b>
                                            </ProductPrice>
                                            <TotalPrice>
                                                <ProductPrice className="inside-card">
                                                    Valor Total: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice)}</b>
                                                </ProductPrice>
                                                <span className="prize">(Em até <b>12x</b> de <b>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice / 12)}</b>)</span>
                                            </TotalPrice>
                                            <PromotionalPrice>
                                                <span>Valor no <b>PIX</b></span>
                                                <div className="discountPrice">
                                                    {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice)}
                                                    <span>(Economize: <b>R$ 50,00</b>)</span>                                        
                                                </div>                                                                          
                                            </PromotionalPrice> 
                                            <div onClick={handleSetFinalDeliveryPrice} className="button-buy" >IR PARA O PAGAMENTO</div>
                                            <Link to="/" style={{textDecoration: 'none'}}><div className="button-home">CONTINUAR COMPRANDO</div> </Link>
                                        </PricingInfo>
                                    </OrderInfo>
                                </OrderInfoContainer>  
                                </div>                      
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
                            </>                                                       
                            )}                              
                        </Content>
                    </Container>                
                </>
            )}
        </>
    )
};

const ProductPriceAndQuantityInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ProductEsseentials = styled.div`
    display: flex;
    flex-direction: row;
`;

const DeliveryService = styled.div`
    display: grid;
    grid-template-columns: 1fr fit-content(30%) fit-content(30%);

    label{
        font-size: 0.875rem;
        line-height: 1.125rem;
        min-width: 16rem;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(127, 133, 141);
        margin: 0.25rem 0px 0.25rem 1rem;

        @media(max-width: 600px){
            min-width: 0;
            margin: 0
        }

        .shipping{            
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            color: red;
            align-items: center;            
            width: 0.75rem;
            height: 0.75rem;            
            border: 1px solid var(--orange-text);
            border-radius: 50%;
            margin-right: 0.25rem;
            cursor: pointer;      

            @media(max-width: 600px){
                min-width: 0;                
            }
        }

        b{
            font-size: 0.875rem;
            line-height: 1.125rem;
            margin-right: 0.5rem;
            color: rgb(66, 70, 77);
        }

        
    }
    span{
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
        min-width: 11rem;
        text-align: right;

        @media(max-width: 600px){
            min-width: 0;            
        }
    }

    @media(max-width: 600px){
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

const DeliveryServiceForm = styled.div`
    display: flex;
    flex-direction: column;
`;


const DeliveryTitle = styled.h2`
    font-size: 1.25rem;
    line-height: 1.875rem;
    font-weight: 700;
    color: rgb(66, 70, 77);
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
`

const DeliveryPricing = styled.form`
    padding: 1.5rem;
    background: rgb(250, 250, 251);
    border-radius: 0.25rem;
    margin: 0 30px;    
`;


const PromotionalPrice = styled.div`
    display: flex;
    width: 85%;    
    flex-direction: column;
    margin: 2rem auto;
    padding: 2rem;
    background: rgb(229, 255, 241);
    color: rgb(31, 144, 80);

    .discountPrice{
        font-size: 1.875rem;
        line-height: 2.375rem;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 0.25rem;

        span{
            font-size: 0.875rem;
            line-height: 1.5rem;
            font-weight: 400;

            b {
                font-weight: bold;
            }
        }
    }    
`;

const TotalPrice = styled.div`
    display: flex;
    flex-direction: column;    
    margin: 0 20px;
    background: rgb(250, 250, 251);

    .prize{
        font-size: 0.75rem;
        line-height: 1.125rem;
        font-weight: 400;
        align-self: flex-end;
        color: rgb(127, 133, 141);
        word-break: break-all;
        padding-right: 10px; 
        padding-bottom: 10px; 

        b{
            font-size: 0.75rem;
            line-height: 1.125rem;
            font-weight: 700;
            color: inherit;
        }
    }

    .inside-card{
        margin-left: 3px; 

        b {
            font-size: 1rem;
            line-height: 1.75rem;
            font-weight: 700;
            color: rgb(66, 70, 77);
            text-align: right;  
            padding: 0px;          
        }
    }
`;

const Divider = styled.div`
    width: 85%;
    height: 0.0625rem;
    margin: 0 auto;
    background: rgb(222, 224, 228);
`;

const ProductPrice = styled.div`
    font-size: 0.75rem;
    line-height: 1.125rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.25rem 0.5rem;
    color: rgb(127, 133, 141);
    word-break: break-all;
    -webkit-box-align: center;
    align-items: center;
    margin-left: 30px;
    b {
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
        text-align: right;
        padding-right: 20px;
    }
    
`;

const OrderInfoContainer = styled.div`
    display: flex;    
    width: 35%;
    margin: 50px 10px;

    @media(max-width: 600px){
        width: 100%;
        margin: 0;
    }
    
`;

const PricingInfo = styled.div`
    .button-buy{
        background-color: rgb(255, 101, 0);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 1rem auto;
        max-width: 300px;
        height: 3rem;
        width: 85%;
        color: rgb(255, 255, 255);
        font-size: 1.125rem;
        line-height: 1.125rem;
        font-weight: 700;
        padding: 13px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 101, 0);
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .button-home{
        background-color: transparent;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 1rem auto;
        max-width: 300px;
        height: 3rem;
        width: 85%;
        color: var(--orange-text);
        font-size: 1.125rem;
        line-height: 1.125rem;
        font-weight: 700;
        padding: 13px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 101, 0);
        border-radius: 0.25rem;
        cursor: pointer;
    }
`;


const OrderInfo = styled.div`
    display: flex;        
    background: white;
    width: 100%;
    border-radius: 5px;
    flex-direction: column;
    position: sticky;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
`;

const ProductPriceSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;

    span{
        font-size: 0.75rem;
        line-height: 1.125rem;
        font-weight: 400;
        color: rgb(66, 70, 77);
        text-align: right;

        @media(max-width: 600px){
            text-align: center;
        }
    }

    .price{
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 700;
        color: rgb(252, 107, 15);
    }

    @media(max-width: 600px){
        width: 50%;
    }
`;


const RemoveProductButton = styled.button`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(231, 38, 38);
    background: transparent;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    margin: 5px auto;
    cursor: pointer;
`;

const Quantity = styled.div`
    display: flex;
    flex-direction: row;
    width: 100px;
    margin: 0 auto;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;    
    input {
        width: 50px;        
        text-align: center;
        cursor: pointer;
        outline: none;
        background: transparent;
    }
`;

const ProductQuantitySection = styled.div`
    flex-direction: column;
    width:25%;
    display: flex;

    span {
        font-size: 0.75rem;
        line-height: 1.125rem;
        font-weight: 400;
        color: rgb(66, 70, 77);
        text-align: center;
    }

    @media(max-width: 600px){
        width: 50%;
    }

    
`;


const ProductDescriptionSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    max-width: 50%;
    width: 100%;

    span{
        font-size: 0.75rem;
        line-height: 1.125rem;
        color: rgb(127, 133, 141);
    }

    p{
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        overflow: hidden;
        max-height: 3.375rem;
        color: rgb(66, 70, 77);
        text-decoration: none;
    }
`;

const ProductImageSection = styled.div`    

    img{
        object-fit: contain;
        width: 88px;
        height: 88px;
        margin: 0 20px;
    }
`;

const Product = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px;
    border-top: 1px solid rgb(242, 243, 244);
    align-items: center;

    @media(max-width: 600px){
        flex-direction: column;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    padding: 0 20px;    
    flex-direction: column;
`;

const Sender= styled.div`
    display: flex;
    width: 100%;        

    span, b {
        font-size: 0.75rem;
        line-height: 1.125rem;
        padding: 0px 0.25rem;
        width: fit-content;
        color: rgb(86, 92, 105);
        background: rgb(242, 243, 244);
    }
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`    

    background: transparent;
    margin-right: 0; 
    
    p{
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 700;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(231, 38, 38);
        background: transparent;
        border: 1px solid rgb(231, 38, 38);
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;    
    }

    cursor: pointer;
`;

const AddressOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 15px;
    padding-right: 20px;

    button {
        color: rgb(182, 187, 194);
        font-size: 0.75rem;
        line-height: 1.125rem;
        font-weight: 700;
        border: none;
        background: transparent;
        margin: 0 5px;
        cursor: pointer;

        
    }

    .isSelected{
        color: var(--orange-text);
    }
`;

const AddressInfoCard = styled.div`
    display: flex;    
    background-color: #FAFAFB;
    border-left: 5px solid #FC6B0F;
    margin: 10px 30px;
    border-radius: 5px;
    flex-direction: column;
    

    span {
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
        padding: 15px 0 10px 20px ;
    }

    p{
        font-size: 0.875rem;
        line-height: 1rem;
        font-weight: 400;
        margin-bottom: 0.25rem;
        color: rgb(127, 133, 141);
        padding-left: 20px;
    }
`;

const AddressCardTitle = styled.div`
    display: flex;
    width: 100%;    
    padding: 30px;
    align-items: center;
    justify-content: space-between;
    
    h2 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        margin-left: 1.5rem;

        @media(max-width: 600px){
            font-size: 15px;
            line-height: 1rem;
            text-align: center;
            margin-left: 0.5rem;
        }
    }
`;

const AddressCard = styled.div`
    display: flex;
    max-width: 900px;
    width: 100%;
    background: var(--white);
    margin-bottom: 40px;    
    border-radius: 5px;
    flex-direction: column;
    padding-bottom: 20px;

    &:first-child{
        margin-top: 50px;
    }

    &:last-child{
        margin: 0;
        margin-bottom: 50px;
    }
    
`;




const EmptyCart = styled.div`
    display: flex;
    max-width: 300px;
    width: 100%;
    margin: 50px auto;
    flex-direction: column;    
    justify-content: space-between;

    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        height: 50px;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        background-color: var(--orange-text);
        border-radius: 5px;
        margin-top: 100px;
        cursor: pointer;
    }

    h1 {
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-align: center;
    }

    span {
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-align: center;
    }
`;

const Content = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;

    .cartContent{
        display: flex;
        flex-direction: row;

        @media(max-width: 600px){
            display: flex;
            flex-direction: column;
        }
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    margin: 0;
    background-color: #F2F3F4;
`;