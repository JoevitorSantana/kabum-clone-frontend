import styled from 'styled-components'
import KabumLogo from '../../assets/kabum-logo-2.png';
import KabumSmall from '../../assets/kabum.png';
// import { FaSearch} from 'react-icons/fa';
// import {MdReorder} from 'react-icons/md';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../actions/userActions';
import DrawerComponent from '../Drawer';
import { useState } from 'react';

export function HeaderCart({history, location}) {

  const {user, isAuthenticated} = useSelector((state) => state.user)

  const logo = window.innerWidth < 1024 ? KabumSmall : KabumLogo;  
  
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <Container>
        <HeaderContent>
            <Content>                
                <Logo>
                    <div style={{cursor: 'pointer', margin: 10}} onClick={() => setIsOpenDrawer(true)}>
                        <DrawerComponent isOpen={isOpenDrawer}/>
                    </div> 
                    <a href="/">
                        <img
                            src={logo}
                            alt="logo"
                        />                    
                    </a>                    
                </Logo>                
                
                <Login>
                    <figure>
                        { isAuthenticated ? <img style={{width: '36px', height: '36px', objectFit: 'contain', borderRadius: '50%'}} src={user.avatar ? user.avatar.url : '/profile.png'} alt='avatar'/> : <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg" className="IconDefaultProfileLogo"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28"><path fillRule="evenodd" clipRule="evenodd" d="M18.6375 13.5625C20.6063 12.2062 21.875 9.975 21.875 7.4375C21.875 3.325 18.55 0 14.4375 0C10.325 0 7 3.325 7 7.4375C7 9.975 8.26875 12.2062 10.2375 13.5625C6.34375 14.7875 3.5 18.4625 3.5 22.75V28H25.375V22.75C25.375 18.4625 22.5312 14.7875 18.6375 13.5625Z" fill="#347BBE"></path></mask><g mask="url(#mask0)"><circle cx="14.5" cy="11.5" r="15.5" fill="#C4C4C4"></circle></g></svg>}
                    </figure>
                    <div className="userInfo">
                        <span>
                            {isAuthenticated ? (
                                <p>Olá, {user.name}<br /> <a href='/me'>MINHA CONTA</a> | <a href='/'>SAIR</a></p>
                            ) : (
                                <p>Faça <a href='/'>Login</a> ou <br></br> crie seu <a href="/">Cadastro</a></p>
                            )                            
                            }                            
                        </span>
                    </div>
                </Login>                
            </Content>
        </HeaderContent>        
    </Container>
  )
};

/*const DrawerIcon = styled.div`
    display: flex;
    align-items: center;    

    margin: 0 5px;

    a {
        margin-top: 5px;
        margin-left: 5px;
    }

    @media(min-width: 1024px){
        display: none;
    }
`;

const Items = styled.div`
    display: flex;
    text-align: center;
    align-items: center;    
    padding: 8px 20px;
    cursor: pointer;
    min-width: 120px;

    text-transform: uppercase;
    border-right: 1px solid #FF8B1F;
    
    @media(max-width: 1115px){
        font-size: 12px;
    }
    
    &:last-child{
        border: none;
    }

    :hover{
        background: var(--orange-strong);
    }
`;

const MenuContainer = styled.div`    
    position: relative;
    z-index: 999;
    display: flex;    
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;    
    background-color: var(--orange-text);
    height: 35px;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 700;
    color: var(--white);
    justify-content: center;

    @media(max-width: 1024px){
        display: none;
    }
`;

const MenuContent = styled.div`
    width: 100%;  
    margin: 0 auto;
    max-width: 1368px;  
    position: relative;
    z-index: 99;
    display: flex;
    flex-direction: column.
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
    background-color: var(--orange-text);
`;*/

const Container = styled.header`    
    display: flex;
    -webkit-box-align: center;
    position: relative;
    flex-direction: column;
    max-width: 100vw;    
    min-heigth: auto;
    border-bottom: 3px solid var(--orange-text);    
`;

const HeaderContent = styled.div`
    position: relative;
    padding: 0px 1.5rem;
    z-index: 99;
    width: 100%;
    background: var(--blue);    
`;


const Content = styled.div`
    height: auto;
    padding: 0.75rem 1rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 0%;
    gap: 1rem;
    max-width: 76rem;
    margin: 0 auto;
    width: 100%;

    @media(max-width: 1024px){
        margin: 0 -20px;
    }
`;

const Logo = styled.div`
    display: flex;    

    img {
        cursor: pointer;
        min-height: auto;
        min-width: auto;
        height: 54px;
        width: 158px;

        @media(max-width: 1024px){
            height: 50px;
            width: 50px;
        }
    }
`;

/*const SearchInput = styled.div`
    display: flex;
    width: 100%;    
    flex-direction: column;
    max-width: 35rem;
    height: 54px;
    padding-top: 10px;    

    form {        
        width: calc(100% - 3.75rem);
        display: flex;
        position: relative;
        z-index: 1;     
        
        span{
            display: flex;                
            flex-direction: row;
            background: var(--white);
            border-radius: 3px;
            align-items: center;
            padding: 0 10px;
            width: 100%;
            max-width: 720px;
            svg {
                display: none;
            }
        }

        @media(max-width: 1024px){
            span {
                display: flex;                
                flex-direction: row;
                background: var(--white);
                border-radius: 3px;
                align-items: center;
                padding: 0 10px;      
                width: 1024px;

                svg {
                    visibility: visible;
                }
            }
    
        }

        input {
            font-size: 0.875rem;
            line-height: 1.3125rem;
            position: relative;
            width: 100%;
            height: 2.25rem;
            padding: 0.75rem 1rem;
            background: var(--white);
            color: var(--text-grey);
            border-radius: 0.25rem;
            z-index: 1;
            outline: 0;
            
            writing-mode: horizontal-tb !important;
            text-rendering: auto;
            letter-spacing: normal;
            word-spacing: normal;
            text-transform: none;
            text-indent: 0px;
            text-shadow: none;
            display: inline-block;
            text-align: start;
            appearance: auto;
            -webkit-rtl-ordering: logical;
        }        

        button {
            width: 6rem;
            height: 2.75rem;
            top: -6px;
            right: -80px;
            cursor: pointer;
            background: transparent;
            position: absolute;
            z-index: 2;

            svg{
                position: absolute;
                z-index: 2;
                top: 0px;
                left: 0px;
                height: auto;  
                cursor: pointer;
                
                @media(max-width: 1024px){
                    display: none;
                }
            }

            &:before{
                content: "";
                position: absolute;
                left: 1rem;
                top: 0.375rem;
                height: 1.5rem;
                width: 0.625rem;
                margin: 0 -100px;
                padding-right: 100px;
                padding-bottom: 12px;
                background: var(--white);

                @media(max-width: 1024px){
                    display: none;
                }
            }            
        }
    }
`;*/


const Login = styled.div`
    display: flex;
    flex-shrink: 0;
    -webkit-box-align: 0;
    align-items: center;
    -webkit-box-flex: 1;
    flex-grow: 1;
    max-width: 10.375rem;

    @media(max-width: 1024px){
        display: none;
        width: 0;
    }

    figure{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        border-radius: 50%;
        height: 36px;
        width: 36px;
        border: 3px solid #3437bbe;
        margin-block-start: 1em;
        margin-block-end: 1em;        
        margin-inline-end: 40px;
    }

    .userInfo{
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: flex-start;
        -webkit-box-flex: 2;
        flex-grow: 1;        
        margin-left: -30px;
        

        span {
            font-size: 0.75rem;
            line-heigth: 1.125rem;
            color: #fffc;     
            width: 150px;       

            a{
                font-size: 0.75rem;
                line-height: 1.125rem;
                font-weight: 700;
                color: #fffc;
                text-decoration: none;
                cursor: pointer;
            }
            p{
                font-size: 0.75rem;                            
                color: #fffc;
                text-decoration: none;
                cursor: pointer;
            }
        }
    }
`;

/* const Options = styled.div`
    display: flex;
    gap: 1.5rem;    

    @media(max-width: 1024px){
        display: none;
    }

    a {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        cursor: pointer;
        width: 2.25rem;
        height: 2.25rem;

        @media(max-width: 1024px){
            display: none;            
        }        
    }
`;*/
