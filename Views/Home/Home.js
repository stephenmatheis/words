/* (C) 2019 Stephen Matheis */

import Component_Card from '../../Components/Card.js';

export default function View_Home(param) {
    const card = Component_Card({
        title: 'Stephen Matheis',
        innerContent: /*html*/ `
            <p>Software Developer</p>
            <p>San Antonio, TX</p>
            <p>Washington, D.C</p>
            <p>(912) 492-2522</p>
            <p>stephen.a.matheis@gmail.com</p>
        `,
        adjacentElement: app.store.getMainContainer()
    });

    card.add();
}