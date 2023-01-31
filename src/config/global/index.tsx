import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100vw !important;
        height: 100vh;
        overflow-x: hidden !important;
        background-color: #e2e2e2 !important;
    } 

    body::-webkit-scrollbar {
        width: 1rem;
        height: 1rem;
        background-color: #707070;
    }

    body::-webkit-scrollbar-thumb {
        background: #b3b3b3;
        border-radius: 0.5px;
    }
`;

export default GlobalStyle;