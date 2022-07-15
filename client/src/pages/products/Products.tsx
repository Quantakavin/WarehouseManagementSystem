import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery, useInfiniteQuery } from "react-query";
import { GetAllProducts } from "../../api/ProductDB";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import TableNew from "../../components/table/TableNew";

const Products: React.FC = () => {
  const headers = [
    "ID",
    "Item Name",
    "Batch Number",
    "Brand",
    "Avalible Quantity",
    "Action",
  ];
  const ProductsQuery = useInfiniteQuery(`products`, GetAllProducts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      }
    });

  const ActionMenu = (id: string) => {
    return (
      [
        {
          name: "View Details",
          url: `/product/${id}`,
          icon: <PageviewIcon fontSize="small" />,
          delete: false
        }
      ]
    )
  }

  return (
    <>
      <h2 className="pagetitle"> Item Search </h2>
      <SearchBarUpdated />

      {ProductsQuery.isLoading || ProductsQuery.isError ? null :
      <>
        <TableNew headers={headers} pages={ProductsQuery.data.pages} query={ProductsQuery} menu={ActionMenu} />
        </>
      }
    </>
  )
};
export default Products;
