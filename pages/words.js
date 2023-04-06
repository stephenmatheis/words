import { useRef } from "react";
import Link from "next/link";
import styles from "@/styles/words.module.scss";
import classNames from "classnames";

const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const shapes = ["■", "◼", "▪", "▫", "●", "◦", "▴", "▵", "◆", "◇", "◇"];
const basic = ["⏹", "□", "●", "◯", "▲", "△", "◆", "◇", "+", "✕", "*", "=", "-"];
const links = ["Stephen Matheis", "About", "Blog", "Resume", "Contact"];
const columns = 20;
const rows = 20;
const min = 0;
const max = 25;
const shape = "◦";

export async function getServerSideProps(context) {
    return {
        props: {
            cells: Array.from(
                { length: columns * rows },
                // () => letters[getRandomIntInclusive(0, letters.length - 1)]
                // () => basic[getRandomIntInclusive(0, basic.length - 1)]
                // () => shapes[getRandomIntInclusive(0, shapes.length - 1)]
                // () => '■'
                // () => '◼'
                // () => '▪'
                // () => '▫'
                // () => '●'
                () => shape
                // () => '▴'
                // () => '▵'
                // () => '◆'
                // () => '◇'
                // () => '◇'
            ),
            // cells: randomUnicodeArray(columns * rows)
        },
    };
}

export default function Words({ cells }) {
    const ref = useRef();

    return (
        <div ref={ref} id={styles["words"]}>
            {cells.map((letter, index) => {
                // console.log(index, isRow(columns, 2, index, 1));
                // console.log(index, isRow(columns, 4, index, 2));
                // console.log(index, isRow(columns, 6, index, 3));

                // Second Row
                // const row = 2;

                // if (
                //     index > ((columns * row) + (columns - 1)) - links[1].length &&
                //     index <= (columns * row) + (columns - 1)
                // ) {
                //     // console.log(
                //     //     index,
                //     //     letter,
                //     //     (columns * row) + (columns - 1),
                //     //     index - ((columns * row) + (columns - 1)) + (links[1].length - 1),
                //     //     links[1][index - ((columns * row) + (columns - 1)) + (links[1].length - 1)]
                //     // );

                //     return (
                //         <Link
                //             key={index}
                //             className={classNames(styles['cell'], styles['link'])}
                //             href='/'
                //         >
                //             {links[1][index - ((columns * row) + (columns - 1)) + (links[1].length - 1)].toUpperCase()}
                //         </Link>
                //     );
                // }
                if (isRow({ columns, row: 2, index, word: links[1], align: "right" })) {
                    return <Letter key={index} columns={columns} row={2} index={index} word={links[1]} />;
                }

                // Fourth Row
                if (isRow(columns, 4, index, links[2])) {
                    return <Letter key={index} columns={columns} row={4} index={index} word={links[2]} />;
                }

                // Sixth Row
                if (isRow(columns, 6, index, links[3])) {
                    return <Letter key={index} columns={columns} row={6} index={index} word={links[3]} />;
                }

                // Last row
                // if (isRow(columns, columns.length, index, links[0])) {
                //     const char = links[0][index - columns * (rows - 1)].toUpperCase();

                //     return (
                //         <Link
                //             key={index}
                //             className={classNames(styles['cell'], {
                //                 [styles['link']]: char != ' '
                //             })}
                //             href='/'
                //         >
                //             {char}
                //         </Link>
                //     );
                // }

                // Last row
                if (index >= columns * (rows - 1) && index < columns * (rows - 1) + links[0].length) {
                    const char = links[0][index - columns * (rows - 1)].toUpperCase();

                    if (char === " ") {
                        return (
                            <div key={index} className={classNames(styles["cell"])}>
                                {letter}
                            </div>
                        );
                    }

                    return (
                        <Link key={index} className={classNames(styles["cell"], styles["link"])} href="/">
                            {char}
                        </Link>
                    );
                }

                // Normal Cell
                return (
                    <div key={index} className={classNames(styles["cell"])}>
                        {letter}
                    </div>
                );
            })}
        </div>
    );
}

function isRow(columns, row, index, word) {
    if (index > columns * row + (columns - 1) - word.length && index <= columns * row + (columns - 1)) {
        return true;
    } else {
        false;
    }
}

function Letter({ columns, row, index, word }) {
    return (
        <Link key={index} className={classNames(styles["cell"], styles["link"])} href={`/${word.toLowerCase()}`}>
            {word[index - (columns * row + (columns - 1)) + (word.length - 1)].toUpperCase()}
        </Link>
    );
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function randomUnicodeArray(length) {
    return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 65536)));
}
