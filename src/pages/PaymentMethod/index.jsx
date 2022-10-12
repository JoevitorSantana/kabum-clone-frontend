import styled, { css } from "styled-components";
import { HeaderCart } from "../../components/HeaderCart";
import {ImEyePlus} from 'react-icons/im';
import PixLogo from '../../assets/icone-pix.png';
import PixLogoWhite from '../../assets/icone-pix-white.png';
import { useEffect, useState } from "react";
import { FaBarcode } from "react-icons/fa";
import {BsCreditCard} from 'react-icons/bs'
import { FormInput } from "../../components/FormInput";
import { SelectInput } from "../../components/SelectInput";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import chip from "../../assets/chip.png"
import { Loader } from "../../components/Loader";
import { StatusOrderBar } from "../../components/StatusOrderBar";

export function PaymentMethod(){

    const {cartItems, deliveryPrice} = useSelector((state) => state.cart);    
    const {user, loading} = useSelector((state) => state.user);

    let Price = cartItems.reduce((acc, item) =>
        acc + item.quantity * item.price, 0
    );


    let totalPrice = Price + parseFloat(deliveryPrice.finalDeliveryPrice);

    let discountPrice = totalPrice - (Price * (15/100));

    const [optionSelected, setOptionSelected] = useState(true);
    const [optionSelectedBoleto, setOptionSelectedBoleto] = useState(false);
    const [optionSelectedKabum, setOptionSelectedKabum] = useState(false);
    const [optionSelectedCredito, setOptionSelectedCredito] = useState(false);

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState('');    

    const handleSendPaymentInfo = (e) => {
        e.preventDefault();

        axios.put('/api/v2/me/update/paymentinfo', {
            creditCard: {
                name: name,
                number: number,
                expiration: expiration,
                cvv: cvv,                
            },
            cpf: cpf,
            birthdayDate: birthday,
        }).catch((error) => JSON.stringify(error.data));

        toast.success("Cartão de crédito cadastrado")
    }

    const handleSelectOption = () => {
        setOptionSelected(true);
        setOptionSelectedBoleto(false);
        setOptionSelectedKabum(false);
        setOptionSelectedCredito(false);
    }
    const handleSelectOptionBoleto = () => {
        setOptionSelected(false);
        setOptionSelectedBoleto(true);
        setOptionSelectedKabum(false);
        setOptionSelectedCredito(false);
    }

    const handleSelectOptionKabum = () => {
        setOptionSelected(false);
        setOptionSelectedBoleto(false);
        setOptionSelectedKabum(true);
        setOptionSelectedCredito(false);
    }

    const handleSelectOptionCredito = () => {
        setOptionSelected(false);
        setOptionSelectedBoleto(false);
        setOptionSelectedKabum(false);
        setOptionSelectedCredito(true);
    }        
    

    useEffect(() => {        
        setName(user.creditCard?.name);
        setNumber(user.creditCard?.number);
        setExpiration(user.creditCard?.expiration);
        setCpf(user?.cpf);
        setCvv(user.creditCard?.cvv);
        setBirthday(user?.birthdayDate);        
    }, [user]);

    return(        
        <>
            {loading ? (
                <Loader />
            ):(
                <>
                <HeaderCart />                    
                    <Container>
                        {/*<StatusOrderBar percentage={60}/>*/}
                        <div style={{display: "flex", width: '100%', background: 'white', marginTop: 50}}>
                        <Content>
                            <Title>
                                <ImEyePlus size={30} style={{marginRight: 5}} color="#FC6B0F"/>
                                <h1>Formas de pagamento</h1>
                            </Title>
                            <MainSections>
                                <PaymentMethodSections>
                                    <PaymentOptionButton isSelected={optionSelected} onClick={handleSelectOption}><img style={{width: 30, height: 30, marginInlineStart: 20, marginInlineEnd: 10, color: 'white'}} src={optionSelected ? PixLogo : PixLogoWhite} alt="pix"/>PIX</PaymentOptionButton>
                                    <PaymentOptionButton isSelected={optionSelectedBoleto} onClick={handleSelectOptionBoleto}><FaBarcode style={{width: 30, height: 30, marginInlineStart: 20, marginInlineEnd: 10}} color={optionSelectedBoleto ? 'white' : '#FC6B0F'} /> BOLETO BANCÁRIO</PaymentOptionButton>
                                    <PaymentOptionButton isSelected={optionSelectedKabum} onClick={handleSelectOptionKabum}><BsCreditCard style={{width: 30, height: 30, marginInlineStart: 20, marginInlineEnd: 10}} color={optionSelectedKabum ? 'white' : '#FC6B0F'} /> CARTÃO KABUM</PaymentOptionButton>
                                    <PaymentOptionButton isSelected={optionSelectedCredito} onClick={handleSelectOptionCredito}><BsCreditCard style={{width: 30, height: 30, marginInlineStart: 20, marginInlineEnd: 10}} color={optionSelectedCredito ? 'white' : '#FC6B0F'} />CARTÃO DE CRÉDITO</PaymentOptionButton>
                                </PaymentMethodSections>
                                <DescriptionSection>
                                {optionSelected && (
                                    <PixContainer>
                                        <PageTitle>
                                            <h2>PIX</h2>
                                            <h3>A melhor opção para suas compras à vista</h3>
                                        </PageTitle>
                                        <Description>
                                            <p>Pague com PIX e aproveite <b>até 15% OFF</b>. Nessa modalidade, seu <b>pedido é aprovado instantaneamente</b>, o que torna a expedição do seu pedido ainda mais rápida.</p>
                                            <p>O que você precisa saber antes de pagar por PIX:<ul><li>É necessário possuir uma chave PIX cadastrada no seu Banco;</li><li>Com o seu celular, basta escanear o QR Code ou copiar o código para efetivar a compra;</li><li>O pagamento é processado e debitado do valor em sua conta corrente;</li><li>Como padrão, o Banco Central limitou os pagamentos no período das 20h às 06h, a valores de até R$1.000. Mas você pode solicitar o aumento do limite deste período diretamente com o seu banco, pela Central de Atendimento ou APP. O prazo de liberação é de até 48h.</li></ul></p>
                                        </Description>
                                        <TotalCards>
                                            <TotalCardsContainer>
                                                <TotalCardsContent>
                                                    <span className="title">TOTAL DA SUA COMPRA:</span>
                                                    <span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice)}</span>
                                                </TotalCardsContent>
                                            </TotalCardsContainer>
                                            <TotalCardsContainerPix>
                                                <TotalCardsContentPix>
                                                    <span className="title">PAGAMENTO VIA PIX:<span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(discountPrice)}</span></span>
                                                    <span className="subtitle">Economize(<b>15%</b>)</span>
                                                </TotalCardsContentPix>
                                            </TotalCardsContainerPix>
                                        </TotalCards>
                                    </PixContainer>
                                )}     
                                {optionSelectedBoleto && (
                                    <>
                                        <PageTitle>
                                            <h2>BOLETO BANCÁRIO</h2>                                    
                                        </PageTitle>
                                        <Description>
                                            <p>Boleto tem até <b>15% de desconto*</b> na compra e é a forma de pagamento que recebe o maior desconto sob o valor total da compra. Esta é a forma mais vantajosa para quem deseja pagar à vista. Você poderá efetuar o pagamento do boleto em qualquer Banco ou Casa Lotérica em qualquer lugar do Brasil, sem necessidade de confirmação do pagamento. *O desconto poderá ser concedido ou não até o limite de 15%, podendo ser menor ou zero, de acordo com o detalhado nas descrições do produto e só será aplicado às vendas diretas e entregues pelo KaBuM!, não se aplicando aos produtos de Marketplace.</p>
                                        </Description>
                                        <TotalCards>
                                            <TotalCardsContainer>
                                                <TotalCardsContent>
                                                    <span className="title">TOTAL DA SUA COMPRA:</span>
                                                    <span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalPrice)}</span>
                                                </TotalCardsContent>
                                            </TotalCardsContainer>
                                            <TotalCardsContainerPix>
                                                <TotalCardsContentPix>
                                                    <span className="title">PAGAMENTO VIA BOLETO:<span className="price">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(discountPrice)}</span></span>
                                                    <span className="subtitle">Economize(<b>15%</b>)</span>
                                                </TotalCardsContentPix>
                                            </TotalCardsContainerPix>
                                        </TotalCards>  
                                    </>  
                                )}
                                {optionSelectedKabum && (
                                    <>
                                        <PageTitle>
                                            <h2>Cartão KaBuM!</h2>                                    
                                        </PageTitle>
                                        <Description style={{flexDirection: 'row',maxWidth: '1000px', width: '100%'}}>
                                            <img style={{width: 176, height: 266}} src="https://static.kabum.com.br/conteudo/temas/001/imagens/k5/images/cartao-kabum-frente.png" alt="avatar"/>
                                            <div style={{dispay:'flex', flexDirection: 'column',  marginLeft: 10}}>
                                                <h3 class="sc-jonzHS gxATja">Conheça os benefícios do cartão KaBuM!</h3>
                                                <ul><li>Sem anuidade.</li><li>Crédito aprovado em até 1 min. na sua tela.</li><li>Parcelamento em até 24x.</li><li>E ainda tenha cashback, garantia de preço e muito mais!</li></ul>
                                                <h4>Solicite seu cartão com poucos cliques</h4>
                                                <span>Sujeito a análise de crédito</span><br /><br />
                                                <a href=" ">CRIAR CARTÃO</a>
                                            </div>
                                        </Description>
                                    </>
                                )} 
                                {optionSelectedCredito &&(
                                    <>
                                        <PageTitle>
                                            <h2>CARTÃO DE CRÉDITO</h2>                                    
                                        </PageTitle>
                                        <Description>
                                            <h4>À vista com até 10% de desconto* ou tudo em até 10x sem juros!</h4><br />
                                            <p>O KaBuM! aceita as bandeiras de cartão VISA, MasterCard, ELO, HiperCard, American Express e Diners - Todos em até 10x sem juros ou com desconto em até 3x!</p>
                                            <p>*O desconto poderá ser concedido ou não até o limite de 10%, podendo ser menor ou zero, de acordo com o detalhado nas descrições do produto e só será aplicado às vendas diretas e entregues pelo KaBuM!, não se aplicando aos produtos de Marketplace.</p>
                                        </Description>
                                        <NewCardForm>
                                            <NewCardFormContainer>
                                                {user?.creditCard ? (
                                                    <Card>
                                                        <CardContainer>
                                                            <Chip><img style={{width: 40 }} src={chip} alt="chip"/><img style={{width: 50 }} src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" alt="flag"/></Chip>
                                                            <ClientInfo>
                                                                <p>{user.creditCard.name}</p>
                                                                <p>{user.creditCard.number}</p>
                                                                <p style={{fontSize: 10}}>{user.creditCard.expiration}</p>
                                                            </ClientInfo>
                                                        </CardContainer>                                            
                                                    </Card>
                                                ):(
                                                    <form onSubmit={handleSendPaymentInfo}>
                                                        <NewCardTitle><input checked type="radio" style={{marginRight: 10}}/><p>Novo cartão de crédito</p></NewCardTitle>
                                                        <NewCardInputs>
                                                            <InputLines>
                                                                <FormInput name="name" onChange={(e) => setName(e.target.value)} value={name} label="Nome impresso no cartão" style={{width: '50%',marginLeft: '5px'}}/>
                                                                <FormInput name="number" onChange={(e) => setNumber(e.target.value)} value={number} label="Número do cartão" style={{width: '50%',marginLeft: '5px'}} />                                                
                                                            </InputLines>
                                                            <InputLines>
                                                                <FormInput name="expiration" onChange={(e) => setExpiration(e.target.value)} value={expiration} label="Validade" style={{width: '20%',marginLeft: '5px'}}/>
                                                                <FormInput name="cvv" onChange={(e) => setCvv(e.target.value)} value={cvv}  label="Código de verificação (CVV)" style={{width: '30%',marginLeft: '5px'}}/>
                                                                <FormInput name="cpf" onChange={(e) => setCpf(e.target.value)} value={cpf} label="CPF do titular do cartão" style={{width: '30%',marginLeft: '5px'}} />
                                                                <FormInput name="birthday" onChange={(e) => setBirthday(e.target.value)} value={birthday} label="Data de Nascimento" style={{width: '20%',marginLeft: '5px'}}/>
                                                            </InputLines>
                                                            <InputLines><input type="submit" style={{width: '100%', background: 'var(--orange-text)', color: 'white', height: 50, borderRadius: 5, marginLeft: 5, textTransform: 'uppercase', fontWeight: '700', cursor: 'pointer'}} value="Cadastrar novo cartão"/></InputLines>
                                                            <InputLines>
                                                                <SelectInput label="Forma de pagamento" totalPrice={discountPrice}/>
                                                            </InputLines>                                            
                                                        </NewCardInputs>
                                                    </form>
                                                )}                                        
                                            </NewCardFormContainer>
                                        </NewCardForm>
                                    </>                                                        
                                )}                  
                                </DescriptionSection>
                            </MainSections>                    
                        </Content>
                        </div>
                        <ButtonSectionsContainer>
                            <ButtonSections>
                                <Link to='/cart' style={{textDecoration: 'none'}}>
                                    <BackButton>
                                        Voltar
                                    </BackButton>
                                </Link>
                                {optionSelectedKabum ? (
                                    <></>
                                ):(
                                    <Link style={{textDecoration: 'none'}} to="/orderdetails"><ContinueButton>
                                        Pagar com {(optionSelected && 'PIX') || (optionSelectedBoleto && 'BOLETO') || (optionSelectedCredito && 'CARTÃO')}
                                    </ContinueButton>
                                    </Link>
                                )}                        
                            </ButtonSections>
                        </ButtonSectionsContainer>
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
    )
}

const PixContainer = styled.div`
    
    @media(max-width: 600px){
        max-width: 380px;
        margin: 10px;
    }
`;

const ClientInfo = styled.div`
    display: flex;    
    flex-direction: column;
    margin-top: 50px;
    
    p {
        font-family: 'Roboto Mono', monospace;
        color: white;
        text-transform: uppercase;
    }
`;

const Chip = styled.div`
    display: flex;    
    width: 250px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CardContainer = styled.div`
    margin: 20px;    
`;

const Card = styled.div`
    display: flex;
    width: 300px;
    height: 200px;    
    border-radius: 8px;
    background-image: linear-gradient(to bottom right, #424244 , #171717);
`;

const ButtonSectionsContainer = styled.div`
    display: flex;
    width: 100%;
    background: #F2F3F4;
`;

const ContinueButton = styled.div`
    display: flex;
    width: 100%;
    background: var(--orange-text);
    color: white;    
    border-radius: 5px;
    cursor: pointer;
    max-width: 300px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    height: 50px;
    width: 200px;
`;

const BackButton = styled.div`
    display: flex;    
    background: white;
    border: 1px solid var(--orange-text);
    border-radius: 5px;
    cursor: pointer;
    color: var(--orange-text);    
    height: 50px;
    width: 200px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
`;

const ButtonSections = styled.div`
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    background: #F2F3F4;
    justify-content: flex-end;
    flex-direction: row;
    padding: 40px 0;
`;

const InputLines = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin: 5px 0;
`;

const NewCardInputs = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const NewCardTitle = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px; 

    p {
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 400;
        color: rgb(86, 92, 105);
    }
`;

const NewCardFormContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 20px;
    flex-direction: column;
`;

const NewCardForm = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-top: 20px;
`;

const TotalCardsContentPix = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px;
    width: 100%;

    .subtitle{
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 400;
        font-style: normal;
        color: rgb(31, 144, 80);
        margin-top: 0.5rem;
        margin: 0 auto;
        
    }

    .price{
        font-size: 1.875rem;
        line-height: 2.3125rem;
        font-weight: 700;
        text-transform: uppercase;
        margin-left: 0.5rem;
        font-style: normal;
        letter-spacing: -0.35px;
        color: rgb(31, 144, 80);
        margin: 0 auto;

        @media(max-width: 600px){
            font-size: 20px;
            line-height: 30px;
        }
    }

    .title{
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 700;
        text-transform: uppercase;
        font-style: normal;
        color: rgb(31, 144, 80);
        margin: 0 auto;

        @media(max-width: 600px){
            font-size: 20px;
            line-height: 10px;
        }
    }
    
`;

const TotalCardsContainerPix = styled.div`
    display: flex;
    height: 100px;    
    width: 57%;
    background: #e5fff1;
    border-radius: 5px;
`;

const TotalCardsContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 100%;    

    .title{
        font-size: 1.25rem;
        line-height: 1.875rem;
        font-weight: 700;
        text-transform: uppercase;
        color: rgb(255, 101, 0);
        margin: 0 auto;

        @media(max-width: 600px){
            font-size: 10px;
            line-height: 10px;
        }
    }
    .price{
        font-size: 1.875rem;
        line-height: 2.3125rem;
        margin: 0 auto;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0.25rem;
        font-style: normal;
        letter-spacing: -0.35px;
        color: rgb(255, 101, 0);

        @media(max-width: 600px){
            font-size: 20px;
            line-height: 10px;
        }
    }
`;

const TotalCardsContainer = styled.div`
    display: flex;
    height: 100px;    
    width: 40%;
    background: #ffefe6;
    border-radius: 5px;
`;

const TotalCards = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;    
    width: 100%;

    a {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
        color: rgb(255, 101, 0);
        cursor: pointer;
        margin-top: 24px;
    }

    span{
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: rgb(86, 92, 105);
        margin-top: 8px;
    }

    h4 {
        margin-top: 16px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        color: rgb(86, 92, 105);
    }

    p {
        margin-bottom: 0.5rem;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: rgb(86, 92, 105);
    }    

    ul {
        padding-left: 1rem;
    }

    li {
        font-size: 0.875rem;
        line-height: 1.5rem;
        list-style: disc;
        color: rgb(86, 92, 105);
    }
`;

const PageTitle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;    

    h2 {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        color: rgb(66, 70, 77);
    }

    h3 {
        font-size: 0.875rem;
        line-height: 1.125rem;
        font-weight: 700;
        margin: 0.5rem 0px;
        color: rgb(86, 92, 105);
    }
`;


const PaymentOptionButton = styled.div`
    display: flex;
    width: 100%;
    background: white;
    color: var(--orange-text);
    border: 1px solid var(--orange-text);
    border-radius: 5px;
    height: 50px;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 5px 0;
    cursor: pointer;

    transition: background-color 0.3s ease 0s;
    border-radius: 0.25rem;

    ${(props) => props.isSelected && css`
        background: var(--orange-text);
        color: white;
    `}    
`;

const DescriptionSection = styled.div``;

const PaymentMethodSections = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    width: 100%; 
    margin: 0 30px 0 0;       
`;

const MainSections = styled.div`
    display: flex;
    flex-direction: row;    
    width: 100%;    
    margin: 10px 0;

    @media(max-width: 600px){
        flex-wrap: wrap;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;

    h1 {
        font-size: 1.5rem;
        line-height: 2.125rem;
        font-weight: 700;
        color: rgb(66, 70, 77);
        margin-left: 1rem;
        text-transform: uppercase;
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
    background: #F2F3F4;    
    flex-direction: column;
`;