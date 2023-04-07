import {} from 'react';
import Router from 'next/router';
import styles from './heading.module.scss';

export default function Heading({ children }) {
    return (
        <div className={styles['heading']}>
            {/* <button onClick={() => Router.back()}>〈</button> */}
            <button onClick={() => Router.back()}>〈 Back</button>
            <span>{children}</span>
        </div>
    );
}
