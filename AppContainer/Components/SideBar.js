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
                <div class="nav-container">
                    <span class="sidebar-route ${(route === "") ? "sidebar-selected" : ""} home" id="Home">
                        <svg class="icon"><use href="../../Icons/symbol-defs.svg#icon-home"></use></svg>
                    </span>
                </div>
                <!-- Projects -->
                <span class="nav ${(route === "Projects") ? "nav-selected" : ""}" id="Projects">
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-terminal"></use></svg>
                </span>
                <!-- About -->
                <span class="nav ${(route === "About") ? "nav-selected" : ""}" id="About">
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-barcode"></use></svg>
                </span>
                <div class="settings-container">
                    <span class="sidebar-route ${(route === "Settings") ? "sidebar-selected" : ""} settings" id="Settings">
                        <svg class="icon"><use href="../../Icons/symbol-defs.svg#icon-cog"></use></svg>
                    </span>
                </div>
            </div>
        `,
        style: /*css*/ `
            .sidebar {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                height: 100vh;
                background: ${app.primaryColor};
                box-shadow: inset 0px 0px 6px 0 rgba(32, 33, 36, .28);
            }

            /* Nav Container */
            .nav-container {
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
            }

            .sidebar .nav,
            .sidebar-route {
                cursor: pointer;
                text-align: left;
                font-size: 1.5em;
                font-weight: 400;
            }

            .home {
                margin: 10px 5px;
                padding: 10px 15px;
                border-radius: 12px;
                box-shadow: -5px 3px 15px 0 rgba(0, 0, 0, .3);
            }

            .sidebar .sidebar-selected {
                margin: 10px 5px;
                padding: 10px 15px;
                border-radius: 12px;
                box-shadow: 
                    inset 2px 2px 15px 0 rgb(0, 0, 0, .3),  /* Dark */
                    inset 0px 0px 26px 0 rgb(255, 255, 255, 0.2) /* Light */
            }

            .sidebar .nav,
            .settings {
                padding: 20px;
                color: ${app.secondaryColor};
            }

            .sidebar .nav-selected {
                background: ${app.secondaryColor};
                box-shadow: -12px 0px 6px 0 rgba(0, 0, 0, .3);
                border-radius: 4px 0px 0px 4px;
                transform: translateX(6px);
            }

            .sidebar .nav-selected .icon {
                fill: ${app.primaryColor};
                stroke: ${app.primaryColor};
                background: ${app.secondaryColor};
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
        position: 'afterbegin',
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

        if (this.classList.contains('nav')) {
            this.classList.add('nav-selected');
        } else if (this.classList.contains('sidebar-route')) {
            this.classList.add('sidebar-selected');
        }

        const newRoute = (this.id === 'Home') ? '' : this.id;

        Router(newRoute);
    }

    function removeSelectNav() {
        document.querySelectorAll('.sidebar-route').forEach((button) => {
            button.classList.remove('sidebar-selected');
        });
        
        document.querySelectorAll('.nav').forEach((nav) => {
            nav.classList.remove('nav-selected');
        });
    }
}
