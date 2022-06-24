import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import { motion } from "framer-motion";

interface ButtonProps {
    $loading: boolean;
    $multipartform: boolean;
}

interface SubmitButtonProps {
    loading: boolean;
    multipart: boolean;
}

const Button = styled(motion.button)<ButtonProps>`
width: ${props => props.$multipartform ? 20 : 85}%; 
padding-top: 8px; 
padding-bottom: 8px; 
margin-bottom: 10px; 
font-weight: 700;
border-radius: 25px;
border: solid 1px #0A2540;
background-color: #0A2540;
font-size: 23;
color: white;
opacity: ${props => props.$loading ? 0.5 : 1}
`;

const SubmitButton: React.FC<SubmitButtonProps> = ({loading, multipart}) => {
    return(
    <Button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} $loading={loading} $multipartform={multipart} type="submit" disabled={loading}>
        {!loading? 'Continue': <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
    </Button>
    )
}

export default SubmitButton;