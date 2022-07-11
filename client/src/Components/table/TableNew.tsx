import { Container, Paper, TableContainer, Table } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import { UseInfiniteQueryResult } from "react-query";
import TableHeader from "./TableHeader";
import { ActionMenuItem } from "../../utils/CommonTypes";
import LoadMoreButton from "./LoadMoreButton";
import TableContents from "./TableContents";

interface TableProps {
  headers: string[];
  menu: (id?: string) => ActionMenuItem[];
  pages: {
    response: AxiosResponse<any, any>;
    nextPage: number;
    totalPages: number;
  }[];
  query: UseInfiniteQueryResult;
}

const TableNew = ({ pages, menu, headers, query }: TableProps) => {
  return (
    <Container sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader headers={headers} />
          <TableContents pages={pages} menu={menu} />
        </Table>
        <LoadMoreButton query={query} />
      </TableContainer>
    </Container>
  );
};

export default TableNew;
