import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Fab from "@mui/material/Fab";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import Divider from "@mui/material/Divider";
import { Chip, Grid } from "@mui/material";
import { executeReducerBuilderCallback } from "@reduxjs/toolkit/dist/mapBuilders";
import { GetProduct } from "../../api/ProductDB";
import { Toast } from "../../components/alerts/SweetAlert";
import CardContainer from "../../components/cards/CardContainer";
import CardField from "../../components/cards/CardField";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import IsEditableProvider, {
  EditableContext,
} from "../../components/context/isEditableContext";
import { useAppSelector } from "../../app/hooks";
import {
  selectPermissions,
  selectRole,
} from "../../app/reducers/CurrentUserSlice";

const ViewProduct: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [productGet, setProductGet] = useState([]);
  const context = useContext(EditableContext);
  const { isEditable, setIsEditable, TLoanIDGlobal } = context;
  const permissions = useAppSelector(selectPermissions);

  const ExternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal+External)"
  );
  const InternalApplication = permissions.some(
    (e) => e.FeatureName === "T-Loan Application (Internal)"
  );
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const product = await axios.get(
        `http://localhost:5000/api/product/${params.id}`
      );

      setProductGet(product.data);

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  console.log(productGet);

  useEffect(() => {
    const newProduct = productGet.map(
      ({ BinProductPK, ItemNo, ItemName, BatchNo, WarehouseCode }) => ({
        id: BinProductPK,
        ItemNo,
        ItemName,
        BatchNo,
        WarehouseCode,
        price: 0,
      })
    );
    setNewProducts(newProduct);
  }, [productGet]);

  console.log(newProducts);

  const ProductQuery = useQuery([`product${params.id}`, params.id], () =>
    GetProduct(params.id)
  );

  if (ProductQuery.isLoading || ProductQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }

  const { totalItems, addItem } = useCart();

  const newLoanButton = () => {
    if (totalItems > 0) {
      return (
        <motion.div
          className="animatable"
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Fab
            variant="extended"
            aria-label="add"
            onClick={() => {
              isEditable
                ? navigate(`/tloanDraftDetails/${TLoanIDGlobal}`)
                : navigate("/newtloan");
            }}
            sx={{
              color: "white",
              backgroundColor: "#063970",
              ":hover": { backgroundColor: "#031c38" },
              float: "right",
              marginTop: 8,
              marginRight: "5%",
              width: 180,
            }}
          >
            New Loan ({totalItems})
            <ShoppingBasketIcon sx={{ ml: 0.5, mr: 0.5 }} />
          </Fab>
        </motion.div>
      );
    }
  };

  const addProduct = () => {
    const html = [];

    html.push(
      newProducts.map((product) => {
        const { id, ItemName, BatchNo, WarehouseCode } = product;
        const addItemWithAlert = () => {
          addItem(product);
          Toast.fire({
            icon: "success",
            title: "Item Added!",
            customClass: "swalpopup",
            timer: 1000,
            width: 700,
          });
        };
        return (
          <motion.div
            className="animatable"
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.9 }}
          >
            <Fab
              variant="extended"
              aria-label="add"
              onClick={addItemWithAlert}
              sx={{
                color: "white",
                backgroundColor: "#063970",
                ":hover": { backgroundColor: "#031c38" },
                float: "right",

                marginRight: "5%",
                height: "100%",
                width: 200,
                height: 65,
                borderRadius: 10,
              }}
            >
              Add Item To Loan
            </Fab>
          </motion.div>
          // <Button
          // size="normal"
          // variant="contained"
          // sx={{
          //   color: "white",
          //   backgroundColor: "#063970",
          //   height: "100%",
          //   width: 200,
          //   height: 65,
          //   borderRadius: 10,
          // }}
          // onClick={addItemWithAlert}
          // > Add Item to Loan
          // </Button>
        );
      })
    );

    return html;
  };
  if (InternalApplication === true || ExternalApplication === true) {
    return (
      <>
        {newLoanButton()}
        {ProductQuery.status === "success" && (
          <CardContainer
            header={ProductQuery.data.data[0].ItemName}
            subheading={ProductQuery.data.data[0].ItemNo}
          >
            <Divider sx={{ mb: 3 }}>
              <Chip label="Details" sx={{ fontWeight: 500 }} />
            </Divider>
            <Grid container sx={{ pl: 3, pr: 0 }}>
              <Grid item xs={7}>
                <CardField
                  label="Brand"
                  value={ProductQuery.data.data[0].Brand}
                />
                <CardField
                  label="Batch Number"
                  value={ProductQuery.data.data[0].BatchNo}
                />
                <CardField
                  label="Bin Tag"
                  value={ProductQuery.data.data[0].BinTag2}
                />
                <CardField
                  label="Warehouse Code"
                  value={ProductQuery.data.data[0].WarehouseCode}
                />
                <CardField
                  label="Available Quantity"
                  value={ProductQuery.data.data[0].Quantity}
                />
              </Grid>
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={6}>
                    <CardField
                      label="Weight"
                      value={`${ProductQuery.data.data[0].Weight} kg`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CardField
                      label="Length"
                      value={`${ProductQuery.data.data[0].Length} cm`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CardField
                      label="Width"
                      value={`${ProductQuery.data.data[0].Width} cm`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CardField
                      label="Height"
                      value={`${ProductQuery.data.data[0].Height} cm`}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item />
            </Grid>
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

              {addProduct()}
            </div>
          </CardContainer>
        )}
        {/* {addInside()} */}
      </>
    );
  }
  return (
    <>
      {ProductQuery.status === "success" && (
        <CardContainer
          header={ProductQuery.data.data[0].ItemName}
          subheading={ProductQuery.data.data[0].ItemNo}
        >
          <Divider sx={{ mb: 3 }}>
            <Chip label="Details" sx={{ fontWeight: 500 }} />
          </Divider>
          <Grid container sx={{ pl: 3, pr: 0 }}>
            <Grid item xs={7}>
              <CardField
                label="Brand"
                value={ProductQuery.data.data[0].Brand}
              />
              <CardField
                label="Batch Number"
                value={ProductQuery.data.data[0].BatchNo}
              />
              <CardField
                label="Bin Tag"
                value={ProductQuery.data.data[0].BinTag2}
              />
              <CardField
                label="Warehouse Code"
                value={ProductQuery.data.data[0].WarehouseCode}
              />
              <CardField
                label="Available Quantity"
                value={ProductQuery.data.data[0].Quantity}
              />
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={6}>
                  <CardField
                    label="Weight"
                    value={`${ProductQuery.data.data[0].Weight} kg`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardField
                    label="Length"
                    value={`${ProductQuery.data.data[0].Length} cm`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardField
                    label="Width"
                    value={`${ProductQuery.data.data[0].Width} cm`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardField
                    label="Height"
                    value={`${ProductQuery.data.data[0].Height} cm`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item />
          </Grid>
          <div
            className="flexcontainer"
            style={{
              flexDirection: "row",
              marginLeft: "7%",
              marginRight: "7%",
              marginTop: 30,
              marginBottom: 20,
            }}
          />
        </CardContainer>
      )}
      {/* {addInside()} */}
    </>
  );
};
export default ViewProduct;
