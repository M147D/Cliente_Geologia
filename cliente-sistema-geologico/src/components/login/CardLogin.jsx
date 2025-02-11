import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import ButtonAuthenticationGmail from "./ButtonAuthenticationGmail.jsx";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Stack,
  Divider
} from "@mui/material";
import {
  Email as EmailIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from "@mui/icons-material";

// Esquema de validación con Yup
const schema = yup.object({
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
}).required();

const CardLogin = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onLoginSuccess();
  };

  return (
    <Card sx={{ maxWidth: 400, width: "100%", mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" align="center">Login</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} endIcon={<LoginIcon />}>
            Login
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography color="textSecondary" variant="body2">O</Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ButtonAuthenticationGmail />
          </Box>

          <Stack spacing={1} direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography color="primary">Registrar</Typography>
            </Link>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Typography color="primary">Olvidé mi contraseña</Typography>
            </Link>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardLogin;