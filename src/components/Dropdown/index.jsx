import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import styled from "styled-components"

export function Dropdown(){

    const [isActive, setIsActive] = useState(false);    

    const options = [
        {
            name: 'Hardware',
            subItems: [
                {
                    name: 'Coolers'
                }
            ]                
        },
        {
            name: 'Hardware',
            subItems: [
                {
                    name: 'Coolers'
                }
            ]                
        }
    ]

    return(
        <DropdownContainer>
            <DropdownButton onMouseEnter={() => setIsActive(!isActive)} >
                TODOS OS DEPARTAMENTOS
                <span className="fas fa-caret-down"></span>
            </DropdownButton>
            {isActive && (
                <DropdownContent onMouseLeave={() => setIsActive(!isActive)}>
                    { options.map((option) => (
                        <DropdownItem>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                {option.name}
                                <MdArrowForwardIos/>
                            </div>                        
                            <DropdownSubItems>     
                                {option.subItems.map((subItems) => (
                                    <DropdownSubItem>
                                        {subItems.name}
                                        <MdArrowForwardIos/>
                                    </DropdownSubItem>
                                ))}                                                                                           
                            </DropdownSubItems>
                        </DropdownItem>   
                    ))}                                     
                </DropdownContent>
            )}        
        </DropdownContainer>
    )
}

const DropdownSubItem = styled.div`
    display: flex;
    background: white;
    color: var(--text-grey);
    font-weight: 300;
    text-transform: none;
    height: 30px;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    width: 300px;

    &:hover{
        background: #DEE0E4;
    }
    flex-direction: row;
    
`;

const DropdownSubItems = styled.div`
    display: flex;    
    margin-left: 120px;
`;

const DropdownItem = styled.div`
    display: flex;
    background: white;
    color: var(--text-grey);
    font-weight: 300;
    text-transform: none;
    height: 30px;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
    &:first-child{
        margin-top: 8px;
    }    

    &:hover{
        background: #DEE0E4;
    }
    flex-direction: row;
`;

const DropdownContent = styled.div`
    position: absolute;
    max-width: 400px;
    width: 100%;

`;

const DropdownButton = styled.div`

`;

const DropdownContainer = styled.div`
    width: 100%;
    background: var(--orange-text);
    position: relative;
`;