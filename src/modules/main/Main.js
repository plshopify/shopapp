import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { loadUser, logoutUser } from '@store/reducers/auth';
import { toggleSidebarMenu } from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import SubMenu from '@pages/SubMenu';
import Profile from '@pages/profile/Profile';

import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';
import DetailComponent from '@app/pages/DetailComponent';
import '@shopify/polaris/build/esm/styles.css';
import ShopContext from '@app/contexts/ShopContext';

const Main = () => {
    const search = useLocation().search;
    const shop = new URLSearchParams(search).get('shop');
    const type = new URLSearchParams(search).get('type');
    const shopContext = useMemo(() => ({
        shop: shop
    }), []);
    if(type == 'install') {
        window.location.href = `${shop}/admin/apps/my-first-app-639`;
    }
    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const fetchProfile = async () => {
        try {
            const response = await Gatekeeper.getProfile();
            dispatch(loadUser(response));
            setIsAppLoaded(true);
        } catch (error) {
            dispatch(logoutUser());
            setIsAppLoaded(true);
        }
    };

    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');

        fetchProfile();
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarMenuCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarMenuCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }
        return (
            <ShopContext.Provider value={shopContext}>

                <Header toggleMenuSidebar={handleToggleMenuSidebar} />

                <MenuSidebar />

                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route exact path="/sub-menu-2" component={Blank} />
                            <Route
                                exact
                                path="/sub-menu-1"
                                component={SubMenu}
                            />
                            <Route exact path="/blank" component={Blank} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/themedetails/:id" component={DetailComponent} />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => { }}
                />
            </ShopContext.Provider>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
