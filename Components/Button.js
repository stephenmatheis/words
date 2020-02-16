/* (C) 2019 Stephen Matheis */

/* Actions */
import Component from '../Actions/Component.js'

export default function Component_Button(param) {
    const {
        color,
        disabled,
        icon,
        root,
        adjacentElement,
        position,
        action
    } = param;

    const id = app.setComponentId();

    const component = Component({
        id,
        html: /*html*/ `
            <span id='${id}' class='button ${color || ''} ${disabled ? 'disabled' : ''}' >
                ${icon}
            </span>
        `,
        style: /*css*/ `
            /* Default style */
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 1.5em;
                margin: 0px 20px;
                padding: 10px;
            }

            .button .icon {
                stroke: ${app.primaryColor};
                fill: ${app.primaryColor};
            }

            /* Colors */
            .button.green .icon {
                stroke: mediumseagreen;
                fill: mediumseagreen;
            }

            /* Disabled */
            .button.disabled {
                pointer-events: none;
            }
            
            .button.disabled .icon {
                pointer-events: none;
                stroke: lightgray;
                fill: lightgray;
            }
        `,
        adjacentElement: adjacentElement,
        root: root,
        position: position || 'beforeend',
        events: [
            {
                selector: `#${id}`,
                event: 'click',
                listener: runAction
            }
        ]
    });

    function runAction(event) {
        if (action) {
            action(event);
        }
    }

    component.enable = () => {
        const button = document.querySelector(`#${id}`);

        button.classList.remove('disabled');
    }

    component.disable = () => {
        const button = document.querySelector(`#${id}`);

        button.classList.add('disabled');
    }

    return component;
}