import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink} from 'react-router-dom' 

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"


const formData = {
    email:'',
    password: ''
}



export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth ) 
    //* el satatus depende de una funcion asincrona por eso la memorizamos para optimizar

    
    const dispatch = useDispatch() 

    const { email, onInputChange, password} = useForm(formData);

    const isAutheticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (event) =>{
        event.preventDefault()


        dispatch( startLoginWithEmailPassword({ email, password }) );
        
    }

    const onGoogleSingIn = () =>{
        dispatch( startGoogleSingIn() )
        console.log('onGoogleSingIn');
    }

    return (
        <AuthLayout title="Login">

            <form onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
                >
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt:2 }}>
                        <TextField 
                            label="Correo" 
                            type="email" 
                            placeholder="correo@google.com"
                            autoComplete="username"
                            fullWidth
                            value={ email }
                            name="email"
                            onChange={ onInputChange }
                            />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt:2 }}>
                        <TextField 
                            label="Password" 
                            type="password" 
                            placeholder="password"
                            autoComplete="current-password"
                            fullWidth
                            value={ password }
                            name="password"
                            onChange={ onInputChange }
                            />
                    </Grid>

                    <Grid container 
                        // eslint-disable-next-line no-extra-boolean-cast
                        display={ !!errorMessage ? '' : 'none' }
                        sx={{ mt:1 }}
                        >
                        <Grid 
                            item 
                            xs={ 12 }
                            >
                            <Alert severity="error">  
                                    {errorMessage}
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container spacing={ 2 } sx={{ mt: 1, mb: 1 }} >

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                type="submit" 
                                variant="contained"
                                 fullWidth
                                 disabled= { isAutheticating }
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                onClick={ onGoogleSingIn }
                                variant="contained" 
                                fullWidth
                                disabled= { isAutheticating }
                            >
                                <Google/>
                                <Typography sx={{ ml:1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent= 'end'>
                        <Link  component={ RouterLink } color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>
     
    </AuthLayout>
    )
}

//? Porque se agregan 2 llaves al sx
//* Porque dentro de sx tenemos que definir un objeto con donde definimos el css que queremos aplicar un 
//* componente en especifico, ademas tenemos acceso a otras propiedades que crearon los desarrollores de MUI.
