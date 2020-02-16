/** (C) Stephen Matheis 2019 */

import Component from '../../Actions/Component.js'

export default function Component_AppContainer(param) {
    const {
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='app-container'></div>
        `,
        style: /*css*/ `
            .app-container {
                display: flex;
            }

            *, html {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                box-sizing: border-box;
                color: rgba(0,0,0,0.7);
            }
            
            body {
                padding: 0px;
                margin: 0px;
                box-sizing: border-box;
                background: ${app.secondaryColor};
            }
            
            body::-webkit-scrollbar { 
                display: none; 
            }
            
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
                background: ${app.primaryColor};
                width: 8px;
                height: 8px;
                border: 3px solid transparent;
                border-radius: 8px;
                background-clip: content-box;
            }
            
            table {
                border-collapse: collapse;
            }
            
            /* Stop Chrome autocomplete changing background color */
            input:-webkit-autofill,
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active  {
                box-shadow: 0 0 0 30px white inset !important;
            }
            
            .highlight {
                background: #fff3d4 !important;
                border-right: solid 3px #f6b73c !important;
            }
            
            .smooth-tranisition {
                transition: all 300ms ease-in-out;
            }

            /* SVG Icons */
            .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                stroke-width: 0;
                stroke: ${app.secondaryColor};
                fill: ${app.secondaryColor};
            }
        `,
        adjacentElement: adjacentElement,
        position: 'afterbegin',
        events: []
    });
}
