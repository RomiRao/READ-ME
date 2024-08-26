import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

import { Box, Container } from "@mui/system";
import Navbar from "../Navbar/Navbar";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const { items, addItems, delItems } = useContext(CartContext);

  const handleAddItem = (e, book) => {
    e.stopPropagation();
    addItems(e, book);
  };

  const handleDeleteItem = (e, id, removeAll = false) => {
    e.stopPropagation();
    delItems(e, id, removeAll);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ padding: 10, marginY: 10, border: "2px solid black" }}>
        <Box>
          <Typography variant="h4">Your cart</Typography>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar alt="book cover" src={`${item.cover}`} />
                </ListItemAvatar>
                <ListItemText>{item.name}</ListItemText>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleDeleteItem(e, item.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleAddItem(e, item)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleDeleteItem(e, item.id, true)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box></Box>
      </Container>
      ;
    </>
  );
}
