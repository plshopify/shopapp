import React from 'react';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {
    const [t] = useTranslation();

    return (
        <footer className="main-footer">
            <strong>
                <span>Copyright © {DateTime.now().toFormat('y')} </span>
                <a
                    href="https://purelogics.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PL
                </a>
                <span>.</span>
            </strong>
            <div className="float-right d-none d-sm-inline-block">
                <b>{t('footer.version')}</b>
                <span>&nbsp;{version}</span>
            </div>
        </footer>
    );
};

export default Footer;
