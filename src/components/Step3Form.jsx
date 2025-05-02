import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    Divider,
    Alert,
    Grid
} from "@mui/material";

export default function Step3Form({ onBack, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            metodoPago: "", // Valor inicial vacío para forzar selección
        },
    });

    const handleFormSubmit = (data) => {
        console.log("Método de pago seleccionado:", data);
        onSubmit(data); // Envía los datos al componente padre
    };

    const metodosPago = [
        { value: "efectivo", label: "Efectivo" },
        { value: "pse", label: "PSE" },
        { value: "corresponsal", label: "Corresponsal Bancario" },
        { value: "datáfono", label: "Datáfono" },
    ];

    return (
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Seleccione el método de pago
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Grupo de Radios para Métodos de Pago */}
            <Controller
                name="metodoPago"
                control={control}
                rules={{ required: "Debe seleccionar un método de pago" }}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        <Grid sx={{display: "flex", gap: 1}} container spacing={2}>
                            {metodosPago.map((metodo) => (
                                <Grid item xs={6} key={metodo.value}>
                                    <FormControlLabel
                                        value={metodo.value}
                                        control={<Radio />}
                                        label={metodo.label}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                )}
            />

            {/* Mensaje de error si no se selecciona método */}
            {errors.metodoPago && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.metodoPago.message}
                </Alert>
            )}

            {/* Botones de acción */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button onClick={onBack} variant="outlined">
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Generar Comprobante
                </Button>
            </Box>
        </Box>
    );
}