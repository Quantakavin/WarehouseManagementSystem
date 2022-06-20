import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import { motion } from "framer-motion";

const Button = styled(motion.button)<{$loading: boolean}>`
width: 85%; 
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

interface ButtonProps {
    loading: boolean
}

const SubmitButton = ({loading}: ButtonProps) => {
    return(
    <Button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} $loading={loading} type="submit" disabled={loading}>
        {!loading? 'Continue': <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
    </Button>
    )
}

export default SubmitButton;