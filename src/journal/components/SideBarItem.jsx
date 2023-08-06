import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = []  }) => {

    const dispatch = useDispatch();

    const onClickNote = () =>{
         dispatch( setActiveNote({ title, body, id, date,imageUrls }) );
    };

    const newTitle = useMemo( () =>{
        return title.length > 20
            ? title.substring(0,18) + '...'
            : title;
    },[ title ]);

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon
            >
                <TurnedInNot/>
            </ListItemIcon>

            <Grid container>
                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ body }/>

            </Grid>
        </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes ={
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    imageUrls: PropTypes.array,
};