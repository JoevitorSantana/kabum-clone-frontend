import styled from "styled-components";
import { DrawerNavigator } from "../../components/DrawerNavigator";
import { AdminHeader } from "../../components/Header";


export function Dashboards(){
    return(
        <>            
            <AdminHeader />
            <Container>
                <Content>
                    <DrawerNavigator />                                                      
                </Content>                              
            </Container> 
        </>
    );
}; 

const Content = styled.div`
max-width: 1280px;
width: 100%;    
display: flex;
flex-direction: row;
margin: 0 auto;
`;

const Container = styled.div`
display: flex;
width: 100%;
background: #E5E5E5;
`;