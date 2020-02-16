/* (C) 2019 Stephen Matheis */

/* Global Actions */
import Component from '../Actions/Component.js'

export default function Component_Toolbar(param) {
    const {
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='table-toolbar'></div>
        `,
        style: /*css*/ `
            .table-toolbar {
                display: inline-flex;
                flex-direction: row;
                justify-content: flex-end;
                border-radius: 4px;
                /* padding: 10px; */
                margin: 20px 0px;
                background: white;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            }
        `,
        adjacentElement: adjacentElement,
        position: param.position || 'beforeend',
        events: [
            
        ]
    });
}