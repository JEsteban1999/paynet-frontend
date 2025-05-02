import { Height } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

export default function PaymentHeader() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                color: 'black',
                borderBottom: '1px solid #e0e0e0',
                width: '100vw', // Ocupa todo el ancho de la ventana
                marginLeft: 'calc(-50vw + 50%)', // Centrado correctamente
                left: '0',
                right: '0'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="src/assets/logo.png" alt="" style={{ height: '30px', width: 'auto' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '50%' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', justifyContent: 'center' }}>
                            <img src="src/assets/notification.png" alt="" style={{ height: '30px', width: 'auto' }} />
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                Username
                            </Typography>
                            {/* Aquí puedes agregar un avatar/icono si lo deseas */}
                        </Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            <img src="src/assets/user.png" alt="" style={{ height: '30px', width: 'auto' }} />
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
