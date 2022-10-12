import { BsFillCheckCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { HeaderCart } from "../../components/HeaderCart";

export function Success({history}){
    return(
        <>
            <HeaderCart />
            <Container>
                <Content>
                    <Card>
                        <Text>
                            <BsFillCheckCircleFill color="#2DC26E" size={50} style={{marginRight: 20}}/>
                            <h1>Pedido finalizado com sucesso</h1>
                        </Text>    
                        <button onClick={() => history.push('/orders')}>Ver meus pedidos</button>                    
                    </Card>
                </Content>
            </Container>
        </>
    );
}

const Text = styled.div`
    display: flex;
    margin: auto;   

    h1{
        font-size: 30px;
        font-weight: 700;
        color: gray;
        text-trasnform: uppercase;
    }
`;

const Card = styled.div`
    display: flex;
    width: 100%;
    margin: 20px;
    background: white;
    border-radius: 5px;
    height: 200px;
    flex-direction: column;
    align-items: center;

    button{
        max-width: 200px;
        width: 100%;
        height: 50px;
        background: var(--orange-text);
        color: white;
        margin: auto;
        font-weight: 700;
        border-radius: 5px;
        text-transform: uppercase;
        cursor: pointer;
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%; 
    background: #f2f3f4;       
`;

const Content = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    margin: auto;    
`;