import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import Navbar from "./Navbar/Navbar";
import { CartContext } from "../context/CartContext";

import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { RotatingLines } from "react-loader-spinner";
import Footer from "./Footer";

// Creates table content
function createData(label, data) {
  return { label, data };
}

function Detail() {
  const { spBook, detailBook } = useBooks();
  let { id } = useParams();
  const { addItems } = useContext(CartContext);

  useEffect(() => {
    detailBook(id);
  }, [id, detailBook]);

  const rows = [
    createData("Author", spBook.author),
    createData("Category", spBook.category),
    createData("Genres", spBook.genre ? spBook.genre.join(" ") : ""),
    createData("State", spBook.new ? "New" : "Used"),
    createData("Price", spBook.price),
  ];

  return (
    <>
      <Navbar />

      <Container sx={{ marginY: 5 }}>
        {spBook.name ? (
          <>
            <Typography variant="h3" marginBottom={6}>
              {spBook.name}
            </Typography>
            <Grid container spacing={3}>
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
                  src={spBook.cover}
                />
                <Button
                  variant="contained"
                  startIcon={<LocalMallIcon />}
                  sx={{
                    backgroundColor: "#3F6059",
                    "&:hover": {
                      backgroundColor: "#2c4946",
                    },
                  }}
                  onClick={(e) => addItems(e, spBook)}
                >
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.label}
                          </TableCell>
                          <TableCell align="right">{row.data}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box display="flex" justifyContent="center">
            <RotatingLines
              visible={true}
              height="50"
              width="50"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Detail;
