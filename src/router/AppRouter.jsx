import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthRouter, AuthRoutes } from "../auth/routes";
import { JournalRouter } from "../journal/routes/JournalRouter";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

import { CheckingAuth } from "../ui/components/CheckingAuth";

import { useCheckAuth } from "../hooks/useCheckAuth";



const routerAuthenticated =  createBrowserRouter ([
  
    {
      path:"/" ,
      element: <JournalRouter/> ,
      children: JournalRoutes
    },
 
 
  ]);

const routerNotAuthenticated =  createBrowserRouter ([
 
    {
      path: "/auth/*",
      element: <AuthRouter /> ,
      children: AuthRoutes
    },
    {
      path: "/*",
      element: <Navigate to="/auth/login" replace /> ,
    }

  ]);

// const routerDefault =  createBrowserRouter ([
//     {
//       path: "/auth/login",
//       element: <Navigate to='/auth/login' /> ,
      
//     }
 
//   ]);


  export const AppRouter = () =>{

    const { status } = useCheckAuth();
    if ( status === 'checking') {
      return <CheckingAuth/>;// se muestra mientras se resuelve el async del useEfect
    }
    
    return (
      <>
      {
        (status === 'authenticated')
        ? <RouterProvider router={ routerAuthenticated }/>
        : <RouterProvider router={ routerNotAuthenticated }/>
        
      }
        {/* <RouterProvider router={ routerDefault }/> */}
      </>
    );
  };