import styled from "styled-components";
import {MdSpaceDashboard} from 'react-icons/md'
import {MdLibraryAdd} from 'react-icons/md'
import {FaShoppingBasket, FaUserAlt, FaUserPlus} from 'react-icons/fa'
import {GrUnorderedList} from 'react-icons/gr'
import { Link } from "react-router-dom";

export function DrawerNavigator(){
    return(
        <>
            <Container>
                <Content>
                    <Drawer>
                        <Option>
                            
                            
                            <Link to="/admin/dashboard" style={{textDecoration: 'none', color: 'inherit'}}><MdSpaceDashboard style={{margin: '0 10px'}}/><span>Dashboards</span></Link>
                        </Option>
                        <Option>
                            
                            
                            <Link to="/admin/product" style={{textDecoration: 'none', color: 'inherit'}}><MdLibraryAdd style={{margin: '0 10px'}}/><span>Criar produto</span></Link>
                        </Option>
                        <Option>
                            
                            
                            <Link to="/admin/products" style={{textDecoration: 'none', color: 'inherit'}}><FaShoppingBasket style={{margin: '0 10px'}}/><span>Produtos</span></Link>
                        </Option>
                        <Option>
                        <Link to="/admin/users" style={{textDecoration: 'none', color: 'inherit'}}>

                            <FaUserAlt style={{margin: '0 10px'}}/>
                            <span>Usuários</span>
                            </Link>
                            
                        </Option>
                        <Option>
                            <FaUserPlus style={{margin: '0 10px'}}/>
                            <span>Criar Usuário</span>
                            
                        </Option>
                        <Link to="/admin/orders" style={{textDecoration: 'none', color: 'inherit'}}>
                            <Option>
                                <GrUnorderedList style={{margin: '0 10px'}}/>
                                <span>Pedidos</span>                            
                            </Option>                        
                        </Link>
                    </Drawer>
                </Content>
            </Container>
        </>
    );
};

const Option = styled.div`
    display: flex;
    flex-direction: row;    
    margin: 0 10px;
    height: 50px;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        background: lightgrey;
    }

    &:first-child{
        margin-top: 10px;
    }

    &:last-child{
        margin-bottom: 10px;
    }

    @media(max-width: 600px){
        span{
            display: none;            
        }
    }
`;

const Drawer = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
`;

const Content = styled.div`
    margin: 10px;    
`;

const Container = styled.div`
    max-width: 300px;
    width: 100%;
    color: gray;

    @media(max-width: 600px){
        width: 18%;
    }
`;