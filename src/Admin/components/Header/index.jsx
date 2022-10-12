import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components"
import KabumLogo from '../../../assets/kabum-logo-2.png';
import KabumSmall from '../../../assets/kabum.png';

export function AdminHeader(){

    const logo = window.innerWidth < 1024 ? KabumSmall : KabumLogo;  

    const {user, isAuthenticated} = useSelector((state) => state.user)
    return(
        <Container>
            <Content>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                    <Logo>
                        <img
                            src={logo}
                            alt="logo"
                        />
                    </Logo>
                </Link>
                <Link to="/me" style={{textDecoration: 'none', color: 'inherit'}}>
                    <UserInfo>
                        <UserName>{ isAuthenticated ? user.name : ''}</UserName>
                        <Avatar>
                            { isAuthenticated ? <img style={{width: '36px', height: '36px', borderRadius: '50%'}} src={user.avatar ? user.avatar.url : '/profile.png'} alt='avatar'/> : <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg" className="IconDefaultProfileLogo"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28"><path fillRule="evenodd" clip-rule="evenodd" d="M18.6375 13.5625C20.6063 12.2062 21.875 9.975 21.875 7.4375C21.875 3.325 18.55 0 14.4375 0C10.325 0 7 3.325 7 7.4375C7 9.975 8.26875 12.2062 10.2375 13.5625C6.34375 14.7875 3.5 18.4625 3.5 22.75V28H25.375V22.75C25.375 18.4625 22.5312 14.7875 18.6375 13.5625Z" fill="#347BBE"></path></mask><g mask="url(#mask0)"><circle cx="14.5" cy="11.5" r="15.5" fill="#C4C4C4"></circle></g></svg>}
                        </Avatar>
                    </UserInfo>
                </Link>
            </Content>
        </Container>
    )
}

const Avatar = styled.div``;

const UserName = styled.div`
    margin: 0 10px;
    align-items: center;
`;

const UserInfo = styled.div`;
    display: flex;
    flex-direction: row;    
`;

const Logo = styled.div`
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

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 50px;
    
`;

const Container = styled.header`
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 60px;      
    border-radius: 10px;     
`;