import React from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Error401 = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: "100%", width: 1, p: 3, pb: 0 }}>
      <Grid item xs={12}>
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
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 250,
                    textAlign: "center",
                  }}
                >
                  401
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    color: "black",
                    fontWeight: "normal",
                    textAlign: "center",
                    fontSize: 40,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#063970",
                      fontWeight: "bold",
                      fontSize: 70,
                    }}
                  >
                    Oops!
                    <br />
                  </Typography>
                  You have not been authenticated!
                  <br />
                  Please login
                </Box>
              </Grid>
              <Grid item xs={12}>
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
                      onClick={() => navigate("/")}
                    >
                      Login Page
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Error401;
