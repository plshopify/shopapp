import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';

export const MENU = [
    {
        name: 'Themes',
        path: '/'
    },
    // {
    //     name: 'menusidebar.label.blank',
    //     path: '/blank'
    // },
    {
        name: 'Categories',
        children: [
            {
                name: 'Christmas',
                path: '/themedetails/1'
            },

            {
                name: 'Eid',
                path: '/themedetails/2'
            },
            {
                name: 'Haloween',
                path: '/themedetails/3'
            }
        ]
    },
    {
        name: 'About',
        path: '#'
    },
    {
        name: 'Privacy Policy',
        path: '#'
    },
    {
        name: 'Terms of Service',
        path: '#'
    },
    {
        name: 'Contact Us',
        path: '#'
    },
];

const MenuSidebar = () => {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={user.picture || '/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {user.email}
                        </Link>
                    </div>
                </div>
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                    >
                        {MENU.map((menuItem) => (
                            <MenuItem key={menuItem.name} menuItem={menuItem} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
