import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [formValidation, setFormValidation] = useState({});  //que me diga si hay o no error

    useEffect(() => {
        createValidators();
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState]);

    useEffect(() => {
        setFormState( initialForm );
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialForm]);

    const isFormValid = useMemo( () => {
        
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null) return false; //sale de blucle si hay uno diferente a null
        }
        return true;

    
    },[ formValidation ]);

    //* Se quiere memorizar el este valor, poruqe puede ser que se trbaje con cambiar algo que no debe afectar
    //* el valor de isFromValid, eeste vaor solo debe volver a procesar si cambia el formState

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    };

    const onResetForm = () => {
        setFormState( initialForm );
    };

    const createValidators = () =>{

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) { //barre el formValidation
            // console.log( formField);

            const [ fn, errorMessage ] = formValidations[formField]; // se obtiene mensaje y la funcion

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

        }
        // console.log(formCheckedValues);
        setFormValidation( formCheckedValues );
        
    };
   
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    };
};

//* FormValidation sirve para hacer la evalucacion y recibir las validacion que se quiere en el formulario

//? Explicacion del for of con porpiedades computadas

//* creamos una nueva propiedad en el objeto vacio declarado, se va llamar igual al formfield
//* es decir email, displayName o passworValid, es una propiedad computada
//* esta propiedad va ser igual ala funcion que recibe como parametro que saca el aprametro
//* del state que pasamos donde tiene email, password o display compara en un condicion
//* evalua si la propiuedad del estado actual se cumple en su condicion o si es verdadero,
//* arroja null y si no el mensaje de error
//* agarra el estado con la propiedad que recorreo el bucle.
//* finalmente actualiza el estado  de form validation y retorna un nuevo estado.