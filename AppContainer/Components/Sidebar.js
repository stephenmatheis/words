/** (C) Stephen Matheis 2019 */

import Component from '../../Actions/Component.js'
import Router from '../../Actions/Router.js'

export default function Component_SideBar(param) {
    const {
        route,
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class="sidebar">
                <!--<span class="nav ${(route === "") ? "nav-selected" : ""}" id="Home">
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-home"></use></svg>
                </span>-->
                <!-- Projects -->
                <span class="nav ${(route === "Projects") ? "nav-selected" : ""}" id="Projects">
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-terminal"></use></svg>
                </span>
                <!-- About -->
                <span class="nav ${(route === "About") ? "nav-selected" : ""}" id="About">
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-barcode"></use></svg>
                </span>
                <div class="settings-container">
                    <span class="nav ${(route === "Settings") ? "nav-selected" : ""}" id="Settings">
                        <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-cog "></use></svg>
                    </span>
                </div>
            </div>
        `,
        style: /*css*/ `
            .sidebar {
                display: inline-flex;
                flex-direction: column;
                justify-content: flex-start;
                background: ${app.primaryColor};
            }

            /* Nav Container */
            .nav-container {
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
            }

            .sidebar .nav {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5em;
                font-weight: 400;
                padding: 15px;
                margin: 5px;
                border-right: solid 3px ${app.primaryColor};
                border-radius: 4px 0px 0px 4px;
            }

            .sidebar .nav-selected {
                border-right: solid 3px ${app.secondaryColor};
            }

            /* Settings */
            .settings-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: flex-end;
            }
        `,
        adjacentElement:adjacentElement,
        position: 'beforeend',
        register: false,
        events: [
            {
                selector: '.nav',
                event: 'click',
                listener: routeToView
            },
            {
                selector: '.sidebar-route',
                event: 'click',
                listener: routeToView
            }
        ]
    });

    function routeToView() {
        removeSelectNav();

        this.classList.add('nav-selected');

        const newRoute = (this.id === 'Home') ? '' : this.id;

        Router(newRoute);
    }

    function removeSelectNav() {
        document.querySelectorAll('.nav').forEach((nav) => {
            nav.classList.remove('nav-selected');
        });
    }
}
