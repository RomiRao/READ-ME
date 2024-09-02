import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Box, Container } from "@mui/system";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    items,
    addItems,
    delItems,
    shipping,
    setShipping,
    grandTotal,
    totalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setShipping(event.target.value);
  };

  const handleAddItem = (e, book) => {
    e.stopPropagation();
    addItems(e, book);
  };

  const handleDeleteItem = (e, id, removeAll = false) => {
    e.stopPropagation();
    delItems(e, id, removeAll);
  };

  return (
    <Container
      sx={{
        padding: 10,
        marginY: 10,
        border: "2px solid black",
        display: "flex",
        gap: 4,
      }}
    >
      <Box flex={2}>
        <Typography variant="h4" gutterBottom>
          Your cart
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem key={item.id} sx={{ height: 100, alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar alt="book cover" src={`${item.cover}`} />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
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
                sx={{ marginRight: 2 }}
                onClick={(e) => handleAddItem(e, item)}
              >
                <AddIcon />
              </IconButton>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                ml={2}
              >
                <Typography>${item.price.toFixed(2)}</Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
              <IconButton
                size="small"
                color="inherit"
                sx={{ ml: 2 }}
                onClick={(e) => handleDeleteItem(e, item.id, true)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Items {items.length}</Typography>
          <Typography>${totalPrice.toFixed(2)}</Typography>
        </Box>
        <InputLabel id="shipping-select" sx={{ marginBottom: 3 }}>
          Shipping
        </InputLabel>
        <FormControl fullWidth>
          <Select
            labelId="shipping-select"
            id="shipping-select"
            value={shipping}
            onChange={handleChange}
          >
            <MenuItem value={"Standar Delivery - $5"}>
              Standar Delivery - $5
            </MenuItem>
            <MenuItem value={"Delivery Express - $20"}>
              Delivery Express - $20
            </MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${grandTotal.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/cart/checkout")}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
