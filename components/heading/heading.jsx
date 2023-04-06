import {} from 'react';
import Router from 'next/router';
import styles from './heading.module.scss';

export default function Heading({ children }) {
    return (
        <h1 className={styles['heading']}>
            <button onClick={() => Router.back()}>〈</button>
            <span>{children}</span>
        </h1>
    );
}
