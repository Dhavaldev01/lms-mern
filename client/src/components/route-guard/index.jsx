
import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from 'react'


function RouterGuard({authenticated , user , element}){
    const location = useLocation();
    console.log("RouteGuard :",authenticated,user);

    const userRole = user?.role || 'guest';

    if(!authenticated && !location.pathname.includes('/auth')){
        return <Navigate to='/auth'/>
    }

    if( 
        authenticated && 
        user?.role !== "instructor" && 
        (location.pathname.includes('instructor') || 
        location.pathname.includes('/auth'))
    ) {
        return <Navigate to="/home"/>
    }

    if( 
        authenticated && 
        user?.role === 'instructor' && 
        !location.pathname.includes('instructor')
    ){
        return <Navigate to='/instructor'/>
    }
    return <Fragment>{element}</Fragment>
}

export default RouterGuard;