import { useRef } from 'react';
import Link from 'next/link';
import styles from '@/styles/words.module.scss';
import classNames from 'classnames';

const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];
const shapes = ['■', '◼', '▪', '▫', '●', '◦', '▴', '▵', '◆', '◇', '◇'];
const basic = ['⏹', '□', '●', '◯', '▲', '△', '◆', '◇', '+', '✕', '*', '=', '-'];
const binary = [0, 1];
const links = ['Stephen Matheis', 'Blog', 'Resume', 'Projects'];
const columns = 20;
const rows = 20;
const min = 0;
const max = 25;
const shape = '◦';
// const shape = '0';

export async function getServerSideProps(context) {
    return {
        props: {
            cells: Array.from(
                { length: columns * rows },
                // () => setChar(letters),
                // () => setChar(basic),
                // () => setChar(shapes),
                // () => setChar(binary)
                () => shape,
                // () => '■',
                // () => '◼',
                // () => '▪',
                // () => '▫',
                // () => '●',
                // () => '▴',
                // () => '▵',
                // () => '◆',
                // () => '◇',
                // () => '◇',
            ),
            // cells: randomUnicodeArray(columns * rows)
        },
    };
}

export default function Words({ cells }) {
    const ref = useRef();

    return (
        <div ref={ref} id={styles['words']}>
            {cells.map((letter, index) => {
                for (let i = 1; i < links.length; i++) {
                    let row = i * 2 - 1;

                    console.log(row);

                    if (isRow({ columns, row, index, word: links[i], align: 'right' })) {
                        console.log(index);
                        return (
                            <Letter
                                key={index}
                                columns={columns}
                                row={row}
                                index={index}
                                word={links[i]}
                                align="right"
                            />
                        );
                    }
                }

                // Last row
                if (isRow({ columns, row: rows - 1, index, word: links[0], align: 'left' })) {
                    return (
                        <Letter key={index} columns={columns} row={rows - 1} index={index} word={links[0]} />
                    );
                }

                // Normal Cell
                return (
                    <div key={index} className={classNames(styles['cell'])}>
                        {letter}
                    </div>
                );
            })}
        </div>
    );
}

function isRow({ columns, row, index, word, align }) {
    if (align === 'right') {
        if (index > columns * (row - 1) + (columns - 1) - word.length && index <= columns * (row - 1) + (columns - 1)) {
            return true;
        } else {
            return false;
        }
    }

    if (align === 'left') {
        if (index >= columns * row && index < columns * row + word.length) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

function Letter({ columns, row, index, word, align, href }) {
    let char =
        align === 'right'
            ? word[index - (columns * (row - 1) + (columns - 1)) + (word.length - 1)].toUpperCase()
            : word[index - columns * (row)].toUpperCase();

    if (char === ' ') {
        return (
            <div key={index} className={classNames(styles['cell'])}>
                {shape}
            </div>
        );
    }

    return (
        <Link key={index} className={classNames(styles['cell'], styles['link'])} href={href || `/${word.toLowerCase()}`}>
            {char}
        </Link>
    );
}

function setChar(set) {
    return set[getRandomIntInclusive(0, set.length - 1)];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function randomUnicodeArray(length) {
    return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 65536)));
}
