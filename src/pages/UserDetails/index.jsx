import styled from "styled-components";
import { Header } from "../../components/Header";
import {BsFillFileEarmarkTextFill} from 'react-icons/bs'
import { FormInput } from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { InputPassword } from "../../components/InputPassword";
import {ImLocation} from 'react-icons/im'
import {Loader} from '../../components/Loader'
import { useEffect, useState } from "react";
import { clearErrors, loadUser, updateProfile } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { toast, ToastContainer } from "react-toastify";
import { saveShippingInfo } from "../../actions/CartActions";
import axios from "axios";

export function UserDetails(){

    const dispatch = useDispatch();

    const {user, loading} = useSelector((state) => state.user);

    const [address, setAddress] = useState(false);

    const {error, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');   
    const [street, setStreet] = useState('');   
    const [number, setNumber] = useState('');   
    const [cep, setCep] = useState('');   
    const [city, setCity] = useState('');   
    const [state, setState] = useState('');   
    const [country, setCountry] = useState('Brasil');
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/profile.png');

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));

    }

    const updateShippingInfoSubmit = (e) => {  
        
        e.preventDefault();

        axios.put('/api/v2/me/update/shippinginfo', {
            shippingInfo: {
                street: street,
                number: number,
                cep: cep,
                city: city,
                state: state,
                country: country
            }
        });

        dispatch(saveShippingInfo({street, number, cep, city, state, country}));
        toast.success("Endereço cadastrado com sucesso!")
    }

    const handleRequestCityInfo = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json()).then(data => {
            setCity(data.localidade);
            setState(data.uf);
            if (data.logradouro) {
                setStreet(data.logradouro);
            }
        })
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
        }

        if(user.avatar){
            setAvatarPreview(user.avatar.url);
        }

        if(user.shippingInfo){
            setStreet(user.shippingInfo.street);
            setNumber(user.shippingInfo.number);
            setCep(user.shippingInfo.cep);
            setCity(user.shippingInfo.city);
            setState(user.shippingInfo.state);
            setCountry(user.shippingInfo.country);
        }
  
      if (error) {        
        dispatch(clearErrors());
      }
  
      if (isUpdated) {        
        dispatch(loadUser());        
         
        dispatch({
            type: UPDATE_PASSWORD_RESET,
        })
      }
    }, [dispatch, error, isUpdated,user]);      

    const handleSetAddress = () => {
        setAddress(true)
    }

    return(
        <>
            {loading ? (<Loader />): (
                <>
                <Header />
                <Container>
                    <Content>
                        <PageTitle>
                            <h1>MEUS DADOS</h1>                        
                        </PageTitle>
                        <UserInfoSections>
                            <FormSections>
                                <Form 
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}
                                >
                                    <FormTitle>
                                        <h1><BsFillFileEarmarkTextFill color="var(--orange-text)" style={{marginRight: 10}} size={20}/>Dados Básicos</h1>
                                        <ChangePasswordButton>
                                            Alterar Senha
                                        </ChangePasswordButton>
                                    </FormTitle>
                                    <InputAddressContainer>
                                        <Inputs>
                                            <img src={avatarPreview} style={{height: 80, width: 80, objectFit: 'contain', borderRadius: 50, textAlign: 'center'}} alt="Avatar Preview" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                style={{margin: '10px 0 10px 0'}}
                                                onChange={updateProfileDataChange}
                                            />
                                            <FormInput label="Nome completo" name='name' onChange={(e) => setName(e.target.value)} value={name}/>
                                            <FormInput label="E-mail" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>   
                                            <InputPassword label="Senha atual"/>   
                                            <InputPassword label="Nova senha"/>                                 
                                            <InputPassword label="Confirmar senha"/> 
                                            {/*<input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange}/>*/}
                                            <input style={{background: 'var(--orange-text)', color: 'white', borderRadius: '5px', height: 40}} type="submit"  value="Atualizar"/>                                
                                        </Inputs>
                                    </InputAddressContainer>
                                </Form>
                            </FormSections>
                            <FormSections>
                                <Form
                                    onSubmit={updateShippingInfoSubmit}
                                >
                                    <FormTitle>
                                        <h1><ImLocation color="var(--orange-text)" style={{marginRight: 10}} size={20}/>Endereços</h1>                                    
                                    </FormTitle>
                                    <InputAddressContainer>
                                    {!user.shippingInfo && !address ? (
                                        <>
                                            <div>Sem endereços cadastrados</div>
                                            <button style={{background: 'var(--orange-text)', color: 'white', borderRadius: '5px', height: 40}} onClick={handleSetAddress}>Cadastrar endereço</button>
                                        </>
                                    ):(                                           
                                        <Inputs>
                                            <FormInput label="CEP" name='cep' onChange={(e) => setCep(e.target.value)} value={cep} onBlur={handleRequestCityInfo} />
                                            <FormInput label="Rua" name='street' onChange={(e) => setStreet(e.target.value)} value={street}/> 
                                            <FormInput label="Número" name='number' onChange={(e) => setNumber(e.target.value)} value={number} />     
                                            <FormInput label="Cidade" name='city' onChange={(e) => setCity(e.target.value)} value={city}/>                                                                 
                                            <FormInput label="Estado" name='state' onChange={(e) => setState(e.target.value)} value={state} />   
                                            <FormInput label="País" name='country' onChange={(e) => setCountry(e.target.value)} value={country} />                                               
                                            <input style={{background: 'var(--orange-text)', color: 'white', borderRadius: '5px', height: 40}} type="submit"  value="Cadastrar"/> 
                                        </Inputs>      
                                                                  
                                    )}                                           
                                    </InputAddressContainer>                                
                                </Form>
                            </FormSections>
                        </UserInfoSections>
                    </Content>
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
                </Container>
                </>
            )}            
        </>
    );
}

const InputAddressContainer = styled.div`    
    width: 100%;
    display: flex;
    flex-direction: column;   
    padding 15px;
    border: 1px solid lightgray; 
    border-radius: 5px;
    margin-top: 15px;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
`;

const ChangePasswordButton = styled.button`
    background: white;
    border: 1px solid var(--orange-text);
    color: var(--orange-text);
    border-radius: 5px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
    max-width: 150px;
    width: 100%;
    cursor: pointer;
    height: 36px;
`;

const FormTitle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
        display: flex;
        font-size: 14px;
        font-weight: bold;
        color: rgb(66, 70, 77);
        margin-left: 11px;
    }
`;

const Form = styled.form`
    display: flex;
    max-width: 500px;
    margin: 50px auto;
    width: 100%;
    flex-direction: column;
`;

const FormSections = styled.div`
    display: flex;
    max-width: 600px;
    width: 100%;
    background: white;
    border-radius: 5px;
    flex-direction: column;
    
`;

const UserInfoSections = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    @media(max-width: 600px){
        flex-direction: column;
    }
`;

const PageTitle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        display: flex;
        font-size: 24px;
        font-weight: bold;
        color: rgb(66, 70, 77);
        margin-left: 16px;
    }
`;

const Content = styled.div`
    display: flex;
    max-width: 1280px;
    width: 100%;
    margin: 50px auto;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    width: 100%;    
    background: #FAFAFB;
`;