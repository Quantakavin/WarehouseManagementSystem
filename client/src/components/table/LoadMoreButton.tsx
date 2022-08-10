import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { UseInfiniteQueryResult } from "react-query";

interface QueryProps {
  query: UseInfiniteQueryResult;
}
const LoadMoreButton: React.FC<QueryProps> = ({ query }) => {
  return (
    <div className="flexcontainer" style={{ width: "100%" }}>
      {query.hasNextPage ? (
        <Box>
          {query.isFetchingNextPage ? (
            <CircularProgress
              sx={{ color: "#0A2540", marginTop: "20px", marginBottom: "20px" }}
            />
          ) : (
            <button
              type="button"
              onClick={() => query.fetchNextPage()}
              className="buttonremovestyling"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#0A2540",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <AddCircleOutlineIcon /> Click to Load More
            </button>
          )}
        </Box>
      ) : (
        <p
          style={{
            color: "#0A2540",
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          No more results
        </p>
      )}
    </div>
  );
};
export default LoadMoreButton;
