import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layouts/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleSingIn } from "../../store/auth/thunks"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"


export const LoginPage = () => {

  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'jhon@gmail.com',
    password: '123456'
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    console.log({ email, password });

    dispatch(checkingAuthentication(email, password));

  }

  const onGoogleSingIn = (event) => {
    event.preventDefault();

    console.log('onGoogleSingIn');

    dispatch(startGoogleSingIn());
  }

  return (

    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
