import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { Container } from "react-bootstrap";

interface SkeletonProps {
  NoOfFields: number;
}

const CardContainer: React.FC<SkeletonProps> = ({ NoOfFields }) => {
  const SkeletonFields = () => {
    const SkeletonArray = [];
    for (let i = 0; i < NoOfFields; i += 1) {
      SkeletonArray.push(
        <Skeleton variant="text" sx={{ marginBottom: "5px" }} />
      );
    }
    return SkeletonArray;
  };

  return (
    <Container className="cardcontainer shadow">
      <Skeleton
        variant="rectangular"
        width="30%"
        height={22}
        sx={{ marginBottom: "15px", marginTop: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width="20%"
        height={18}
        sx={{ marginBottom: "30px" }}
      />
      {/* {
                [...Array(NoOfFields)].map((v, i) => <Skeleton key={i} variant="text" sx={{marginBottom: "5px"}} /> )
            } */}
      {SkeletonFields()}
    </Container>
  );
};

export default CardContainer;
