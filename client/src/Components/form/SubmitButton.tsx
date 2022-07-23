import { motion } from "framer-motion";
import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

interface ButtonProps {
  $loading: boolean;
  $multipartform: boolean;
}

interface SubmitButtonProps {
  loading: boolean;
  multipart: boolean;
  text: string;
}

const Button = styled(motion.button)<ButtonProps>`
  width: ${(props) => (props.$multipartform ? 25 : 85)}%;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  font-weight: 700;
  border-radius: 25px;
  border: solid 1px #0a2540;
  background-color: #0a2540;
  font-size: 23;
  color: white;
  margin-left: ${(props) => (props.$multipartform ? "auto" : 0)};
  opacity: ${(props) => (props.$loading ? 0.5 : 1)};
`;

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  multipart,
  text,
}) => {
  return (
    <Button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      $loading={loading}
      $multipartform={multipart}
      type="submit"
      disabled={loading}
    >
      {!loading ? (
        text
      ) : (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </Button>
  );
};

export default SubmitButton;
