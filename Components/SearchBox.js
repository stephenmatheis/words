/* (C) 2019 Stephen Matheis */

/* Global Actions */
import Component from '../Actions/Component.js'

export default function Component_SearchBox(param) {
    const {
        adjacentElement,
        position,
        action
    } = param;

    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='search-box'>
                <svg class="icon">
                    <use href="#icon-search"></use>
                </svg>    
                <input type="text" class="search-field" placeholder="Search Tasks" />
            </div>
        `,
        style: /*css*/ `
            /* Icon */
            .search-box .icon {
                stroke: ${app.primaryColor};
                fill: ${app.primaryColor};
                cursor: pointer;
                font-size: 1.2em;
                margin: 0px 10px;
            }

            .search-box {
                display: inline-flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                padding: 10px;
                margin: 20px 0px;
                background: white;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            }

            .search-field {
                padding: 4px;
                width: 250px;
                border-radius: 4px;
                border: none;
                font-size: 1em;
            }

            .search-field:focus,
            .search-field:active {
                outline: none;
            }
        `,
        adjacentElement: adjacentElement,
        position: position || 'beforeend',
        events: [
            {
                selector: `#${id} .search-field`,
                event: 'keyup',
                listener: (event) => {
                    const query = event.target.value;

                    if (action) {
                        action(query);
                    }
                }
            }
        ]
    });
}