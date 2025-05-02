
# Proyecto Sistema de Vehículos y Propietarios

## 📌 Descripción del Proyecto

Aplicación de formulario multi-paso para el pago de servicios vehiculares, desarrollada con React, Vite y Material-UI.

## Tecnologías utilizadas

* React 18 - Biblioteca principal para la construcción de la interfaz
* Vite - Herramienta de construcción y desarrollo
* Material-UI (MUI) - Componentes UI y sistema de diseño
* React Hook Form - Manejo de formularios y validación
* React Router - Navegación entre vistas (si aplica)
* Axios/Fetch - Para llamadas a API

## 🚀 Características Principales

* Formulario multi-paso con navegación vertical
* Validación de formularios robusta con React Hook Form
* Integración con API para consulta de propietarios de vehículos
* Diseño responsive con Material-UI
* Gestión de estado para datos del formulario
* Pantalla de carga durante operaciones asíncronas
* Manejo de errores con feedback visual al usuario

## Pasos del formulario

1. Datos del Vehículo:
  * Validación del formato de placa
  * Confirmación de placa
  * Selección de modelo, tipo de vehículo y servicio
  * Elección de forma de pago (Contado/Tío Paco)

2. Información del propietario:
  * Datos personales (tipo documento, número, nombre, apellido)
  * Información de contacto (dirección, teléfono, correo)
  * Visualización de liquidación de valores

3. Datos del Vehículo:
  * Selección entre Efectivo, PSE, Corresponsal Bancario o Datáfono
  * Confirmación y generación de comprobante


## ⚙️ Configuración e Instalación

1. Clonar el repositorio:

```bash
  https://github.com/JEsteban1999/paynet-frontend.git
```

2. Instalar dependencias:

```bash
  npm install
```

3. Ejecutar la aplicación:
```bash
  npm run dev
```

## 🌐 API Endpoints

La aplicación consume los siguientes endpoints:

* `GET /api/vehiculos/propietario/{placa}` - Obtiene información del propietario por placa de vehículo

## 🏗️ Estructura del Proyecto

```bash
src/
├── components/
│   ├── PaymentHeader.jsx     # Barra superior de navegación
│   ├── Step1Form.jsx         # Formulario de datos del vehículo
│   ├── Step2Form.jsx         # Formulario de información del cliente
│   └── Step3Form.jsx         # Formulario de método de pago
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada
└── assets/                   # Imágenes y recursos estáticos
```
