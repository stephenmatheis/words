/* (C) 2019 Stephen Matheis */

import Component_Card from '../../Components/Card.js';

export default function View_About(param) {
    const card = Component_Card({
        title: 'About',
        innerContent: /*html*/ ``,
        adjacentElement: app.store.getMainContainer()
    });

    card.add();
}