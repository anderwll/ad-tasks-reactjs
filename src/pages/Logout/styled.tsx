import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
       display: inline-block;
       border-right: 2px solid #000;
       padding-right: 3px;
       max-width: 0;
       white-space: nowrap;
       overflow: hidden;
       animation: show normal infinite .5s, write normal 4s steps(50) both;
    }

    @keyframes show {
        100% {
            border-right-color: transparent;
        }
    }

    @keyframes write {
        100% {
            max-width: 100%;
        }
    }
`;