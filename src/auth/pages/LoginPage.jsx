import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layouts/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();


    dispatch(startLoginWithEmailPassword(email, password));

  }

  const onGoogleSingIn = (event) => {
    event.preventDefault();

    console.log('onGoogleSingIn');

    dispatch(startGoogleSingIn());
  }

  return (

    <AuthLayout title="Login">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='correo'
              type="emial"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            />
          </Grid>

          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}
          >

            <Grid
              item xs={12} sm={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={onGoogleSingIn}
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 2 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction={"row"} justifyContent={"end"}>
            <Link component={RouterLink} color='inherit' to='/auth/register'>Registrarse</Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>




  )
}
