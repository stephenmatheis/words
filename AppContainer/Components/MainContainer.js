/** (C) Stephen Matheis 2019 */

import Component from '../../Actions/Component.js'

export default function Component_MainContainer(param) {
    const {
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='main-container'></div>
        `,
        style: /*css*/ `
            .main-container {
                padding: 20px 50px;
                flex: 1;
                height: 100vh;
                overflow: overlay;
            }
        `,
        adjacentElement: adjacentElement,
        position: 'beforeend',
        register: false,
        events: []
    });
}