import {
    Box,
    Button,
    Card,
    CardContent, Typography
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "../styles/Error404.scss";

function Error403() {
  const navigate = useNavigate();
  const URL = window.location.href;

  return (
    <Box sx={{ height: 1, width: 1, p: 3, pb: 0 }}>
      <Card
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
        <Typography
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: 300,
                textAlign: "center",
              }}
            >
              403
              <br />
            </Typography>

          <Box
            sx={{
              color: "black",
              fontWeight: "normal",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            <Typography
              sx={{
                color: "#063970",
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              Oops!
              <br />
            </Typography>
            You aren't allowed to access this page
            <br />
            Please return to the page you on
          </Box>
          <Box
            component="span"
            paddingTop={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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
                  backgroundColor: "#063970",
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                }}
                onClick={() => navigate(-2)}
              >
                Back
              </Button>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Error403;
