import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const RootLayout = () => {

    const location = useLocation()

    const showSidebar = location.pathname !== '/'
    return (
        <>
            {showSidebar && <Sidebar />}
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;