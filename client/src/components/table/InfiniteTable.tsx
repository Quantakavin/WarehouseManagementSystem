import React from "react";
import {
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { UseInfiniteQueryResult } from "react-query";
import { ActionMenuItem } from "../../utils/CommonTypes";
import TableSkeleton from "../skeletons/TableSkeleton";
import LoadMoreButton from "./LoadMoreButton";
import TableContents from "./TableContents";
import TableHeader from "./TableHeader";

interface TableProps {
  headers: string[];
  query: UseInfiniteQueryResult<
    {
      response: AxiosResponse<any, any>;
      nextPage: number;
      totalPages: number;
    },
    unknown
  >;
  menu: (id?: string) => ActionMenuItem[];
  filter: (header: string) => void;
  sortColumn: string;
  sortOrder: string;
}

const InfiniteTable = ({
  headers,
  query,
  menu,
  filter,
  sortColumn,
  sortOrder,
}: TableProps) => {
  return (
    <Container sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, key) => (
                <TableHeader
                  key={key}
                  header={header}
                  filter={filter}
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                />
              ))}
            </TableRow>
          </TableHead>
          {query.isLoading || query.isError ? (
            <TableSkeleton NoOfCols={headers.length} />
          ) : (
            <TableContents pages={query.data.pages} menu={menu} />
          )}
        </Table>
        {!query.isLoading && !query.isError && <LoadMoreButton query={query} />}
      </TableContainer>
    </Container>
  );
};

export default InfiniteTable;
