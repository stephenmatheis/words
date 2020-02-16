/** (C) Stephen Matheis 2019 */

/* Components */
import Component from '../Actions/Component.js'

export default function Component_Card(param) {
    const {
        adjacentElement
    } = param;

    const id = app.setComponentId();
    
    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='card'>
                <!-- <div class='card-title'>
                    <div class='card-title-name'>${param.name}</div>
                </div> -->
            </div>
        `,
        style: /*css*/ `
            .card {
                display: flex;
                flex-direction: column;
                background: white;
                width: 100%;
                min-height: 100px;
                margin-bottom: 50px;
                border-radius: 4px;
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
            }

            .card-title {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                font-weight: 500;
                padding: 10px;
                border-radius: 4px 4px 0px 0px;
                background: ${app.primaryColor};
            }
            
            .card-title-name {
                font-size: 1.5em;
                color: ${app.secondaryColor};
            }
        `,
        adjacentElement: adjacentElement,
        position: param.position || 'beforeend',
        events: [
            
        ]
    });
}