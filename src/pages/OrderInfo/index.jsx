import { FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HeaderCart } from "../../components/HeaderCart";
import {MdShoppingBasket} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HiDocumentSearch} from 'react-icons/hi'
import axios from "axios";
import { useRef, useState } from "react";
import { Loader } from "../../components/Loader";

export function OrderDetails({history}){

    const dispatch = useDispatch();

    const {cartItems, shippingInfo, deliveryPrice} = useSelector((state) => state.cart);
    const {user, loading} = useSelector((state) => state.user)    

    const [deliveryPrices, setDeliveryPrices] = useState([]);    

    const [cep, setCep] = useState([]);

    const [finalDeliveryPrice, setFinalDeliveryPrice] = useState(0);
        

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

    let shippingPrice = parseFloat(deliveryPrice.finalDeliveryPrice);    
    

    let totalPrice = Price + parseFloat(deliveryPrice.finalDeliveryPrice);    
    
    let discountPrice = totalPrice - (Price * (15/100));
    

    let statusPercent = 20;

    const doughnutData = {
        datasets: [
            {
                backgroundColor: ['rgb(255, 101, 0)', 'lightgray'],
                borderColor: 'transparent',
                data: [statusPercent, 80]
            }
        ]
    };

    const options = {
        responsive: false,      
        aspectRatio: 50,         
        plugins: 
            {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },            
    }    

    const proceedToPayment = () => {
        const data = {
            Price,
            shippingPrice,
            discountPrice,
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    }
    

    return(
        <>
            {loading ? (<Loader />) : (
                <>
                    <HeaderCart />
                    <Container>
                        <Content>  
                            <LeftSection>
                                <AddressCard>
                                    <AddressCardTitle>
                                        <InfoSection>
                                            <FaTruck size={30} color="#FC6B0F"/>
                                            <h2>Informações do seu pedido</h2>
                                        </InfoSection>                                        
                                    </AddressCardTitle>                                    
                                    <UserInfoDetails>
                                        <UserInfoDetailsContainer>
                                            <UserInfoDetailsTitle>
                                                <h4>Dados pessoais</h4>
                                                <span>Informações que serão inseridas na nota fiscal</span>
                                            </UserInfoDetailsTitle>
                                            <DividerUserDetails />
                                            <UserDetailsContainer>
                                                <UserDetails>
                                                    <h4>{user.name}</h4>
                                                    <span><b>CPF/CNPJ: </b>{user.cpf}</span>                                                    
                                                    <span><b>Celular: </b></span>
                                                    <span><b>E-mail: </b>{user.email}</span>
                                                    <span><b>CEP: </b>{user.shippingInfo.cep}</span>
                                                </UserDetails>
                                            </UserDetailsContainer>
                                        </UserInfoDetailsContainer>
                                        <UserInfoDetailsContainer>
                                            <UserInfoDetailsTitle>
                                                <h4>Endereço de entrega</h4>
                                                <span>Este é o endereço onde seu pedido será enviado</span>
                                            </UserInfoDetailsTitle>
                                            <DividerUserDetails />
                                            <UserDetailsContainer>
                                                <UserDetails>
                                                    <h4>{user.shippingInfo.street}</h4>
                                                    <span><b>Número: </b>{user.shippingInfo.number}</span>
                                                    <span><b>Bairro: </b></span>
                                                    <span><b>CEP: </b>{user.shippingInfo.cep}</span>
                                                    <span><b>Cidade: </b>{user.shippingInfo.city}</span>                                                    
                                                </UserDetails>
                                            </UserDetailsContainer>                                                                                            
                                        </UserInfoDetailsContainer>
                                    </UserInfoDetails>                                                                        
                                </AddressCard>  
                                <AddressCard>
                                    <AddressCardTitle>
                                        <InfoSection>
                                            <MdShoppingBasket size={30} color="#FC6B0F"/>
                                            <h2>Lista de Produtos</h2>                                
                                        </InfoSection>                                                                        
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
                                                        <span>Com desconto cartão: <b style={{fontSize: 11}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price * item.quantity)}</b></span>
                                                        <span>Parcelado no cartão em até <b style={{fontSize: 11}}>10x</b> sem juros <b style={{fontSize: 11}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format((item.price * item.quantity) / 10)}</b></span>
                                                    </ProductDescriptionSection>
                                                </ProductEsseentials>
                                                <ProductPriceAndQuantityInfo>
                                                    <ProductQuantitySection>
                                                        <span>Quant.</span>
                                                        <Quantity>                                                        
                                                            <input disabled value={item.quantity}/>                                                        
                                                        </Quantity>                                                    
                                                    </ProductQuantitySection>
                                                    <ProductPriceSection>
                                                        <span>Preço à vista no Cartão</span>
                                                        <span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price * item.quantity)}</span>
                                                    </ProductPriceSection>
                                                </ProductPriceAndQuantityInfo>
                                            </Product>
                                        ))}
                                    </ProductInfo>
                                    {!deliveryPrice ? (
                                        <></>
                                    ):(
                                        <DeliveryPricing ref={cepForm} onSubmit={cepSubmit}>
                                            <DeliveryTitle><FaTruck size={20} style={{marginRight: 10}} color="#FC6B0F"/>FRETE</DeliveryTitle>                                                                                                    
                                            <DeliveryServiceForm>                                                 
                                                    <DeliveryService>                                                                                                        
                                                        <label htmlFor={deliveryPrice.finalService}>                                                                                                                                                                                   
                                                            <b>{deliveryPrice.finalService === '04014' ? 'SEDEX' : 'PAC'}</b>
                                                            -
                                                            Em até {deliveryPrice.finalDeliveryPrize} dias úteis
                                                        </label>
                                                        <span>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(deliveryPrice.finalDeliveryPrice)}</span>
                                                    </DeliveryService>                                                
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
                                            Frete: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(deliveryPrice.finalDeliveryPrice)}</b>
                                        </ProductPrice>
                                        <TotalPrice>
                                            <ProductPrice className="inside-card">
                                                Valor Total: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice)}</b>
                                            </ProductPrice>
                                            <span className="prize">(Em até <b>12x</b> de <b>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice / 12)}</b>)</span>
                                        </TotalPrice>
                                        <PromotionalPrice>
                                            <span>Valor no <b>Cartão</b></span>
                                            <div className="discountPrice">
                                                {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(discountPrice)}
                                                <span>(Economize: <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Price * (15/100))}</b>)</span>
                                            </div>                                                                          
                                        </PromotionalPrice> 
                                        <div onClick={proceedToPayment} className="button-buy" >FINALIZAR</div>
                                        <Link to="/" style={{textDecoration: 'none'}}><div className="button-home">VOLTAR</div> </Link>
                                    </PricingInfo>
                                </OrderInfo>
                            </OrderInfoContainer>                        
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

const DividerUserDetails = styled.div`
    display: flex;
    width: 100%;
    margin: 10px 0;
    height: 1px;
    background: #F2F3F4;
`;

const UserDetails = styled.div`
    display: flex;
    width: 100%;
    margin: 20px;
    flex-direction: column;

    span{
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 400;
        color: rgb(86, 92, 105);

        b{
            font-size: 0.875rem;
            line-height: 1.5rem;
            font-weight: 700;
        }
    }

    h4 {
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
    }
`;

const UserDetailsContainer = styled.div`
    display: flex;
    width: 100%;
    background: #fafafb;
    border-radius: 5px;
    margin: 10px 0;    
`;

const UserInfoDetailsContainer = styled.div`
    width: 100%;
    margin: 20px 30px;
`;

const UserInfoDetailsTitle = styled.div`
    display: flex;
    flex-direction: column;

    span {
        font-size: 14px;
        color: rgb(127, 133, 141);
        font-weight: 400;
    }

    h4{
        font-size: 20px;
        font-weight: 700;
        color: rgb(66, 70, 77);
    }
`;

const UserInfoDetails = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column.
    margin: 20px;

    @media(max-width: 600px){
        flex-wrap: wrap;
    }
`;

const Stars = styled.div`
    display: flex;
    width: 100px;
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
    }

    .price{
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 700;
        color: rgb(252, 107, 15);
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
    justify-content: center;
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

const IconArea = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;    

    label{
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: rgb(255, 101, 0);
        margin-top: 5px;
    }
`;

const TrackArea = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
`;

const StatusOrder = styled.div`
    display: flex;
    flex-direction: row;
    margin: 50px auto;
    width: 10%;
    justify-content: center;
    align-items: center;
    
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
    flex-direction: row;

    @media(max-width: 600px){
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    margin: 0;
    background-color: #F2F3F4;
`;
/*<StatusOrder>                            
                                <Doughnut options={options} data={doughnutData}/>                                                                             
                                <TrackArea>
                                    <IconArea>
                                        <FaShoppingCart color="#FC6B0F" size={40}/>
                                        <label>Carrinho</label>                        
                                    </IconArea>
                                    <IconArea>
                                        <FaShoppingCart color="#FC6B0F" size={40}/>
                                        <label>Carrinho</label>                        
                                    </IconArea>
                                    <IconArea>
                                        <FaShoppingCart color="#FC6B0F" size={40}/>
                                        <label>Carrinho</label>                        
                                    </IconArea>
                                    <IconArea>
                                        <FaShoppingCart color="#FC6B0F" size={40}/>
                                        <label>Carrinho</label>                        
                                    </IconArea>
                                    <IconArea>
                                        <FaShoppingCart color="#FC6B0F" size={40}/>
                                        <label>Carrinho</label>                        
                                    </IconArea>
                                </TrackArea>
                    </StatusOrder>*/