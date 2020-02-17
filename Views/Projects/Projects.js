/* (C) 2019 Stephen Matheis */

import Component_Card from '../../Components/Card.js';

export default function View_Projects(param) {
    const card = Component_Card({
        title: 'Projects',
        innerContent: /*html*/ ``,
        adjacentElement: app.store.getMainContainer()
    });

    card.add();
}