import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { purpleTheme } from './';
import  PropTypes  from 'prop-types';

export const AppTheme = ({ children }) => {
    
    return (
        <ThemeProvider theme={ purpleTheme }>
            <CssBaseline/>
            { children }
        </ThemeProvider>
    );
};
//* basicamente terminara asi
{/* <AppTheme>
    <App>
</AppTheme> */}

AppTheme.propTypes = {
    children: PropTypes.object.isRequired
};