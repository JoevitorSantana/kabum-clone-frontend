import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {BsArrowLeftCircle, BsArrowRightCircle, BsCartFill} from 'react-icons/bs' 
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

export function SilderCarousel({products}){    

    function LeftArrow(props){

        const {onClick, className, style} = props

        return(
            <BsArrowLeftCircle 
                color="gray"
                className={className}
                style={{...style, zIndex: '999', width: 30, height: 30, marginRight: '10px', color: 'gray'}}
                onClick={onClick}
            />
        )
    }

    function RightArrow(props){
        const {onClick, style, className} = props;
        return(
            <BsArrowRightCircle 
                color="gray"                
                className={className}
                style={{...style, width: 30, height: 30, marginLeft: '30px', display: 'block'}}
                onClick={onClick}
            />
        )
    }

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return(
        <SliderContainer>
            <Slider {...settings}>
                { products && products.map((product) => (
                <Link key={product._id} className="link" to={`/product/${product._id}`}>
                <CardItem>
                    <CartContent>
                        <CardHeader>
                            <Boxes>
                                <Quantity style={{background: 'var(--orange-text)', alignItems: 'center'}}>
                                    <span style={{color: 'white', fontSize: '15px', marginTop: '10px', marginBottom: '-2px'}}>{product.discountPrice}%</span>
                                    <small style={{color: 'white'}}><AiFillCaretDown /></small>
                                </Quantity>
                            </Boxes>                            
                            <Quantity>
                                <small>RESTAM</small>
                                <span>{product.Stock}</span>
                                <small>UNID.</small>
                            </Quantity>
                            <Stars>
                                <Rating 
                                    value={product.ratings}
                                    readOnly={true}
                                    precision={0.5}                                    
                                />
                                <p>({product.numOfReviews}) reviews</p>
                            </Stars>
                        </CardHeader>
                        <CardBody>
                            <CardImage>
                                <img src={product.images[0].url} alt={product.name} />
                            </CardImage>
                            <DescriptionCard>
                                <CardDescription>
                                    <h2><span>{product.name}</span></h2>
                                </CardDescription>
                                <Price>
                                    <span className="normalPrice">{product.discountPrice > 0 ? `R$${product.discountPrice}` : ""}</span>
                                    <span className="promotionalPrice">{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</span>
                                    <span className="paymentMethod" >À vista no PIX</span>
                                </Price>
                            </DescriptionCard>
                        </CardBody>                                                
                        <Button>                            
                            <button className="button-buy"><BsCartFill style={{ margin: '5px' }} color="white"/>COMPRAR</button>
                        </Button>
                    </CartContent>
                </CardItem>
                </Link>
                ))
                }                              
            </Slider>
        </SliderContainer>
    )
}

const DescriptionCard = styled.div`
    @media(max-width: 600px){
        display: flex;
        flex-direction: column;
    }
`;

const CardBody = styled.div`
    @media(max-width: 600px){
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
`;

const Boxes = styled.div`    
    &:first-child{
        margin-right: -20px;
    }

    @media(max-width: 600px){
        display: none;
    }
`;

const SliderContainer = styled.div`
    width: 100%;

    .link{
        text-decoration: none;
    }
`;

const CardItem = styled.div`
    display: flex;
    max-width: 214px;
    width: 100%;
    height: 432px;
    background: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 0 4px;


    &:first-child{
        margin-left: 10px;
    }

    @media(max-width: 600px){
        max-width: 290px;
        width: 100%;
        height: 200px;
    }
`;

const CartContent = styled.div`
    display: flex;
    padding: 8px;
    width: 100%;
    flex-direction: column;
`;

const CardHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    height: 48px;    
`;

const Quantity = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    background: transparent;
    border: 1px solid rgb(255, 101, 0);    

    span {
        font-size: 0.6875rem;
        line-height: 0.75rem;
        font-weight: 700;
        margin: 0.125rem 0px;
        color: rgb(255, 101, 0);
    }

    small {
        font-size: 0.5rem;
        line-height: 0.5rem;
        font-weight: 400;
        margin-top: 0.0625rem;
        color: rgb(255, 101, 0);
    }

    @media(max-width: 600px){
        display: none;
    }

`;

const Stars = styled.div`
    display: flex;
    flex-direction: column;

    p {
        font-size: 0.625rem;
        font-weight: 400;
        color: rgb(127, 133, 141);
        text-align: right;
        line-height: 0.875rem;
        margin-top: 0.25rem;
    }

    @media(max-width: 600px){
        display: flex;
        flex-direction: row;
    }
`;

const CardImage = styled.div`

    display: flex;
    width: 100%;

    img {
        display: block;    
        height: 162px;
        max-width: 214px;
        width: 100%;
        object-fit: contain;
        margin: 0 auto;
    }

    @media(max-width: 600px){
        width: 50%;
        margin-right: 10px;
        img{
            width: 80px;
            height: 80px;
            object-fit: contain;
        }
    }
    
`;

const CardDescription = styled.div`
    display: flex;
    width: 90%;   
    margin-top: 10px; 
    padding: 5px;

    span{
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 600;
        margin-top: 0.5rem;
        color: rgb(66, 70, 77);   
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 3.375rem; 
    }

    @media(max-width: 600px){
        span{
            font-size: 10px;
        }
    }
    
`;

const Price = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;

    .normalPrice{
        font-size: 0.75rem;
        line-height: 1.375rem;
        font-weight: 400;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 0.75rem;
        color: rgb(127, 133, 141);
        text-decoration: line-through;

        @media(max-width: 600px){
            font-size: 8px;
            margin: 0;
        }
    }

    .promotionalPrice{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin-bottom: 0.25rem;
        margin-top: 0.25rem;
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 700;
        height: 1.25rem;
        color: rgb(255, 101, 0);

        @media(max-width: 600px){
            font-size: 15px;
            margin: 0;
        }
    }

    .paymentMethod{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        height: 0.75rem;
        color: rgb(127, 133, 141);
        @media(max-width: 600px){
            font-size: 8px;
        }
    }
`;
const Button = styled.div`
    display: flex;
    width: 100%;
    border-radius: 5px;
    height: 40px;
    background: var(--orange-text);
    margin-top:20px;    
    align-items: center;

    .button-buy{
        font-size: 0.75rem;
        border-radius: 0.25rem;
        line-height: 1.125rem;
        font-weight: 700;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: rgb(255, 255, 255);
        cursor: pointer;
        background: rgb(255, 101, 0);
    }
    
`;