/* (C) 2019 Stephen Matheis */

/* Actions */
import Component from '../Actions/Component.js'
import Router from '../Actions/Router.js'

export default function Component_NewButton(param) {
    const {
        adjacentElement
    } = param;

    const id = app.setComponentId();
    
    return Component({
        id,
        html: /*html*/ `
            <span id='${id}' class='new-button' >
                <!-- &plus; Add new ${param.newLabel} -->
                ${param.icon}
            </span>
        `,
        style: /*css*/ `
            .new-button {
                cursor: pointer;
                font-size: 1.5em;
            }

            /* Icon plus */
            .new-button .plus {
                stroke: ${app.primaryColor};
                fill: ${app.primaryColor};
            }
        `,
        adjacentElement: adjacentElement, // #TODO: remove hard coded class
        root: param.root,
        position: param.position || 'beforeend',
        events: [
            {
                selector: `#${id}`,
                event: 'click',
                listener: showNewForm
            }
        ]
    });

    function showNewForm(event) {
        Router(`${param.list}/NewForm`);
    }
}