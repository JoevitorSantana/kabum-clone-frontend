import styled from 'styled-components';
import loader from '../../assets/loader.gif'

export function Loader(){
    return(
        <Container>
            <img src={loader} alt="loader" />
        </Container>        
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    
    img {
        margin: 200px auto;
    }
`;