import { AdminHeader } from "../../components/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/Loader";
import { DrawerNavigator } from "../../components/DrawerNavigator";
import { Table } from "../../components/Table";
import { ToastContainer } from "react-toastify";
import { UserTable } from "../../components/UserTable";

export function UserList(){
    const {loading} = useSelector((state) => state.user)
    return(
        <>
           {loading ? (
                <Loader />
            ):(
            <>
                <AdminHeader />
                    <Container>
                        <Content>
                            <DrawerNavigator />
                            <ListContainer>
                                <ListContent>
                                    <Title><h1>Lista de Usuários</h1></Title>
                                    <Products>
                                        <UserTable />
                                    </Products>
                                </ListContent>
                            </ListContainer>
                        </Content>                              
                    </Container>   
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
                </>
            )} 
        </>
    )
}
const Products = styled.div`
    margin: 20px auto;
    width: 100%;
`;

const Title = styled.div`
    margin: 20px;
    h1{
        font-size: 20px;
        font-weight: 700;      
    }
`;

const ListContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    background: #fff;
`;

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