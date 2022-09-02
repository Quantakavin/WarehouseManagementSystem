import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GetEmptyBins } from "../../api/BinLocationDB";
import { useAppDispatch } from "../../app/hooks";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

const EmptyBins: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "Bin Locations" }));
  }, [dispatch]);

  const EmptyBinsQuery = useQuery(`emptybins`, () => GetEmptyBins());

  return (
    <Box sx={{ pl: 3, pr: 3, pt: 1, height: "100%", width: "100%" }}>
      <Box
        component="span"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            color: "#0A2540",
            fontWeight: "bold",
            fontSize: 36,
            mb: "20px",
          }}
        >
          Empty Bins List
        </Typography>
      </Box>
      <Box
        style={{
          backgroundColor: "white",
          border: "solid 1px #d3d3d3",
          borderRadius: "5px",
          display: "block",
          height: "650px",
        }}
      >
        <button
          style={{
            alignSelf: "flex-start",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          className="cardbackbutton"
          onClick={() => navigate("/binlocations")}
          type="button"
        >
          <ArrowBackIosIcon fontSize="small" /> Back
        </button>
        {EmptyBinsQuery.status === "success" && (
          <div style={{ maxHeight: "580px", overflow: "auto" }}>
            {EmptyBinsQuery.data.data.length !== 0 ? (
              <div
                className="flexcontainer"
                style={{
                  flexDirection: "column",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                }}
              >
                {EmptyBinsQuery.data.data.map((bin) => {
                  return (
                    <Box
                      className="flexcontainer"
                      sx={{
                        boxShadow: 2,
                        backgroundColor: "white",
                        flexDirection: "column",
                        border: "solid 1px #d3d3d3",
                        borderRadius: "5px",
                        width: "200px",
                        pt: "10px",
                        pb: "10px",
                        mb: "10px",
                        "&:hover": { backgroundColor: "#ededed" },
                      }}
                      key={bin.BinID}
                    >
                      <Typography sx={{ color: "#0A2540", fontWeight: 600 }}>
                        {bin.BinTag2}
                      </Typography>
                    </Box>
                  );
                })}
              </div>
            ) : (
              <div className="flexcontainer">
                <Typography sx={{ mt: "10px", mb: "10px", color: "#0a2540" }}>
                  No Empty Bins
                </Typography>
              </div>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};
export default EmptyBins;
