import * as React from "react";
import useBooks from "../../hooks/useBooks";
import { CartContext } from "../../context/CartContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const steps = ["Shipping Information", "Payment Details"];

export default function CheckoutPage() {
  const { items, grandTotal, shippingCost, clearCart } =
    React.useContext(CartContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [shippingData, setShippingData] = React.useState({
    email: "",
    address: "",
    state: "",
    country: "",
    city: "",
    number: "",
  });
  const [paymentData, setPaymentData] = React.useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [openModal, setOpenModal] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [orderSummary, setOrderSummary] = React.useState(null);

  const validateForm = () => {
    let errors = {};
    if (activeStep === 0) {
      if (!shippingData.email) errors.email = "Required";
      if (!shippingData.address) errors.address = "Required";
      if (!shippingData.state) errors.state = "Required";
      if (!shippingData.country) errors.country = "Required";
      if (!shippingData.city) errors.city = "Required";
      if (!shippingData.number) errors.number = "Required";
    } else if (activeStep === 1) {
      if (!paymentData.cardNumber || paymentData.cardNumber.length !== 19)
        errors.cardNumber = "Card number must be 16 digits";
      if (!paymentData.expiryDate) errors.expiryDate = "Required";
      if (!paymentData.cvv || paymentData.cvv.length !== 3)
        errors.cvv = "CVV must be 3 digits";
      if (!paymentData.cardholderName) errors.cardholderName = "Required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const { updateBooks } = useBooks();

  const handleNext = async () => {
    if (validateForm()) {
      if (activeStep === steps.length - 1) {
        try {
          await updateBooks(items);
          clearCart();
          setOrderSummary({
            items: items,
            grandTotal: grandTotal,
            shippingCost: shippingCost,
          });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } catch (error) {
          console.error("Error updating documents:", error);
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setOpenModal(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D+/g, "");
    return cleaned.match(/.{1,4}/g)?.join(" ") || "";
  };

  // Calculate shipping date
  const today = new Date();
  const estimatedArrivalDate = new Date(today);
  estimatedArrivalDate.setDate(today.getDate() + 10);

  // Format date
  const formattedDate = estimatedArrivalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        paddingY: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          {activeStep < steps.length && (
            <Stepper activeStep={activeStep} sx={{ paddingX: 1 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {activeStep === steps.length ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#ffffff",
                width: "80%",
                maxWidth: 600,
                textAlign: "center",
                height: "100%", // Ensure it takes up the available space
              }}
            >
              <Typography variant="h4" gutterBottom mb={5}>
                Your Order is Confirmed!
              </Typography>
              <Typography variant="h7" gutterBottom>
                Thank you for your purchase. Your order is on the way!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Estimated day of arrival: {formattedDate}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Products
                </Typography>
                <List sx={{ mb: 5 }}>
                  {orderSummary?.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar alt="book cover" src={`${item.cover}`} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <Typography>{item.quantity}</Typography>
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Shipping Cost: {orderSummary?.shippingCost}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Grand Total: {orderSummary?.grandTotal}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                mt: 2,
              }}
              noValidate
              autoComplete="off"
            >
              {activeStep === 0 && (
                <>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    type="email"
                    value={shippingData.email}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        email: e.target.value,
                      })
                    }
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    required
                    id="address"
                    label="Address (Street)"
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        address: e.target.value,
                      })
                    }
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                  <TextField
                    required
                    id="state"
                    label="State"
                    value={shippingData.state}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        state: e.target.value,
                      })
                    }
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                  <TextField
                    required
                    id="country"
                    label="Country"
                    value={shippingData.country}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        country: e.target.value,
                      })
                    }
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                  <TextField
                    required
                    id="city"
                    label="City"
                    value={shippingData.city}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, city: e.target.value })
                    }
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                  <TextField
                    required
                    label="ID"
                    variant="outlined"
                    inputProps={{
                      inputMode: "numeric",
                    }}
                    value={shippingData.number}
                    onChange={(e) =>
                      setShippingData({
                        ...shippingData,
                        number: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    error={!!errors.number}
                    helperText={errors.number}
                  />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <TextField
                    required
                    id="card-number"
                    label="Card Number"
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardNumber: formatCardNumber(e.target.value),
                      })
                    }
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    inputProps={{
                      maxLength: 19,
                    }}
                  />
                  <TextField
                    required
                    id="expiry-date"
                    label="Expiry Date"
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        expiryDate: e.target.value,
                      })
                    }
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                    inputProps={{
                      maxLength: 5,
                    }}
                  />
                  <TextField
                    required
                    id="cvv"
                    label="CVV"
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cvv: e.target.value,
                      })
                    }
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    inputProps={{
                      maxLength: 3,
                    }}
                  />
                  <TextField
                    required
                    id="cardholder-name"
                    label="Cardholder Name"
                    type="text"
                    value={paymentData.cardholderName}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardholderName: e.target.value,
                      })
                    }
                    error={!!errors.cardholderName}
                    helperText={errors.cardholderName}
                  />
                </>
              )}
              <Box display="flex" justifyContent="space-between">
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
        {activeStep < steps.length && (
          <Grid item xs={12} md={4}>
            {items.length > 0 && (
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <List>
                  {items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar alt="book cover" src={`${item.cover}`} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <Typography>{item.quantity}</Typography>
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Shipping Cost: {shippingCost}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Grand Total: {grandTotal}
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Validation Errors</DialogTitle>
        <DialogContent>
          <Typography>{Object.values(errors).join(", ")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
