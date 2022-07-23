import { Container, Paper, Table, TableContainer } from "@mui/material";
import TableHeader from "./TableHeader";

interface TableProps {
  headers: string[];
}

const EmptyTable = ({ headers }: TableProps) => {
  return (
    <Container sx={{ width: "95%", marginTop: "50px" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeader headers={headers} />
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmptyTable;
