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
  Divider,
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
        padding: { xs: 2, md: 10 },
        marginY: 10,
        borderRadius: 2,
        boxShadow: "0px 0px 33px -4px rgba(0,0,0,0.15)",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      <Box
        flex={2}
        sx={{
          padding: { xs: 2, sm: 4 },
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          marginLeft={3}
          sx={{ color: "#3F6059" }}
        >
          Your Cart
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                paddingY: { xs: 2, sm: 1 },
                borderBottom: "1px solid #ddd",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="book cover"
                    src={`${item.cover}`}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: { xs: "120px", md: "200px" },
                      ml: 2,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      color: "#888",
                      fontSize: "0.875rem",
                      ml: 2,
                    },
                  }}
                  primary={item.name}
                  secondary={`Price: $${item.price.toFixed(2)}`}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: { xs: "100%", sm: "auto" },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleDeleteItem(e, item.id)}
                  sx={{
                    "&:hover": { color: "red" },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleAddItem(e, item)}
                  sx={{ marginRight: 2 }}
                >
                  <AddIcon />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    ml: { xs: 2, sm: 0 },
                  }}
                >
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={(e) => handleDeleteItem(e, item.id, true)}
                  sx={{
                    "&:hover": { color: "red" },
                    ml: 2,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Order Summary */}
      <Box
        flex={1}
        padding={3}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          width: { xs: "100%", md: "auto" },
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#3F6059" }}>
          Order Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Items ({items.length})</Typography>
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
            sx={{ borderRadius: 2, backgroundColor: "#f0f0f0" }}
          >
            <MenuItem value={"Standard Delivery - $5"}>
              Standard Delivery - $5
            </MenuItem>
            <MenuItem value={"Delivery Express - $20"}>
              Delivery Express - $20
            </MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${grandTotal.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{
            mt: 3,
            paddingY: 2,
            backgroundColor: "#3F6059",
            "&:hover": {
              backgroundColor: "#2c4946",
            },
          }}
          onClick={() => navigate("/cart/checkout")}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
