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
            <div id=${componentId} class='message'>
                <div>${text}</div>
            </div>
        `,
        style: /*css*/ `
            .message {
                padding: 10px;
                border-radius: 4px 4px 0px 0px;
            }

            .message > div {
                font-size: 1.2em;
                text-align: center;
                font-weight: 500;
                color: ${app.defaultColor};
            }
        `,
        adjacentElement: adjacentElement,
        position: 'beforeend',
        events: [
            
        ]
    });
}