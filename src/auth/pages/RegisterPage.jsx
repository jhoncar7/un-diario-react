import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layouts/AuthLayout"
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formdata = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'La password debe tener mas de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formdata, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (

    <AuthLayout title="Registro">
      <h1>FormValid {isFormValid ? 'true' : 'false'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              label='nombre'
              type="text"
              placeholder="Jon Joe"
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="email"
              value={email}
              onChange={onInputChange}
              label='correo'
              type="emial"
              placeholder="correo@gmail.com"
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="password"
              value={password}
              onChange={onInputChange}
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>Login</Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>




  )
}
