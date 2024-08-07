import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";

//Creates table content
function createData(label, data) {
  return { label, data };
}

function Detail() {
  const { spBook, detailBook } = useBooks();

  let { id } = useParams();

  useEffect(() => {
    detailBook(id);
  }, [id, detailBook]);

  const rows = [
    createData("Category", spBook.category),
    createData("Genres", spBook.genre ? spBook.genre.join(" ") : ""),
    createData("State", spBook.new ? "New" : "Used"),
    createData("Price", spBook.price),
  ];

  return (
    <Container>
      <Typography variant="h3" marginBottom={6}>
        {spBook.name}
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "200px",
              maxHeight: "250px",
              boxShadow: "-3px 11px 16px -6px rgba(0,0,0,0.75)",
              marginBottom: 6,
            }}
            alt={`${spBook.name} cover`}
            src={`${spBook.cover}`}
          />
          <Button variant="contained" startIcon={<LocalMallIcon />}>
            ADD TO CART
          </Button>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" marginBottom={3}>
            Detail
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            {spBook.detail}
          </Typography>

          {/* Book content */}
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.label}
                    </TableCell>
                    <TableCell align="right">{row.data}</TableCell>

                    <TableCell align="right">
                      <Stack spacing={2}></Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Detail;
