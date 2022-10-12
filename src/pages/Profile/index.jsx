import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Header } from "../../components/Header";
import Avatar from "@material-ui/core/Avatar";
import { HiMail } from 'react-icons/hi'
import { IoMdSettings } from 'react-icons/io'
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
// import { FaShoppingCart } from "react-icons/fa";
import {MdOutlineAdminPanelSettings} from 'react-icons/md';
import { AiFillCamera } from "react-icons/ai";
import { useState } from "react";
import { updateProfile } from "../../actions/userActions";

export function Profile({history}){

    const dispatch = useDispatch();

    const {user, isAuthenticated, loading} = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated === false){
            history.push("/login");
        }
    }, [history, isAuthenticated]);

    return(
        <>
            {loading ? (
                <Loader />
            ):(
                <>
                    <Header />
                    <Container>
                        <Content>
                            <UserName>
                                <Card>             
                                    <AvatarUpload>
                                        { user.avatar ? <Avatar className="avatar" alt={user.name} src={user.avatar.url}/> : <Avatar className="avatar" alt={user.name} src='/profile.png'/>}
                                        <ButtonCam><AiFillCamera /></ButtonCam>
                                    </AvatarUpload>                                                   
                                    <Infos>
                                        <Name>Bem-vindo, {user.name}</Name>
                                        <Email><HiMail size={20} color="warning" /> {user.email}</Email>                                        
                                    </Infos>          
                                    <Link to="/me/details"><IoMdSettings className="engine"/></Link>
                                </Card>
                                <Card>
                                    <Infos>
                                        <span className="infos">Crédito Disponível</span>
                                        <span className="credits">R$ 0,00</span>
                                    </Infos>                            
                                </Card>
                            </UserName>
                            {user.role === 'admin' ? (
                                <Link to="/admin/dashboard"><Button><MdOutlineAdminPanelSettings color="white"/>painel admin</Button></Link>
                            ):(
                                <></>
                            )}
                            {/*<LastOrdersTitle><FaShoppingCart style={{marginLeft: 10}} size={30} color="var(--orange-text)" /> <h1>RESUMO DO SEU ÚLTIMO PEDIDO</h1></LastOrdersTitle>*/}
                            
                        </Content>
                    </Container>                
                </>
            )}
        </>
    )
}

const AvatarUpload = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;  
    margin: 10px;
`;

const ButtonCam = styled.button`
    width: 80px;
    height: 80px;
    background: #000;
    border-radius:50%;
    color: #fff;
    filter: opacity(50%);    
    margin-left: -100px;
`;

const Button = styled.button`
    display: flex;
    background: var(--orange-text);
    color: #ffffff;
    height: 50px;
    width: 200px;
    margin: 10px;
    text-transform: uppercase;
    border-radius: 5px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg{
        margin-right: 10px;
    }
`;

/* const LastOrdersTitle = styled.h1`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    h1{
        display: flex;
        font-size: 24px;
        font-weight: bold;
        color: rgb(66, 70, 77);
        margin-left: 16px;
    }    
`; */

const Infos = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    .infos {
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 400;
        color: var(--text-grey-weak);
        margin-bottom: 0.25rem;
        margin-left: 20px;
    }
    
`;

const Email = styled.span`
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 400;
    color: var(--text-grey);
    display: flex;
    align-items: center;

    svg{
        margin-right: 10px;
        color: var(--orange-text);

        @media(max-width: 400px){
            margin-right: 5px;
        }
    }

    @media(max-width: 400px){
        font-size: 12px;
    }
`;

const Name = styled.span`
    font-size: 1.25rem;
    line-height: 1.875rem;
    font-weight: 700;
    color: var(--text-grey);   

    @media(max-width: 400px){
        font-size: 14px;
    }
`;

const Card = styled.div`
    display: flex;
    background-color: white;
    max-width: 600px;
    width: 100%;
    margin: 0 10px 10px 10px;
    flex-direction: row;
    border-radius: 0.25rem;
    height: 144px;
    align-items: center;    

    

    .credits{
        font-size: 2.5rem;
        margin-left: 20px;
        line-height: 3rem;
        font-weight: 700;
        color: var(--orange-weak);        
    }
`;

const UserName = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;    
    
    @media(max-width: 650px){
        flex-wrap: wrap;
    }
    
    .engine{
        margin: 20px;
        width: 50px;
        height: 50px;
        color: var(--orange-text);
        cursor: pointer;

        @media(max-width: 400px){
            width: 20px;
            height: 20px;
        }
    }
`;

const Content = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    margin: 80px auto;
    flex-direction: column;

    .avatar{
        margin: 20px;
        width: 80px;
        height: 80px;

        @media(max-width: 400px){
            margin-right: 5px;
            width: 50px;
            height: 50px;
        }
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;    
    background-color: #F2F3F4;
`;