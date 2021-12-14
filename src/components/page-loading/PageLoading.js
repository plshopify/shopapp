import React from 'react';
import classes from './PageLoading.module.scss';

const PageLoading = () => {
    return (
        <div className={classes.loading}>
            <span>T</span>
            <span>H</span>
            <span>E</span>
            <span>M</span>
            <span>E</span>
        </div>
    );
};

export default PageLoading;
