import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdOutlineStarBorder, MdOutlineSupportAgent, MdReorder } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {IoMdBasket, IoMdPricetag} from 'react-icons/io'
import { AiFillHeart } from 'react-icons/ai';
import {BiCreditCard, BiCurrentLocation} from 'react-icons/bi'
import { BsLightningChargeFill } from 'react-icons/bs';
import {Link} from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { toast, ToastContainer } from 'react-toastify';
import { Fragment } from 'react';

export default function DrawerComponent(props) {

  const dispatch = useDispatch();
  function handleLogoutUser(){
    dispatch(logout());
    toast.success("Deslogado com sucesso!");
  }
  const {isAuthenticated, user} = useSelector((state) => state.user);

  const [state, setState] = React.useState({    
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
      style={{
        backgroundColor: '#0060b1',    
        height: '100%' ,         
      }}
      color="white"


    >
    <ListContainer>
        <List >        
            <ListItem style={{height: '40px', margin: '20px 0 0 0'}} disablePadding>
                <ListItemButton style={{
                    alignItems: 'center',
                    
                }}>
                <ListItemIcon>
                <figure>
                    { isAuthenticated ? <img style={{width: '36px', height: '36px', borderRadius: '50%', margin: '0 5px 0 10px'}} src={user.avatar?.url ? user.avatar.url : '/profile.png'} alt='avatar'/> : <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="https://www.w3.org/2000/svg" className="IconDefaultProfileLogo"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28"><path fillRule="evenodd" clip-rule="evenodd" d="M18.6375 13.5625C20.6063 12.2062 21.875 9.975 21.875 7.4375C21.875 3.325 18.55 0 14.4375 0C10.325 0 7 3.325 7 7.4375C7 9.975 8.26875 12.2062 10.2375 13.5625C6.34375 14.7875 3.5 18.4625 3.5 22.75V28H25.375V22.75C25.375 18.4625 22.5312 14.7875 18.6375 13.5625Z" fill="#347BBE"></path></mask><g mask="url(#mask0)"><circle cx="14.5" cy="11.5" r="15.5" fill="#C4C4C4"></circle></g></svg>}
                    </figure>
                </ListItemIcon>
                <ListItemText>
                    <h4
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.875rem',
                            fontWeight: 700,
                            color: 'rgb(255, 255, 255)',                        
                        }}            
                    >
                        Olá, {user?.name}
                    </h4>
                </ListItemText>
                </ListItemButton>
            </ListItem>        
        </List>
        <List style={{margin: '0 20px'}}>        
            <Link to="/me" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <FaUserAlt style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Minha conta
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>  
            </Link>
            <Link to="/orders" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <IoMdBasket style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Meus pedidos
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>   
            </Link>
            <Link to="" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <AiFillHeart style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Favoritos
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to="" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <MdOutlineSupportAgent style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Atendimento
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            </Link>
            <Divider style={{margin: '10px 0', backgroundColor:"#66A0D0"}}/>
            <Link to="" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <BiCurrentLocation style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Mais Procurados
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to="" style={{textDecoration: 'none'}}><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <BsLightningChargeFill style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Acabaram de chegar
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            </Link>
            <Divider style={{margin: '10px 0', backgroundColor:"#66A0D0"}}/>
            <Link to="" style={{textDecoration: 'none'}}></Link><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <IoMdPricetag style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Oferta do dia
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider style={{margin: '10px 0', backgroundColor:"#66A0D0"}}/>
            <Link to="" style={{textDecoration: 'none'}}></Link><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <MdOutlineStarBorder style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Seja Prime
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <Link to="" style={{textDecoration: 'none'}}></Link><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <BiCreditCard style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Cartão Kabum
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <Link to="" style={{textDecoration: 'none'}}></Link><ListItem style={{height: '40px'}} disablePadding>
                <ListItemButton>                
                    <IoMdPricetag style={{marginRight: 10}} color='white'/>                                
                <ListItemText>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            lineHeight:' 0.875rem',
                            fontWeight: 400,
                            color: 'rgb(255, 255, 255)',
                        }}
                    >
                        Pix
                    </span>
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ButtonLogout onClick={handleLogoutUser}>
                Sair
            </ButtonLogout>
        </List>                
      </ListContainer>
    </Box>
  );

  return (
    <div>      
        <Fragment key="left">
          <MdReorder  onClick={toggleDrawer('left', props.isOpen)} size={30} color="#66A0D0"/>
          <SwipeableDrawer
            anchor="left"
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
            style={{
                position: 'absolute',
                zIndex: 999,
                color: 'white'
            }}            

          >
            {list('left')}
          </SwipeableDrawer>          
        </Fragment>
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
    </div>
  );
}

const ButtonLogout = styled.div`
    display: flex;
    width: 100%;
    background: var(--orange-text);
    color: white;
    height: 50px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1.125rem;
    line-height: 2rem;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    margin: 10px 0;
`;

const ListContainer = styled.div`
    width: 100%;
`;