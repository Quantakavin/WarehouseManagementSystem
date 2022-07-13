import { Container, Paper, TableContainer, Table, TableCell, TableHead, TableRow } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import { UseInfiniteQueryResult } from "react-query";
import TableHeader from "./TableHeader";
import { ActionMenuItem } from "../../utils/CommonTypes";
import LoadMoreButton from "./LoadMoreButton";
import TableContents from "./TableContents";
import TableSkeleton from "../skeletons/TableSkeleton";

interface TableProps {
  headers: string[];
  query: UseInfiniteQueryResult<{
    response: AxiosResponse<any, any>;
    nextPage: number;
    totalPages: number;
}, unknown>;
  menu: (id?: string) => ActionMenuItem[];
  filter: (header: string) => void;
}

const TableNew = ({ headers, query , menu, filter}: TableProps) => {
  return (
    <Container sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" >
          <TableHead>
            <TableRow>
              {headers.map((header, key) => (
                <TableHeader key={key} header={header} filter={filter}/>
              ))}
            </TableRow>
          </TableHead>
          {(query.isLoading || query.isError) ? <TableSkeleton NoOfCols={headers.length}/> :
          <>
          <TableContents pages={query.data.pages} menu={menu} />
          </>
          }
        </Table>
        {(!query.isLoading && !query.isError) && <LoadMoreButton query={query} />}
      </TableContainer>
    </Container>
  );
};

export default TableNew;
