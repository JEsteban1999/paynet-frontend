import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Box,
    Button,
    Alert,
    Typography,
    Divider,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

export default function Step2Form({ onNext, onBack, initialData }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // Efecto para cargar los datos iniciales
    useEffect(() => {
        const defaultValues = {
            tipoDocumento: initialData?.tipoDocumento || "",
            numeroDocumento: initialData?.numeroDocumento || "",
            nombre: initialData?.nombre || "",
            apellido: initialData?.apellido || "",
            direccion: initialData?.direccion || "",
            telefono: initialData?.telefono || "",
            correo: initialData?.correo || "",
        };

        reset(defaultValues);

        // Debug: Verificar datos recibidos
        console.log("Datos iniciales cargados en Step2Form:", defaultValues);
    }, [initialData, reset]);

    const onSubmit = (data) => {
        console.log("Datos del cliente:", data);
        onNext(data);
    };

    // Datos de liquidación (simulados)
    const liquidacionData = [
        { label: "ANSV", value: "$ 7.000" },
        { label: "Recaudo", value: "$ 13.904" },
        { label: "SICOV", value: "$ 63.434" },
        { label: "RUNT", value: "$ 23.124" },
        { label: "Valor servicio", value: "$ 253.914" },
        { label: "IVA Servicio", value: "$ 33.112" },
        { label: "Total", value: "$ 956.904", bold: true },
    ];

    const tiposDocumento = [
        { value: "0", label: "Seleccione un tipo de documento" },
        { value: "cc", label: "Cédula de Ciudadanía" },
        { value: "nit", label: "NIT" },
        { value: "ti", label: "Tarjeta de Identidad" },
        { value: "ce", label: "Cédula de Extranjería" },
    ]

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Información del cliente
                    </Typography>

                    {/* Debug: Mostrar datos recibidos */}
                    {initialData && (
                        <Alert severity="info" sx={{ mb: 2, width: "80%" }}>
                            Datos cargados automáticamente para la placa
                        </Alert>
                    )}

                    <Grid container spacing={2}>
                        {/* Tipo de Documento */}
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="tipoDocumento"
                                control={control}
                                rules={{ required: "Campo obligatorio" }}
                                render={({ field }) => (
                                    <FormControl sx={{ width: "100%" }} margin="normal" error={!!errors.tipoDocumento}>
                                        <InputLabel>Tipo Documento</InputLabel>
                                        <Select
                                            {...field}
                                            label="Tipo Documento"
                                            value={field.value || ""} // Asegurarse de que el valor sea una cadena vacía si no hay valor
                                        >
                                            {tiposDocumento.map((tipoDocumento) => (
                                                <MenuItem key={tipoDocumento.value} value={tipoDocumento.value}>
                                                    {tipoDocumento.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.tipoDocumento && (
                                            <Alert severity="error" sx={{ mt: 1 }}>
                                                {errors.tipoDocumento.message}
                                            </Alert>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        {/* Número de Documento */}
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="numeroDocumento"
                                control={control}
                                rules={{
                                    required: "Campo obligatorio",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Solo números permitidos"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Número de documento"
                                        fullWidth
                                        error={!!errors.numeroDocumento}
                                        helperText={errors.numeroDocumento?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Nombre y Apellido */}
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="nombre"
                                control={control}
                                rules={{ required: "Campo obligatorio" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nombre"
                                        fullWidth
                                        error={!!errors.nombre}
                                        helperText={errors.nombre?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="apellido"
                                control={control}
                                rules={{ required: "Campo obligatorio" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Apellido"
                                        fullWidth
                                        error={!!errors.apellido}
                                        helperText={errors.apellido?.message}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Dirección */}
                        <Grid item xs={12} sx={{ width: "90%" }}>
                            <Controller
                                name="direccion"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Dirección" fullWidth />
                                )}
                            />
                        </Grid>

                        {/* Teléfono y Correo */}
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="telefono"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Solo números permitidos"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Teléfono"
                                        fullWidth
                                        error={!!errors.telefono}
                                        helperText={errors.telefono?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ width: "90%" }}>
                            <Controller
                                name="correo"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo inválido"
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Correo electrónico"
                                        fullWidth
                                        error={!!errors.correo}
                                        helperText={errors.correo?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    {/* Sección de Liquidación */}
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                        Valor de liquidación
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {liquidacionData.map((item) => (
                        <Box
                            key={item.label}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                                fontWeight: item.bold ? "bold" : "normal",
                                width: "250px"
                            }}
                        >
                            <Typography>{item.label}</Typography>
                            <Typography>{item.value}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Botones */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button onClick={onBack} variant="outlined">
                    Volver
                </Button>
                <Button type="submit" variant="contained" sx={{ background: "red"}}>
                    Continuar
                </Button>
            </Box>
        </Box>
    );
}