// import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { CheckingAuth } from "../../ui/components/CheckingAuth";



export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal);
  const dispactch = useDispatch();

  const onClickNewNote= ()=>{
    
    dispactch( startNewNote() );
  };



  return (
    <>
      <JournalLayout>
        {
            ( isSaving ) && <CheckingAuth />
        }
        {
          // eslint-disable-next-line no-extra-boolean-cast
          (!!active) 
            ? <NoteView /> 
            : <NothingSelectedView/>
        }

       <IconButton
         disabled={ isSaving }
         onClick={ onClickNewNote }
         size='large'
         sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
       >
          <AddOutlined sx={{ fontSize: 30}}/>

       </IconButton>


      </JournalLayout>
    </>
  );
};

//* Es un conteneodr predecible del estado de nuestra app, quiere decir, una forma de ocntrolar donde se 
//* encuentra la informacion de mi ap en todo momento y tmb ayuda  aque la modificacion de la informacion
//* siempre sea en una sola via de manera predecible con el objetivo de prevenir cambios accidentales en la misma
