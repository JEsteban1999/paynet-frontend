import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
    Button,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

export default function Step1Form({ onNext, initialValues }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: initialValues || {
            placa: "",
            confirmacion_placa: "",
            modelo: "",
            tipoPago: "contado",
            tipo_vehiculo: "",
            servicio: ""
        }
    });

    // Expresión regular para validar el formato: 3 letras + guión + 3 números
    const placaRegex = /^[A-Za-z]{3}-?\d{3}$/;

    // Función de validación personalizada para comparar placas
    const validatePlacasMatch = (value) => {
        return value === watch('placa') || "Las placas deben coincidir";
    };

    // Función para formatear la placa automáticamente
    const formatPlaca = (value) => {
        // Eliminar cualquier guión existente y convertir a mayúsculas
        let formatted = value.replace(/-/g, '').toUpperCase();

        // Insertar guión después de 3 caracteres si es necesario
        if (formatted.length > 3) {
            formatted = formatted.substring(0, 3) + '-' + formatted.substring(3);
        }

        // Limitar a 7 caracteres (3 letras + guión + 3 números)
        return formatted.substring(0, 7);
    };

    React.useEffect(() => {
        reset(initialValues || {
            placa: "",
            confirmacion_placa: "",
            modelo: "",
            tipoPago: "contado",
            tipo_vehiculo: "",
            servicio: ""
        });
    }, [initialValues, reset]);

    const modelos = [
        { value: "0", label: "Seleccione un modelo" },
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
        { value: "2020", label: "2020" },
    ];

    const tipos_vehiculo = [
        { value: "0", label: "Seleccione un tipo de vehiculo" },
        { value: "particular", label: "Particular" },
        { value: "publico", label: "Público" },
    ]

    const servicios = [
        { value: "0", label: "Seleccione un servicio" },
        { value: "A1", label: "A1" },
        { value: "B1", label: "B1" },
        { value: "C1", label: "C1" },
    ]

    const onSubmit = (data) => {
        console.log("Datos del vehículo:", data);
        onNext(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            {/* Campo Placa (requerido) */}
            <Controller
                name="placa"
                control={control}
                rules={{
                    required: "La placa es obligatoria",
                    pattern: {
                        value: placaRegex,
                        message: "Formato invalido (ejemplo: ABC-123)"
                    },
                    validate: {
                        validFormat: v => placaRegex.test(v) || "Formato invalido (ejemplo: ABC-123)"
                    }
                }}
                render={({ field: { onChange, ...rest } }) => (
                    <TextField
                        {...rest}
                        onChange={(e) => {
                            const formatted = formatPlaca(e.target.value);
                            onChange(formatted);
                        }}
                        label="Placa"
                        margin="normal"
                        sx={{ width: "36%" }}
                        error={!!errors.placa}
                        helperText={errors.placa?.message}
                        InputProps={{
                            inputProps: {
                                maxLength: 7, // Limitar a 7 caracteres (3 letras + guión + 3 números)
                                style: { textTransform: "uppercase" } // Convertir a mayúsculas
                            }
                        }}
                    />
                )}
            />

            <Controller
                name="confirmacion_placa"
                control={control}
                rules={{
                    required: "La confirmacion de placa es obligatoria",
                    validate: {
                        matchesPlaca: validatePlacasMatch
                    }
                }}
                render={({ field: { onChange, ...rest } }) => (
                    <TextField
                        {...rest}
                        onChange={(e) => {
                            const formatted = formatPlaca(e.target.value);
                            onChange(formatted);
                        }}
                        label="Confirmación de Placa"
                        margin="normal"
                        sx={{ width: "36%", marginLeft: "2%" }}
                        error={!!errors.confirmacion_placa}
                        helperText={errors.confirmacion_placa?.message}
                        InputProps={{
                            inputProps: {
                                maxLength: 7, // Limitar a 7 caracteres (3 letras + guión + 3 números)
                                style: { textTransform: "uppercase" } // Convertir a mayúsculas
                            }
                        }}
                    />
                )}
            />

            <Controller
                name="modelo"
                control={control}
                rules={{ required: "Seleccione un modelo" }}
                render={({ field }) => (
                    <FormControl sx={{ width: "24%", ml: "2%" }} margin="normal" error={!!errors.modelo}>
                        <InputLabel>Modelo</InputLabel>
                        <Select
                            {...field}
                            label="Modelo"
                        >
                            {modelos.map((modelo) => (
                                <MenuItem key={modelo.value} value={modelo.value}>
                                    {modelo.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.modelo && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.modelo.message}
                            </Alert>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="tipo_vehiculo"
                control={control}
                rules={{ required: "Seleccione el tipo de vehiculo" }}
                render={({ field }) => (
                    <FormControl sx={{ width: "49%" }} padding="10" margin="normal" error={!!errors.tipo_vehiculo}>
                        <InputLabel>Tipo de vehiculo</InputLabel>
                        <Select
                            {...field}
                            label="Tipo de vehiculo"
                        >
                            {tipos_vehiculo.map((tipo_vehiculo) => (
                                <MenuItem key={tipo_vehiculo.value} value={tipo_vehiculo.value}>
                                    {tipo_vehiculo.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.tipo_vehiculo && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.tipo_vehiculo.message}
                            </Alert>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="servicio"
                control={control}
                rules={{ required: "Seleccione un servicio" }}
                render={({ field }) => (
                    <FormControl sx={{ width: "49%", ml: "2%" }} margin="normal" error={!!errors.servicio}>
                        <InputLabel>Servicio</InputLabel>
                        <Select
                            {...field}
                            label="servicio"
                        >
                            {servicios.map((servicio) => (
                                <MenuItem key={servicio.value} value={servicio.value}>
                                    {servicio.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.servicio && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {errors.servicio.message}
                            </Alert>
                        )}
                    </FormControl>
                )}
            />

            {/* Radio Grupo (Tipo de Pago) */}
            <InputLabel sx={{ my: "5%" }}>Forma de pago</InputLabel>
            <Controller
                name="tipoPago"
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field} sx={{ mt: 2, display: "inline" }}>
                        <FormControlLabel value="contado" control={<Radio />} label="Contado" />
                        <FormControlLabel value="tio-paco" control={<Radio />} label="Tío Paco" />
                    </RadioGroup>
                )}
            />

            {errors.root && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.root.message}
                </Alert>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, background: "red" }}
            >
                Continuar
            </Button>
            </Box>
        </Box>
    );
}