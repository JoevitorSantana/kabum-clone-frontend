import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { myOrders } from '../../actions/OrderActions';
import {Header} from '../../components/Header'
import {format} from 'date-fns'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { MdShoppingBasket } from 'react-icons/md';
import { Loader } from '../../components/Loader';

export function MyOrders(){

    const dispatch = useDispatch();

    const {loading, orders} = useSelector((state) => state.myOrder);    

    const [openDropDown, setOpenDropDown] = useState(false);    

    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch] );

    return(
        <>
        {loading ? (
            <Loader />
        ):(
            <>
                <Header />
                <Container>
                    <Content>
                        <PageTitle>
                            <MdShoppingBasket size={30} color="#FC6B0F"/>
                            <h1>MEUS PEDIDOS</h1>
                        </PageTitle>
                        {orders?.length === 0 ? (
                            <CardsContainer>
                                <Cards>
                                    <CardsContent>
                                        <CardMainInfo>
                                            <PageTitle><h1>VOCÊ NÃO POSSUI NENHUM PEDIDO!</h1></PageTitle>
                                        </CardMainInfo>                                    
                                    </CardsContent>
                                </Cards>
                            </CardsContainer>
                        ):(
                            <CardsContainer>
                                {orders && orders.map((order) => (
                                    <Cards>
                                        <CardsContent>
                                            <CardMainInfo>
                                                <CardSection>
                                                    <SectionTitle>
                                                        Número do pedido
                                                    </SectionTitle>
                                                    <ContentSection style={{overflow: 'hidden', fontSize: 10}}>
                                                        #{order._id}
                                                    </ContentSection>                                        
                                                </CardSection>
                                                <CardSection>
                                                    <SectionTitle>
                                                        Status
                                                    </SectionTitle>
                                                    <ContentSection>
                                                        {order.orderStatus === "Processing" ? (
                                                            <span className='processing'>EM ANDAMENTO</span>
                                                        ):(
                                                            <span>CONCLUÍDO</span>
                                                        )}
                                                    </ContentSection>
                                                </CardSection>
                                                <CardSection>
                                                    <SectionTitle>
                                                        Data
                                                    </SectionTitle>
                                                    <ContentSection>
                                                        { format(new Date(order.paidAt), 'dd/MM/yyyy')}
                                                    </ContentSection>                                        
                                                </CardSection>
                                                <CardSection>
                                                    <SectionTitle>
                                                        Pagamento
                                                    </SectionTitle>
                                                    <ContentSection>
                                                        {(order.paymentInfo.status === "succeeded") || (order.paymentInfo.status === "succeded") ? (
                                                            <span>PAGO</span>
                                                        ) : "PENDENTE"}
                                                    </ContentSection>
                                                </CardSection>
                                                <CardSection style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>                                        
                                                    <LinkDetails style={{color: 'var(--orange-text)'}}>DETALHES DO PEDIDO{openDropDown ? <IoIosArrowUp onClick={() => setOpenDropDown(false)} /> : <IoIosArrowDown onClick={() => setOpenDropDown(true)} /> } </LinkDetails>
                                                </CardSection>
                                            </CardMainInfo>
                                            <CardDetailedInfo style={openDropDown ? {} : {display: 'none'}}>
                                                <CardSection style={{width: '100%'}}>
                                                    <SectionTitle>Endereço</SectionTitle>
                                                    <ContentSection>
                                                        {order.shippingInfo.street}, {order.shippingInfo.number} <br />
                                                        CEP: {order.shippingInfo.cep} - {order.shippingInfo.city}, {order.shippingInfo.state}
                                                    </ContentSection>
                                                    <SectionTitle style={{display: 'flex', marginTop: 20, justifyContent: 'space-between'}}>
                                                        <div>Produto(s)</div>
                                                        <div>Total</div>
                                                    </SectionTitle>
                                                    {order.orderItems && order.orderItems.map((item) => (
                                                        <ProductInfo>
                                                            <ProductImage>
                                                                <img src={item.image} alt="img" />
                                                            </ProductImage>
                                                            <ProductDetails style={{justifyContent: 'space-between'}}>
                                                                <div>
                                                                    <p>{item.name}</p>
                                                                    <p>Quantidade: {item.quantity}</p>
                                                                </div>
                                                                <div>
                                                                    <p style={{fontSize: 20}}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.price)}</p>
                                                                </div>                                                                                                                        
                                                            </ProductDetails>                                                                                                                    
                                                        </ProductInfo>
                                                    ))}
                                                    <OrderPriceInfos>
                                                        <SectionTitle style={{display: 'flex', marginTop: 20, justifyContent: 'space-between'}}>
                                                            <div>Total Produto(s)</div>
                                                            <div>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(order.itemsPrice)}</div>
                                                        </SectionTitle>
                                                        <SectionTitle style={{display: 'flex', marginTop: 20, justifyContent: 'space-between'}}>
                                                            <div>FRETE</div>
                                                            <div>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(order.shippingPrice)}</div>
                                                        </SectionTitle>
                                                        <SectionTitle style={{color: '#1f9050', display: 'flex', marginTop: 20, justifyContent: 'space-between'}}>
                                                            <div>DESCONTO</div>
                                                            <div>-{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format((parseFloat(order.shippingPrice))+(order.itemsPrice) - order.totalPrice) }</div>
                                                        </SectionTitle>                                                    
                                                    </OrderPriceInfos>
                                                    <SectionTitle style={{borderRadius: 5, background: '#F2F3F4', display: 'flex', height: '50px', marginTop: 20, justifyContent: 'space-between'}}>
                                                        <div style={{marginLeft: '110px'}}>TOTAL</div>
                                                        <div style={{marginRight: '110px'}}>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(order.totalPrice)}</div>
                                                    </SectionTitle>
                                                </CardSection>
                                            </CardDetailedInfo>
                                        </CardsContent>
                                    </Cards>
                                ))}
                            </CardsContainer>                        
                        )}
                    </Content>
                </Container>            
            </>
        )}
        </>
    );    
}

const OrderPriceInfos = styled.div`
    display: flex;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;    
    flex-direction: column;
`;

const ProductDetails = styled.div`
    display: flex;
    flex-direction: row;    
    width: 100%;
    margin-left: 10px;

    p {
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 600;
        color: rgb(66, 70, 77);
        margin-bottom: 1rem;
    }
`;

const ProductImage = styled.div`
    width: 150px;
    height: 100px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;


    img {
        object-fit: contain;
        width: 130px;
        height: 80px;
        margin: auto;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin: 10px 0;
`;

const CardDetailedInfo = styled.div`
    display: flex;
    width: 100%;
    margin: 10px 0;
    border-top: 1px solid lightgray;
    padding-top: 10px;
`;

const CardMainInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;

    @media(max-width: 600px){
        flex-wrap: wrap;
    }
`;

const LinkDetails = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-decoration: underline;
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: rgb(255, 101, 0);
    cursor: pointer;
`;

const ContentSection = styled.div`
    display: flex;
    margin: 5px 0;
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: column;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 400;
    color: rgb(66, 70, 77);

    span {
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        color: rgb(45, 194, 110);
    }

    .processing{
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        color: #e72626;
    }
`;

const SectionTitle = styled.div`
    display: flex;    
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(66, 70, 77);
    width: 100%;
`;

const CardSection = styled.div`
    display: flex;
    width: 25%;
    flex-direction: column;

    @media(max-width: 600px){
       width: 50%; 
       margin: 0 10px 0 0;
    }
`;

const CardsContent = styled.div`
    display: flex;
    width: 100%;
    margin: 30px;
    flex-direction: column;
`;

const Cards = styled.div`
    display: flex;
    width: 100%;
    background: white;
    border-radius: 5px;  
    margin: 5px 0;  
`;

const CardsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;    
    margin: 10px 0;
`;

const PageTitle = styled.div`
    display: flex;
    width: 100%; 

    h1{
        display: flex;
        font-size: 24px;
        font-weight: bold;
        color: rgb(66, 70, 77);
        margin-left: 16px;
    }
`;

const Content = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    margin: 50px auto;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    background: #FAFAFB;
`;