import styled from "styled-components";

export const Container = styled.div`
    display: flex;    
    width: 100%;
    background-color: var(--white);    

    .carousel{
        width: 500px;
        height: 500px;        

        img {
            width: 100%;
            object-fit: contain;
        }
    }
`;

export const Content = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    flex-direction: column;
    margin: 20px auto;  
    padding: 15px;  
    
    .button-large{
        margin-top: 20px;
        background-color: rgb(255, 101, 0);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        max-width: 100%;
        height: 3rem;
        width: 100%;
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
    
    @media(min-width: 1024px){
        .button-large{
            display: none;
        }
    }

`;

export const Title = styled.h1`
    display: flex;    
    align-items: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    color: rgb(66, 70, 77);
    margin: 0.75rem 0px;
    
    @media(max-width: 1024px){
        font-size: 1rem;        
    }
`;

export const ProductSection = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-top: 20px;
    justify-content: space-between;

    @media(max-width: 740px){
        flex-wrap: wrap;    
    }
`;

export const ProductImageSection = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    flex-direction: column; 
    margin-right: 10px;   

    .CarouselImage{
        max-width: 600px;
        object-fit: contain;
        margin: 0 auto;
        width: auto;
    }
`;

export const ProductRatingSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

export const RatingSection = styled.div`
    display: flex;    
    flex-direction: row;
    align-items: center;
    margin: 0 auto;

    img {
        width: 70px;
        height: 1.75rem;
        aspect-ratio: auto 70 / 28;
    }

    p {
        font-size: 0.75rem;
        font-weight: 400;
        color: rgb(127, 133, 141);
        text-align: right;
        line-height: 0.875rem;
        margin-top: 0.25rem;
    }
    
`;

export const Divider = styled.div`
    height: 3rem;
    width: 0.0625rem;
    background: rgb(222, 224, 228);
`;

export const ProductImage = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    max-width: 600px;
    width: 100%;
`;


export const CarouselImages = styled.div`
    display: flex;
    flex-direction: column;
    @media(max-width: 1024px){
        display: none;
    }
`;

export const SmallImage = styled.img`
    width: 48px;
    height: 54px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin: 5px;
    object-fit: contain;
    @media(max-width: 1024px){
        display: none;
    }
`;

export const MainImage = styled.div`   
    display: flex;     
    width: 100%;
    flex-direction: row;   
    
    
    img {
        width: 100%;
        height: 400px;
        object-fit: contain;
    }
`;

export const DeliveryCalc = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%; 
    margin: 50px 0;      
    flex-direction: column; 

    span{
        font-size: 1rem;
        line-height: 1.75rem;
        font-weight: 700;
        align-items: center;
        color: rgb(66, 70, 77);
    }
`;

export const InputSection = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;        
    height: 50px;
    margin-bottom: 20px;

    @media(max-width: 500px){
        flex-wrap: wrap;
    }

    a {
        font-size: 0.875rem;
        line-height: 0.875rem;
        font-weight: 700;
        flex-shrink: 0;
        text-decoration: underline;
        color: rgb(255, 101, 0);
    }
`;

export const ProductInfoSection = styled.div`
    display: flex;
    flex-direction: column; 
    max-width: 600px;
    width: 100%;   
`;

export const BannerPromotional = styled.div`
    display: flex;    
    width: 100%;
    background-color: var(--orange-strong);
    height: 60px;
    border-radius: 5px 5px 0 0;
`;

export const EndPromotion = styled.div`
    display: flex;
    margin: 10px;    
    

    h1 {
        font-size: 1.5rem;
        line-height: 2.125rem;        
        font-weight: 700;
        flex: 1 1 auto;
        -webkit-box-align: center;
        align-items: center;
        position: absolute;
        right: 10.5rem;
        flex-direction: initial;
        text-transform: uppercase;
        color: white;
        align-items: center;
    }
`;

export const EndPromotional = styled.div`
    display: flex;    
    width: 100%;
    background-color: var(--orange-text);
    height: 60px;
    border-radius:  0 0 5px 5px;
`;

export const DownPromotion = styled.div`
    display: flex;
    width: 100%;
    margin: 10px 10px;  
    align-items: center;  
    flex-direction: row;
    justify-content: space-between;   
    align-items: center;     

    .section{
        max-width: 284px;
        width: 100%;
    }
`;

export const SenderInfo = styled.div`
    margin: 30px 0;
    display: flex;
    width: 100%;
    flex-direction: column;

    p {
        font-size:1rem;
        line-height: 1.125rem;
        font-weight: 400;
        text-align: start;
        position: relative;
        color: rgb(66, 70, 77);
        margin-bottom: 0.5rem;
    }
    
    span {
        font-size: 0.875rem;
        line-height: 1.3125rem;
        color: rgb(127, 133, 141);
        text-decoration: line-through;
    }
`;

export const Price = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .button-buy{
        background-color: rgb(255, 101, 0);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin: 1rem 10px;
        max-width: 300px;
        height: 3rem;
        width: 100%;
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

    @media(max-width: 1024px){
        .button-buy{
            display: none;
        }
    }    

    h4 {
        font-size: 2.5rem;
        line-height: 3rem;
        font-weight: 700;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(255, 101, 0);
    }

    .link {
        text-decoration: none;
        font-size: 0.875rem;
        line-height: 1.5rem;
        display: flex;
        margin-top: 0.5rem;
        margin-left: 0.0625rem;
        background: transparent;
        border: none;
        text-decoration: underline;
        color: rgb(86, 92, 105);
    }
`;

export const FreteOptions = styled.div`
    display: flex;    
    width: 100%;        
`;


export const DeliveryService = styled.div`
    display: grid;
    grid-template-columns: 1fr fit-content(30%) fit-content(30%);

    label{
        font-size: 0.875rem;
        line-height: 1.125rem;        
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(127, 133, 141);
        margin: 0.25rem 0px 0.25rem 1rem;

        @media(max-width: 600px){
            font-size: 10px;
        }

        .shipping{
            border: 1px solid rgb(255, 101, 0);
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            appearance: none;
            width: 0.75rem;
            height: 0.75rem;
            outline: none;
            border: 1px solid rgb(86, 92, 105);
            border-radius: 50%;
            margin-right: 0.25rem;
            cursor: pointer;

            @media(max-width: 600px){
                font-size: 10px;
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
        min-width: 10rem;
        text-align: right;
    }
`;

export const DeliveryServiceForm = styled.div`
    display: flex;
    flex-direction: column;
`;


export const DeliveryTitle = styled.h2`
    font-size: 1.25rem;
    line-height: 1.875rem;
    font-weight: 700;
    color: rgb(66, 70, 77);
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
`

export const DeliveryPricing = styled.div`
    padding: 1.5rem;
    background: rgb(250, 250, 251);
    border-radius: 0.25rem;    
`;