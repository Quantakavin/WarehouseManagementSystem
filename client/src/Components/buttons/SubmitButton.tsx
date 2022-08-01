import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  text: string | React.ReactNode;
  loading: boolean;
  multipart?: boolean;
}

const SubmitButton: React.FC<ButtonProps> = ({ text, loading, multipart }) => {
  return (
    <motion.div
      className="animatable"
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        size="small"
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#0a2540",
          width: multipart ? "85%" : 150,
          height: 50,
          borderRadius: 10,
          textTransform: "none",
          marginBottom: "10px",
          fontSize: 15,
          marginTop: "10px",
        }}
        type="submit"
      >
        {!loading ? text : <CircularProgress color="inherit" size={20} />}
      </Button>
    </motion.div>
  );
};

export default SubmitButton;
