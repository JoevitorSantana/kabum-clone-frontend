import styled from "styled-components";
import { Header } from "../../components/Header";
import banner from '../../assets/banner_img.webp';
import { SilderCarousel } from "../../components/Slider";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../actions/ProductActions";
import { AiFillStar } from "react-icons/ai";
import { Loader } from "../../components/Loader";
import MetaData from "../../utils/Metadata";

export function Home(){

    const dispatch = useDispatch();
    const {products, error, loading} = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch, error]);

    return(
        <>
        {loading ? (
            <Loader />
        ):(
            <>
                <MetaData title="KaBooM! | Maior Ecommerce de Tecnologia e Games da América Latina"/>
                <Header />
                <Container>
                    <Content>                    
                            <Banner src={banner} alt="img"/>                                                
                        <ProductsContainer>
                            <ProductsContent>
                                <PageTitle>
                                    <h1>Outubro Gamer</h1>                                    
                                </PageTitle>  
                                <Slider>                                
                                    <SilderCarousel products={products}/>
                                    <SeeMore>VER TODOS &gt;</SeeMore>
                                    <ChairsBanner>
                                        <img src="https://themes.kabum.com.br/conteudo/ads/splashline/837.jpg" alt="img"/>
                                        <img src="https://themes.kabum.com.br/conteudo/ads/splashline/741.jpg" alt="img"/>
                                    </ChairsBanner>
                                    <NinjaSection>
                                        <AiFillStar color="orange"/>
                                        <h2>DESTAQUE NINJA</h2>                                    
                                    </NinjaSection>
                                    <SilderCarousel products={products}/>  
                                </Slider>                            
                            </ProductsContent>                        
                        </ProductsContainer>
                    </Content>
                </Container>
            </>
            )
        }
        </>
    )
} 

const SeeMore = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    margin-top: 0.625rem;
    color: rgb(255, 101, 0);
    cursor: pointer;

    @media(max-width: 600px){
        justify-content: center;
    }
`;

const Container = styled.div`
    display: flex;
    background-color: #081319;    

    @keyframes change-background-color{
        0%  {background-color: #081319;}
        50% {background-color: #F2F3F4}
    }
    
    animation: change-background-color 10s steps(1) infinite; /* IE 10+, Fx 29+ */    


`;

const Content = styled.div`    
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
`;

const Banner = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
object-position: center top;
    
    @media(max-width: 680px){
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    margin: -10px auto;    
    background: #081319;
    flex-direction: column;
`;

const ProductsContent = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
    flex-direction: column;
    background-color: #081319;
`;

const PageTitle = styled.div`
    display: flex;
    background: var(--orange-text);
    color: var(--white);
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;

    h1 {
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 800;
        text-transform: uppercase;        
    }
`;

const Slider = styled.div`
    display:flex;
    background: #fafafb;    
    padding: 50px;
    flex-direction: column;
`;

const ChairsBanner = styled.div`
    flex-direction: row;
    margin: 1rem auto;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    img {
        border-radius: 0.25rem;
        box-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
        width: 100%;
        max-width: 1280px;
        height: auto;
        border-radius: 0.25rem;
        box-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
    }

    @media(max-width: 600px){
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        img {
            width: 310px;
        }
    }
`;

const NinjaSection = styled.div`
    display: flex;
    width: 100%%;
    flex-direction: row;
    margin: 3rem 0;

    h2 {
        font-size: 1.25rem;
        line-height: 0.875rem;
        font-weight: 700;
        text-transform: uppercase;
        flex: 1 1 0%;
        color: rgb(66, 70, 77);
        padding-left: 0.3125rem;
        user-select: none;
    }
`;