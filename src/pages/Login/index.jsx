import { FaFacebookF, FaGoogle, FaUserAlt } from "react-icons/fa";
import styled from "styled-components"
import { FormInput } from "../../components/FormInput";
import Button from '@mui/material/Button';
import {BiExit} from 'react-icons/bi'
import { InputPassword } from "../../components/InputPassword";
import {AiFillFileText} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { login, register } from "../../actions/userActions";
import { Header } from "../../components/Header";
import {Loader} from '../../components/Loader'

export function Login({history, location}) {
  
  const dispatch = useDispatch();
  

  const { loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpf: ''
  });

  const {name,email,password, cpf} = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));    
  }


  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('cpf', cpf);
    myForm.set('password', password);    
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {   
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const redirect = location.search ? location.search.split("=")[1] : "/me";

  useEffect(() => {   

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, redirect, history, isAuthenticated]);

  

  return (
    <>
    {loading ? (
        <Loader />
    ):(
        <>
            <Header />    
            <Main>        
                <Container>
                    <Content>
                        <PageTitle>
                            <FaUserAlt
                                color="var(--orange-text)"
                            />
                            <h1>Identificação</h1>
                        </PageTitle>
                        <MainContainer>
                            <MainContent>
                                <Form ref={loginTab} onSubmit={loginSubmit}>
                                    <Title>
                                        <h2>Já possuo cadastro</h2>
                                    </Title>
                                    <Inputs>
                                        <FormInput label="Email, CPF ou CNPJ*" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                        <InputPassword label="Senha" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                        <Button 
                                            className="button-login"
                                            type="submit"                                    
                                            variant="outlined"                                
                                            style={{
                                                maxWidth: '100%',
                                                width: '100%',
                                                height: '48px',
                                                color: 'var(--orange-text)',
                                                borderColor: 'var(--orange-text)',     
                                                background: 'transparent',    
                                                marginBottom: '20px',                                                                                         
                                            }}
                                        ><BiExit /> Entrar</Button>  
                                        <ForgotPassword>
                                            <div>Esqueci minha senha</div>
                                            <div>Esqueci meu login</div>
                                        </ForgotPassword>                          
                                    </Inputs>
                                    <ProvidersAuthSection>
                                        <SectionTitle>
                                            <h4>QUERO ACESSAR COM MINHAS REDES SOCIAIS</h4>
                                        </SectionTitle>
                                        <ButtonsSection>
                                            <Button 
                                                className="button-login"
                                                variant="outlined"                                
                                                style={{
                                                    maxWidth: '100%',
                                                    width: '100%',
                                                    height: '48px',
                                                    color: '#0060B1',
                                                    borderColor: '#0060B1',     
                                                    background: 'transparent',    
                                                    marginBottom: '20px',      
                                                    fontWeight: 700,
                                                    lineHeight: '15px'                                                                                       
                                                }}
                                            ><FaFacebookF color="#0060B1" style={{margin: '5px'}}/> Entrar com Facebook</Button>                
                                            <div style={{width: '20px'}}> </div>                    
                                            <Button 
                                                className="button-login"
                                                variant="outlined"                                                                       
                                                style={{
                                                    maxWidth: '100%',
                                                    width: '100%',
                                                    height: '48px',
                                                    color: '#EB4335',
                                                    borderColor: '#EB4335',     
                                                    background: 'transparent',    
                                                    marginBottom: '20px', 
                                                    fontWeight: 700,
                                                    lineHeight: '15px'                                                                                        
                                                }}
                                            ><FaGoogle color="#EB4335" style={{margin: '5px'}}/> Entrar com o Google</Button>                                    
                                        </ButtonsSection>
                                    </ProvidersAuthSection>
                                </Form>
                                <Divider />
                                <Form
                                    ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}
                                >
                                    <Title>
                                        <h2>Quero me cadastrar</h2>
                                    </Title> 
                                    <Inputs>
                                        <FormInput label="Nome" name="name" value={name} onChange={registerDataChange}/>
                                        <FormInput label="E-mail" name="email" value={email} onChange={registerDataChange} />
                                        <FormInput label="CPF/CNPJ" name="cpf" value={cpf} onChange={registerDataChange} />
                                        <InputPassword label="Senha" name="password" value={password} onChange={registerDataChange}/>                                                                                                        
                                        <Button 
                                            className="button-login"
                                            variant="outlined"                                
                                            type="submit"
                                            style={{
                                                maxWidth: '100%',
                                                width: '100%',
                                                height: '48px',
                                                color: 'var(--orange-text)',
                                                borderColor: 'var(--orange-text)',   
                                                fontWeight: 700                                                                                                
                                            }}
                                        ><AiFillFileText size={20} style={{margin: '5px'}}/> Cadastrar</Button>                            
                                    </Inputs>
                                </Form>
                            </MainContent> 
                        </MainContainer>             
                    </Content>
                </Container>
            </Main>        
        </>
    )}
    </>
  )
}


const Main = styled.main`
    display: flex;
    justify-content: center;
    background-color: var(--white);
    min-heigth: calc(100vh - 250px);
`;

const Container = styled.div`
    display: flex;
    flex: 1 1 0%;
    min-height: 614px;
    padding-bottom: 64px;    
    justify-content: center;
    background-color: var(--white);
`;

const Content = styled.div`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    max-width: 1216px;
    margin-top: 32px;
    padding: 0px 1rem;
`;

const PageTitle = styled.div`
    display: flex;
    flex-direction: row;    
    align-items: baseline;

    h1 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 700;
        color: var(--text-grey);
        text-transform: uppercase;
        padding-left: 5px;
    }
`;
const MainContent = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    flex-direction: row;
    margin: 50px auto;
    @media(max-width: 680px){
        flex-wrap: wrap;    
    }
`;

const Form = styled.form`
    display: flex;
    max-width: 472px;
    width: 100%;
    flex-direction: column;

    @media(max-width: 680px){
        max-width: 630px;
        width: 100%;

        .button-login {
            max-width: 630px;
            width: 100%;
        }
    }    
`;

const Title = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    

    h2{
        color: var(--orange-text);
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        color: rgb(255, 101, 0);
        margin-bottom: 20px;
    }
`;


const Inputs = styled.div`
    max-width: 472px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;    

    @media(max-width: 680px){
        max-width: 630px;
        width: 100%;
    }
`;


const MainContainer = styled.div`   
    display: flex;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

        
`;

const Divider = styled.div`
    display: flex;
    width: 2px;    
    background-color: rgb(242, 243, 244);
    margin: 0px 32px;

    @media(max-width: 680px){
        visibility: hidden;
    }
`;

const ForgotPassword = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    div {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: underline;
        color: rgb(127, 133, 141);
        margin: 0px 16px;
        cursor: pointer;
    }

    
`;

const ProvidersAuthSection = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const SectionTitle = styled.div`

    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid rgb(242, 243, 244);
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;

    h4{
        font-size: 1rem;
        line-height: 1.375rem;
        font-weight: 700;
        color: rgb(127, 133, 141);
        margin: 1rem 0px;
        text-align: center;
    }
`;

const ButtonsSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;