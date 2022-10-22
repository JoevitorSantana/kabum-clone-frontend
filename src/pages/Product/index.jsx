import { Rating } from "@material-ui/lab";
import { useEffect, useRef, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsHeart, BsShare } from "react-icons/bs";
import Carousel from 'react-material-ui-carousel'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/ProductActions";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import {TbDiscount2} from 'react-icons/tb';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BannerPromotional, CarouselImages, Container, Content, DeliveryCalc, DeliveryPricing, DeliveryService, DeliveryServiceForm, DeliveryTitle, Divider, DownPromotion, EndPromotion, EndPromotional, FreteOptions, InputSection, Price, ProductImage, ProductImageSection, ProductInfoSection, ProductRatingSection, ProductSection, RatingSection, SenderInfo, SmallImage, Title } from "./styles";
import { FaBoxes, FaShoppingCart, FaTruck } from "react-icons/fa";
import { addItemsToCart } from '../../actions/CartActions';
import styled from "styled-components";
import MetaData from '../../utils/Metadata';
import axios from "axios";

export function ProductDetails({match}){

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const [deliveryPrices, setDeliveryPrices] = useState([]);    

    const [cep, setCep] = useState([]);

    const cepSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('cep', cep);
        myForm.set('nVlAltura', product.nVlAltura);
        myForm.set('nVlLargura', product.nVlLargura);
        myForm.set('nVlComprimento', product.nVlComprimento);
        myForm.set('nVlPeso', product.nVlPeso);
        axios.post('/api/v2/entrega', myForm).then((response) => setDeliveryPrices(response.data)).catch((error) => console.log(error))
    }    

    const cepForm = useRef(null);     
    
    const quantity = 1

    const addToCartHandler = () =>{
        if(product.Stock > 0){
            dispatch(addItemsToCart(match.params.id, quantity)); 
            toast.success("Adicionado ao carrinho!");
        } else {
            toast.error("Estoque esgotado!")
        }
    }

    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error]);        

    return(
        <>
            {loading ? (
                <Loader />
            ):(
                <>
                    <MetaData title={`${product.name}`}/>
                    <Header />
                    <Container>
                        <Content>
                            <Title>{product.name}</Title>
                            <ProductSection>
                                <ProductImageSection>
                                    <ProductRatingSection>
                                        <RatingSection>
                                            <img src="https://images6.kabum.com.br/produtos/fabricantes/logo-intel.jpg" alt="img" />
                                        </RatingSection>
                                        <Divider />
                                        <RatingSection>
                                            <Rating value={product.ratings} readOnly={true} precision={0.5}/>
                                            <p>({product.numOfReviews}) reviews</p>
                                        </RatingSection>
                                        <Divider />
                                        <RatingSection>
                                            <BsShare size={25} style={{margin: 20}} color="gray"/>
                                            <BsHeart size={25} color="gray"/>
                                        </RatingSection>
                                    </ProductRatingSection>
                                    <ProductImage>
                                        <CarouselImages>           
                                            {product.images && product.images.map((item, i) => (
                                                <SmallImage
                                                    key={i}
                                                    src={item.url}
                                                    alt={`${i} Slide`}                                        
                                                />                                        
                                            ))}                                                         
                                        </CarouselImages>
                                        <Carousel 
                                            className="carousel"
                                            NextIcon={<BsFillArrowRightCircleFill />}                                            
                                            PrevIcon={<BsFillArrowLeftCircleFill />} 
                                            indicatorIconButtonProps={{
                                                style: {
                                                    padding: '10px',    // 1
                                                    color: 'lightgray'       // 3
                                                }
                                            }}
                                            activeIndicatorIconButtonProps={{
                                                style: {
                                                    color: 'var(--orange-text'
                                                }
                                            }}
                                            fullHeightHover={false} 
                                            navButtonsProps={{
                                                style: {
                                                    background: 'none'
                                                }
                                            }}
                                        >
                                            {product.images && product.images.map((item, i) => (
                                                <img key={i} src={item.url} alt={`${i} Slide`}  />
                                            ))}
                                        </Carousel>                                                                                  
                                    </ProductImage> 
                                    <DeliveryCalc>
                                        <span>Consultar frete e prazo de Entrega</span>
                                        <InputSection ref={cepForm} onSubmit={cepSubmit}>                                              
                                              <input style={{height: 45, width: 300, borderRadius: 5, paddingInlineStart: 10, border: '1px solid lightgray', margin: '0 10px 0 0'}} type="text" name="cep" value={cep} onChange={(e) => setCep(e.target.value)}/>
                                              <button style={{width: 50, cursor: 'pointer', height: 50, background: 'white', fontWeight: 700, color: 'var(--orange-text)',borderRadius: 5, border: '1px solid var(--orange-text)'}} type="submit">OK</button>                                              
                                              <a href="  " style={{marginLeft: 10}}>NÃO LEMBRO MEU CEP</a>
                                        </InputSection>
                                    </DeliveryCalc>                                   
                                </ProductImageSection>
                                <ProductInfoSection>
                                    <BannerPromotional>
                                        <EndPromotion>                                            
                                            
                                        </EndPromotion>                                        
                                    </BannerPromotional>
                                    <EndPromotional>
                                        <DownPromotion>  
                                            <TbDiscount2 size={50} color="white" />   
                                            <DiscountSection style={{borderRight: '1px solid white'}}>                                            
                                                <span>Desconto: </span>
                                                <b>15%</b>
                                            </DiscountSection>
                                            <StockSection>
                                                <FaBoxes size={40} style={{marginRight: 10, paddingTop: 10}} color="white" />
                                                <span>Restam: </span>
                                                <b> {product.Stock} un.</b>
                                            </StockSection>                                                                            
                                        </DownPromotion>                                        
                                    </EndPromotional>
                                    <SenderInfo>
                                        <p>Vendido e entregue por: KaBuM! | {product.Stock >= 1 ? <b
                                            style={{
                                                color: 'green',
                                                fontSize: '0.875rem',
                                                lineHeight: '1.125rem',
                                                fontWeight: 700,
                                        }}                                        
                                        >Em estoque</b> : 'Indisponível'}</p>
                                        <span>R${product.price}</span>
                                        <Price>
                                            <h4>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</h4>
                                            <div className="button-buy" onClick={addToCartHandler} ><FaShoppingCart size={20} style={{margin: 10}}/> Comprar</div>
                                        </Price>
                                        <p>À vista no PIX</p>

                                        <p>Em até <b>10x</b> de <b>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price / 10)}</b> sem juros no cartão</p>

                                        <p className="link">Ver mais opções de pagamento</p>

                                    </SenderInfo>
                                    {deliveryPrices.length === 0 ? (
                                        <></>
                                    ):(
                                        <FreteOptions>
                                            <DeliveryPricing>
                                                <DeliveryTitle><FaTruck size={20} style={{marginRight: 10}} color="#FC6B0F"/>FRETE</DeliveryTitle>
                                                {deliveryPrices.response && deliveryPrices.response.map((price, i) => (
                                                    <DeliveryServiceForm key={i}>
                                                        <DeliveryService>                                                
                                                            <label>                                                        
                                                                <b>{price.Codigo === '04014' ? 'SEDEX' : 'PAC'}</b>
                                                                -
                                                                Em até {price.PrazoEntrega} dias úteis
                                                            </label>
                                                            <span>{price.Valor}</span>
                                                        </DeliveryService>
                                                    </DeliveryServiceForm>
                                                ))}
                                            </DeliveryPricing> 
                                        </FreteOptions>
                                    )}                                    
                                </ProductInfoSection>                                
                            </ProductSection>                            
                            <div className="button-large" onClick={addToCartHandler} ><FaShoppingCart size={20} style={{margin: 10}}/> Comprar</div>
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
                </>                       

            )}
        </>
         
    );
}

const StockSection = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
    align-items: baseline;
    padding-bottom: 10px;

    span {
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 400;
        color: rgb(255, 255, 255);

        @media(max-width: 600px){
            font-size: 15px;
        }
    }
    b {
        font-size: 1.5rem;
        line-height: 2.125rem;
        font-weight: 700;
        color: #fff;

        @media(max-width: 600px){
            font-size: 15px;
        }
    }
`;

const DiscountSection = styled.div`
    display: flex;
    width: 50%; 
    align-items: baseline;

    span {
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 400;
        color: rgb(255, 255, 255);

        @media(max-width: 600px){
            font-size: 15px;
        }

    }

    b {
        font-size: 1.5rem;
        line-height: 2.125rem;
        font-weight: 700;
        color: #fff;

        @media(max-width: 600px){
            font-size: 15px;
        }
    }
`;