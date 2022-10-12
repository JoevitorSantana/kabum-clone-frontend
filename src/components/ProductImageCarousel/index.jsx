import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Slider from "react-slick";
import styled from "styled-components";

export function ProductImageCarousel(){

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

    let breakpoint = window.innerWidth;

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
            breakpoint: breakpoint <= 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
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
    

    return (
        <SliderContainer>
        <Slider {...settings}>            
            <Image>
                <img src='https://images.kabum.com.br/produtos/fotos/154985/samsung-smart-tv-60-crystal-uhd-4k-60au8000-dynamic-crystal-color-borda-infinita-visual-livre-de-cabos-alexa-built-in-un60au8000gxzd_1617635940_gg.jpg' alt='img'/>
            </Image>            
        </Slider>
    </SliderContainer>
    );
  }

const SliderContainer = styled.div`
    width: 500px;
    height: 500px;    
`;

const Image = styled.div`
  display: flex;
  background: red;
  width: 200px;
  height: 200px;
`;  