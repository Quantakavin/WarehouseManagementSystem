import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, {useState, useEffect, Component} from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GetProduct } from "../../api/ProductDB";
import CardContainer from "../../components/cards/CardContainer";
import CardField from "../../components/cards/CardField";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { useCart} from "react-use-cart";
import _ from "lodash"
import axios from 'axios'


const ViewProduct: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState()
  const [productGet, setProductGet] = useState([])


  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const product = await axios.get(
        `http://localhost:5000/api/product/${params.id}`
      );

      setProductGet(product.data)

      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  console.log(productGet)

  useEffect(() => {

    const newProduct = productGet.map(
        ({ BinProductPK, ItemNo, ItemName, BatchNo, WarehouseCode  }) => ({
            id: BinProductPK,
            ItemNo: ItemNo,
            ItemName: ItemName,
            BatchNo: BatchNo,
            WarehouseCode: WarehouseCode,
            price: 0
        })
    )
    setNewProducts(newProduct)

}, [productGet])

console.log(newProducts)

  
  const ProductQuery = useQuery([`product${params.id}`, params.id], () =>
    GetProduct(params.id)
  );

  

  if (ProductQuery.isLoading || ProductQuery.isError) {
    return <CardSkeleton NoOfFields={4} />;
  }


  const { addItem } = useCart();

    const addProduct = () =>{

      let html =[]

      html.push(

        newProducts.map((product)=>{

          const {id, ItemName, BatchNo, WarehouseCode} = product
  
          return (
            <button onClick={() => addItem(product)}> Add Item to Loan</button>
          )
        })
      )
    
      return html
    }

  return (
    <>
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
    </>
  );
};
export default ViewProduct;
