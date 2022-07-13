import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { motion } from "framer-motion";
import { GetProductDetails } from "../../api/product/GetProductDetails";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";
import CardSkeleton from "../../components/skeletons/CardSkeleton";

const ViewProduct: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const ProductQuery = useQuery([`products${params.binProductPK}`, params.binProductPK], () =>
  GetProductDetails(params.binProductPK)
  );

  if (ProductQuery.isLoading || ProductQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  return (
    <>
      {ProductQuery.status === "success" && (
        <CardContainer
          header={ProductQuery.data.data[0].ItemNo}
          subheading={ProductQuery.data.data[0].ItemName}
        >
          <CardField
            label="Brand:"
            value={ProductQuery.data.data[0].Brand}
          />
          <CardField 
            label="Batch Number:"
            value={ProductQuery.data.data[0].BatchNo}
          />
          <CardField
            label="Bin Number:"
            value={ProductQuery.data.data[0].BinID}
          />
          <CardField
            label="Warehouse Code:"
            value={ProductQuery.data.data[0].WarehouseCode}
          />
          <div
            className="flexcontainer"
            style={{
              flexDirection: "row",
              marginLeft: "7%",
              marginRight: "7%",
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => navigate(-1)}
              type="button"
            >
              <ArrowBackIosIcon fontSize="small" /> Back
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="mainbutton"
              onClick={() => navigate(`/edituser/${params.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Details
            </motion.button>
          </div>
        </CardContainer>
      )}
    </>
  );
};
export default ViewProduct;