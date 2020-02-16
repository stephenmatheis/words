/** (C) Stephen Matheis 2019 */

/* Components */
import Component from '../Actions/Component.js'

export default function Component_HoverForm(param) {
    const {
        adjacentElement,
        position,
        top,
        left,
        data
    } = param;

    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class="hover-form" style="top: ${top}px; left: ${left}px;">
                ${data.Title}
            </div>
        `,
        style: /*css*/ `
            .hover-form {
                position: absolute;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                height: 200px;
                width: 150px;
                background: ${app.primaryColor};
                margin-bottom: 50px;
                border-radius: 4px;
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
                transform: scale(0);
                animation: pop-in 300ms ease-in-out 500ms forwards;
            }

            @keyframes pop-in {
                from {
                    opacity: 0;
                    transform: scale(0);
                }

                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .hover-form-title {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-weight: 500;
                padding: 10px;
                border-radius: 4px 4px 0px 0px;
                background: ${app.primaryColor};
            }
            
            .hover-form-title-name {
                font-size: 1.5em;
                color: ${app.secondaryColor};
            }
        `,
        adjacentElement: adjacentElement,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}