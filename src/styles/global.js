import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    .App{
        display: flex;
        flex-direction: column;
        -webkit-box-pack: justify;
        justify-content: space-between;
        min-height: 100vh;           
    }

    * {
        margin: 0px;
        padding: 0px;
        border: none;
        list-style: none;
        box-sizing: border-box;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    :root {
        --background-principal: #f2f3f4;
        --text-grey: #42464d;
        --text-grey-mid: #565c69;
        --text-grey-weak: #7f858d;
        --filter-text: #3f3b3b;
        --orange-strong: #e35214;
        --orange-text: #fc6b0f;
        --orange-weak: #FF6500;
        --white: #FFFFFF;
        --white-weak: #F5F5F5;
        --blue: #0060b1;
        --green: #2DC26E;
        --green-text: #1F9050;
        --red: #E72626;
        --grey-trash-icon: #B6BBC2;
        --grey-line: #DEE0E4;
    }

`;
