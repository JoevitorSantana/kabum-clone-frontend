import { Doughnut } from "react-chartjs-2";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import { CgArrowLongRight } from 'react-icons/cg';
import { BiCreditCard } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";

export function StatusOrderBar(props){

    let statusPercent = props.percentage;
    let restantPercent = 100 - props.percentage;

    const doughnutData = {
        datasets: [
            {
                backgroundColor: ['rgb(255, 101, 0)', 'lightgray'],
                borderColor: 'transparent',
                data: [statusPercent, restantPercent]
            }
        ]
    };

    const options = {
        responsive: false,         
        aspectRatio:10,     
        weight: 0.1,     
        borderWidth: 1,   
        plugins: 
            {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },            
    }
    
    return(
        <StatusOrder>   
            <StatusOrderContainer>
                <Doughnut style={{height:'70px', width:'140px'}} options={options} data={doughnutData}/>                                                                             
                <TrackArea>
                    <IconArea>
                        <FaShoppingCart color={props.percentage >= 20 ? "#FC6B0F" : "lightgray"} style={{margin: '0 auto'}} size={40}/>
                        <label style={{ color: props.percentage >= 20 ? 'var(--orange-text)' : ''}}>Carrinho</label>
                    </IconArea>
                    <CgArrowLongRight color="lightgray"/>
                    <IconArea>
                        <FaUserAlt color={props.percentage >= 60 ? "#FC6B0F" : "lightgray"} style={{margin: '0 auto'}} size={40}/>
                        <label style={{ color: props.percentage >= 60 ? 'var(--orange-text)' : ''}}>Identificação</label>                        
                    </IconArea>
                    <CgArrowLongRight color="lightgray"/>
                    <IconArea>
                        <BiCreditCard color={props.percentage >= 60 ? "#FC6B0F" : "lightgray"} style={{margin: '0 auto'}} size={40}/>
                        <label style={{ color: props.percentage >= 60 ? 'var(--orange-text)' : ''}}>Pagamento</label>                        
                    </IconArea>
                    <CgArrowLongRight color="lightgray"/>
                    <IconArea>
                        <AiFillEye color="lightgray" style={{margin: '0 auto'}} size={40}/>
                        <label>Confirmação</label>                        
                    </IconArea>
                    <CgArrowLongRight color="lightgray"/>
                    <IconArea>
                        <BsCheckCircleFill color="lightgray" style={{margin: '0 auto'}} size={40}/>
                        <label>Conclusão</label>                        
                    </IconArea>
                </TrackArea>
            </StatusOrderContainer>                         
        </StatusOrder>
    )
}

const StatusOrderContainer = styled.div`
    display: flex;
    margin: 0 100px;
    flex-direction: row;
    align-items: center;
`;

const StatusOrder = styled.div`
    display: flex;
    flex-direction: row;
    margin: 50px auto 0 auto;
    max-width: 1280px;
    width: 100%;
    justify-content: center;    
    background: #F2F3F4;
    
`;

const TrackArea = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`;

const IconArea = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;    

    label{
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: lightgray;
        margin-top: 5px;        
    }
`;
