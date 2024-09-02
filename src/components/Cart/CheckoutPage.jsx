import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const steps = ["Shipping Information", "Payment Details"];

export default function CheckoutPage() {
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
      if (!paymentData.cardNumber) errors.cardNumber = "Required";
      if (!paymentData.expiryDate) errors.expiryDate = "Required";
      if (!paymentData.cvv) errors.cvv = "Required";
      if (!paymentData.cardholderName) errors.cardholderName = "Required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setOpenModal(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container sx={{ width: "100%", paddingY: 10 }}>
      <Stepper activeStep={activeStep} sx={{ paddingX: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <Box
              component="form"
              sx={{
                mt: 2,
                mb: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                value={shippingData.email}
                onChange={(e) =>
                  setShippingData({ ...shippingData, email: e.target.value })
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
                  setShippingData({ ...shippingData, address: e.target.value })
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
                  setShippingData({ ...shippingData, state: e.target.value })
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
                  setShippingData({ ...shippingData, country: e.target.value })
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
                label="Número"
                variant="outlined"
                inputProps={{
                  inputMode: "numeric", // Sugiere el teclado numérico en móviles
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
            </Box>
          )}
          {activeStep === 1 && (
            <Box
              component="form"
              sx={{
                mt: 2,
                mb: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="card-number"
                label="Card Number"
                type="number"
                value={paymentData.cardNumber}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cardNumber: e.target.value })
                }
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
              />
              <TextField
                required
                id="expiry-date"
                label="Expiry Date"
                type="month"
                value={paymentData.expiryDate}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, expiryDate: e.target.value })
                }
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
              />
              <TextField
                required
                id="cvv"
                label="CVV"
                type="number"
                value={paymentData.cvv}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cvv: e.target.value })
                }
                error={!!errors.cvv}
                helperText={errors.cvv}
              />
              <TextField
                required
                id="cardholder-name"
                label="Cardholder Name"
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
            </Box>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      <Typography variant="caption">
        This is just an example checkout page. Please do not use real
        information.
      </Typography>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please complete all required fields.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
