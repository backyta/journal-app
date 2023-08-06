import { StarBorderOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const NothingSelectedView = () => {
    
    const { menssageDeleted } = useSelector( state => state.journal ); 

    useEffect(() => {
        
        if ( menssageDeleted.length > 0) {
            Swal.fire('Nota Borrada', menssageDeleted, 'error');
        }
        //* no poner return porque seria la funcion de limpieza y no se dispararia hasta que el componente
        //* sea destruido

    }, [menssageDeleted]);
    return (
        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={ 0 }
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight:'calc(100vh - 110px)', backgroundColor:'primary.main', borderRadius: 3}}>

                <Grid item xs={ 12 }>
                    <StarBorderOutlined sx={{ fontSize: 100, color: 'white'}} />
                </Grid>

                <Grid item xs={ 12 }>
                    <Typography color="white" variant="h5">Selecciona o crea una entrada</Typography>
                </Grid>

         </Grid>
    );
};
