/* (C) 2019 Stephen Matheis */

import Component from '../Actions/Component.js'

export default function Component_Heading(param) {
    const {
        adjacentElement,
        text,
    } = param;

    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id=${componentId} class="heading">
                <div>${text}</div>
            </div>
        `,
        style: /*css*/ `
            .heading {
                padding: 10px;
                border-radius: 4px 4px 0px 0px;
            }

            .heading > div {
                font-size: 1.2em;
                text-align: left;
                font-weight: 500;
                color: ${app.primaryColor};
            }

            .heading-center {
                text-align: center;
            }
        `,
        adjacentElement: adjacentElement,
        position: 'beforeend',
        events: [
            
        ]
    });
}