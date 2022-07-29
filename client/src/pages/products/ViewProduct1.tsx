import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Fab from "@mui/material/Fab";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "react-use-cart";
import { GetProduct } from "../../api/ProductDB";
import { Toast } from "../../components/alerts/SweetAlert";
import CardContainer from "../../components/cards/CardContainer";
import CardField from "../../components/cards/CardField";
import CardSkeleton from "../../components/skeletons/CardSkeleton";


const ViewProduct: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const [productGet, setProductGet] = useState([]);

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
        ItemNo: ItemNo,
        ItemName: ItemName,
        BatchNo: BatchNo,
        WarehouseCode: WarehouseCode,
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

 
  const { totalItems,
    addItem } = useCart();

    const addInside = () =>{
      const itemsss = { 'id':1, 'Ware':'fewfq'}
      const setLOL = localStorage.getItem('react-use-cart')
      console.log(JSON.parse(setLOL).items)
     
      function handleaddi(){
        const setItemlist = localStorage.setItem(localStorage.getItem('react-use-cart'.items), JSON.stringify(itemsss))
      }
      return (
        <button onClick={handleaddi}>
          press
        </button>
      )
    }
   


    const newLoanButton = () =>{

      if(totalItems > 0){
        return(
          <motion.div
          className="animatable"
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98 }}
        >
          <Fab
            variant="extended"
            aria-label="add"
            onClick={() => navigate("/newtloan")}
            sx={{
              color: "white",
              backgroundColor: "#063970",
              ":hover": { backgroundColor: "#031c38" },
              float: "right",
              marginTop:8,
              marginRight: "5%",
              width: 180
            }}
          >
            New Loan 
            ({totalItems}) 
            <ShoppingBasketIcon sx={{ml:0.5, mr:0.5}}/> 
          </Fab>
        </motion.div>
          // <Button 
          // size="big"
          // variant="contained"
          // sx={{
          //   color: "white",
          //   backgroundColor: "#063970",
          //   width: 180,
          //   height: 60,
          //   borderRadius: 10,
          //   float: "right",
          //   marginTop:8,
          //   marginRight: "5%"
          // }}
          // onClick={() => navigate('/newtloan')}> <ShoppingBasketIcon style={{marginRight: 1}}/><span/> New Loan ({totalItems}) </Button>
          )
      }else{
        return
      }

     
  }

    const addProduct = () =>{

      let html =[]
    
      html.push(

        newProducts.map((product)=>{

          const {id, ItemName, BatchNo, WarehouseCode} = product
          const addItemWithAlert =() =>{
              addItem(product)
              Toast.fire({
                icon: "success",
                title: "Item Added!",
                customClass: "swalpopup",
                timer: 1000,
                width: 700,
              });
           
           
    
          }
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
          )
        })
      )
    
      return html
    }

  return (
    <>
      {newLoanButton()}
      {ProductQuery.status === "success" && (
        <CardContainer
          header={ProductQuery.data.data[0].ItemName}
          subheading={ProductQuery.data.data[0].ItemNo}
        >
          <CardField label="Brand:" value={ProductQuery.data.data[0].Brand} />
          <CardField
            label="Batch Number:"
            value={ProductQuery.data.data[0].BatchNo}
          />
          <CardField
            label="Bin Tag:"
            value={ProductQuery.data.data[0].BinTag2}
          />
          <CardField
            label="Warehouse Code:"
            value={ProductQuery.data.data[0].WarehouseCode}
          />
          <CardField
            label="Weight:"
            value={ProductQuery.data.data[0].Weight + " kg"}
          />
          <CardField
            label="Length:"
            value={ProductQuery.data.data[0].Length + " cm"}
          />
          <CardField
            label="Width:"
            value={ProductQuery.data.data[0].Width + " cm"}
          />
          <CardField
            label="Height:"
            value={ProductQuery.data.data[0].Height + " cm"}
          />
          <CardField
            label="Availible Quantity:"
            value={ProductQuery.data.data[0].Quantity}
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

            {addProduct()}
          </div>
        </CardContainer>
      )}

{/* {addInside()} */}
     
    </>
  );
};
export default ViewProduct;
