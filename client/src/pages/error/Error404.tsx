import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

const Error404 = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "null" }));
  }, []);

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
                  404
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
                  The page you are looking for doesn't exist
                  <br />
                  Please return to the page you were on
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
                      onClick={() => navigate(-1)}
                    >
                      Back
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

export default Error404;
