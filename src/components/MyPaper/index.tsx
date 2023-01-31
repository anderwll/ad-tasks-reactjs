import styled from "styled-components";

export const MyPaper = styled.div`
    display: flex;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 55rem;
    max-width: 100%;
    min-height: 35rem;
    overflow: hidden;
    position: absolute;
    background-color: #fff;

    @media screen and (max-width: 1000px) {
        width: 27.5rem;
        transform: scale(2);
    }

`;