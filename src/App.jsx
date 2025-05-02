import { useState } from "react";
import { Stepper, Step, StepLabel, Container, CircularProgress, Typography, Box } from "@mui/material";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import Step3Form from "./components/Step3Form";
import PaymentHeader from "./components/PaymentHeader";

const steps = ["Datos del vehículo", "Info del cliente", "Método de pago"];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    vehiculo: {},
    cliente: {},
    pago: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async (stepData, stepNumber) => {
    // Paso 1: Guardar datos del vehículo y buscar propietario
    if (stepNumber === 0) {
      setFormData(prev => ({ ...prev, vehiculo: stepData }));
      setLoading(true);
      setError(null);

      try {
        // Simulamos un delay para testing (remover en producción)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`http://localhost:8080/api/vehiculos/propietario/${stepData.placa}`);

        if (!response.ok) {
          throw new Error(response.status === 404
            ? "Vehículo no encontrado"
            : "Error al consultar datos");
        }

        const propietarioData = await response.json();
        setFormData(prev => ({
          ...prev,
          cliente: propietarioData
        }));
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
        return; // No avanzamos si hay error
      }

      setLoading(false);
    }

    // Paso 2: Guardar datos del cliente
    if (stepNumber === 1) {
      setFormData(prev => ({ ...prev, cliente: stepData }));
    }

    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleFinalSubmit = (paymentData) => {
    const fullData = { ...formData, pago: paymentData };
    console.log("Datos completos:", fullData);
    alert("Formulario completado! Ver consola para los datos.");
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <PaymentHeader />
      <Container maxWidth="sm" sx={{ mt: 4, position: 'relative', flex: 1 }}>
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            color: 'white'
          }}>
            <CircularProgress color="inherit" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Buscando información del propietario...
            </Typography>
          </div>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stepper orientation="vertical" activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div style={{ margin: "2rem 0" }}>
          {activeStep === 0 && (
            <Step1Form
              onNext={(data) => handleNext(data, 0)}
              initialValues={formData.vehiculo}
            />
          )}

          {activeStep === 1 && (
            <Step2Form
              onNext={(data) => handleNext(data, 1)}
              onBack={handleBack}
              initialData={formData.cliente}
            />
          )}

          {activeStep === 2 && (
            <Step3Form
              onBack={handleBack}
              onSubmit={handleFinalSubmit}
            />
          )}
        </div>
      </Container>
    </Box>
  );
}