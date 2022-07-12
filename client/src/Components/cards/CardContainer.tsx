import React from "react";
import { Container } from "react-bootstrap";

interface CardContainerProps {
    header: string;
    subheading: string
    children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({header, subheading, children}) => {
    return(
        <Container className="cardcontainer shadow">
            <h2 className="cardheader">{header}</h2>
            <p className="cardsubheading">{subheading}</p>
            {children}
        </Container>
    )
}

export default CardContainer;