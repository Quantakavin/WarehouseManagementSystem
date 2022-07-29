import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type BasketProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  ItemNo: string;
  ItemName: string;
  BatchNo: string;
  WarehouseCode: string;
  quantity: number;
};

type BasketContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (
    id: number,
    ItemNo: string,
    ItemName: string,
    BatchNo: string,
    WarehouseCode: string
  ) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}
export function BasketProvider({ children }: BasketProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "Loan-Basket",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  const [productGet, setProductGet] = useState([]);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const product = await axios.get(
        `http://localhost:5000/api/products?limit=100000&page=0`
      );
      setProductGet(product.data);
      // setLoan(Object.e)
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [
          ...currItems,
          {
            id,
            ItemNo: "",
            ItemName: "",
            BatchNo: "",
            WarehouseCode: "",
            quantity: 1,
          },
        ];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
