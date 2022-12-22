import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Carousel } from 'react-bootstrap';

const DivCarrousel = styled.div`
    img {
        width: 100%;
        height: 40rem;
    }
`;

const Carrousel = () => {
    return (
        <DivCarrousel>
            <Carousel 
                fade 
                nextIcon={false} 
                prevIcon={false}
            >
                <Carousel.Item interval={800}>
                    <img src="./assets/img1.jpg" alt="First slide" />
                </Carousel.Item> 
                <Carousel.Item interval={800}>
                    <img src="./assets/img2.jpg" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item interval={800}>
                    <img src="./assets/img3.jpg" alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item interval={800}>
                    <img src="./assets/img4.jpg" alt="Third slide" />
                </Carousel.Item>
            </Carousel>
        </DivCarrousel>
    );
};

export default Carrousel;