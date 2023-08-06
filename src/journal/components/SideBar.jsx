import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {
    
    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

    return (
        <Box
            component='nav'
            sx={{ width:{ sm: drawerWidth }, flexShrink: { sm:0 } }}
        >
            <Drawer
                variant='permanent' //o temporaly
                open //true por defecto
                sx={{ 
                    display:{ xs:'block' },
                    '& .MuiDrawer-paper':{ boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider/>

                <List>
                    { notes.map( note =>(
                        <SideBarItem key={ note.id }{ ...note }/> // se pasa como parametro toda la nota esparcida
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};

SideBar.propTypes = {
    drawerWidth: PropTypes.number.isRequired
};