import { AuthLayout } from "../layout/AuthLayout"
import { Alert, Button, Grid, Link, TextField, Typography} from "@mui/material"
import { Link as RouterLink} from 'react-router-dom' 
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { startCreatingUserWithEmailPassword } from "../../store";

const formData = {
    email:'',
    password:'',
    displayName: ''
}

//* Implementacion personalizada, para hacer la validacion del formularios , se crea un objeto con
//* los mismos nombres de los compos que quiero validar, en cada llavda llave se tiene como valor,
//* un array, el primer valor es la funcion de validacion y el segundo el mensaje de error, si una
//* de estas funciones no se cumple el formulario no es valido.

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
} 

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmited, setFormSubmited] = useState(false)

    const { status, errorMessage } = useSelector( state => state.auth);
    const isCheckingAuthentication = useMemo( () => status === 'checking',[ status ] );


    const { displayName, email, onInputChange, password, formState,  /* formValidation */ 
            isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );
    //*expone formValidation por lo que tiene adentro

    // console.log( displayNameValid, emailValid, passwordValid );
    // console.log({formValidation});

    const onSubmit = ( event ) =>{
        event.preventDefault()
        setFormSubmited(true)

        if ( !isFormValid ) return // si es false termian la isntruccion del click y no ejecuta el dispatch

       dispatch( startCreatingUserWithEmailPassword(formState) )
    }


    return (
        <AuthLayout title="Register">

            <h1>FormValid { isFormValid ? 'Valido' : 'Incorrecto' }</h1>

        <form onSubmit={ onSubmit }
            className="animate__animated animate__fadeIn animate__faster"
            >
            <Grid container>

                <Grid item xs={ 12 } sx={{ mt:2 }}>
                    <TextField 
                        label="Nombre Completo" 
                        type="text" 
                        placeholder="Nombre Completo"
                        autoComplete="username"
                        fullWidth
                        name="displayName"
                        value={ displayName }
                        onChange={ onInputChange }
                        error={ !!displayNameValid && formSubmited} // propio de MUI con valor bollean para error de field
                        helperText= { (formSubmited ) && displayNameValid }
                        //* si el displayName es string con el !! se convierte en true si es null se convierte
                        //* en false esto permite que no pinte de rojo la caja
                        />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt:2 }}>
                    <TextField 
                        label="Correo" 
                        type="email" 
                        placeholder="correo@google.com"
                        autoComplete="username"
                        fullWidth
                        name="email"
                        value={ email }
                        onChange={ onInputChange }
                        error={ !!emailValid && formSubmited} // propio de MUI con valor bollean para error de field
                        helperText= { (formSubmited ) && emailValid }
                        />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt:2 }}>
                    <TextField 
                        label="Password" 
                        type="password" 
                        placeholder="password"
                        autoComplete="current-password"
                        fullWidth
                        name="password"
                        value={ password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmited} // propio de MUI con valor bollean para error de field
                        helperText= { (formSubmited ) && passwordValid }
                        />
                </Grid>

                <Grid container spacing={ 2 } sx={{ mt: 1, mb: 1 }} >

                    <Grid 
                        item 
                        xs={ 12 }
                        // eslint-disable-next-line no-extra-boolean-cast
                        display={ !!errorMessage ? '' : 'none' }
                        >
                       <Alert severity="error">  
                            {errorMessage}
                       </Alert>
                    </Grid>


                    <Grid item xs={ 12 }>
                        <Button disabled= { isCheckingAuthentication } type="submit" variant="contained" fullWidth>
                            Crear Cuenta
                        </Button>
                    </Grid>

                </Grid>

                <Grid container direction='row' justifyContent= 'end'>
                    <Typography sx={{ mr:1, fontSize:15 }}>¿Ya tienes cuenta?</Typography>
                    <Link  component={ RouterLink } color='inherit' to='/auth/login'>
                        Inicia Sesion
                    </Link>
                </Grid>

            </Grid>
        </form>
 
    </AuthLayout>
)
}
