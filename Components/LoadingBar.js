/** (C) Stephen Matheis 2019 */

/* Components */
import Component from '../Actions/Component.js'

export default function Component_LoadingBar(param) {
    const {
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    const loadingBar = Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='loading-bar'>
                <!-- <div class='hello-message'>
                    <div>app</div>
                </div> -->
                <div class='loading-message'>
                    <div id='loading-message-text'>Loading ${param.list}...</div>
                    <div class='loading-bar-container'>
                        <div class='loading-bar-status'></div>
                    </div>
                </div>
            </div>
        `,
        style:  /*css*/ `
            .loading-bar {
                display: flex;
                justify-content: center;
                align-items: center;
                animation: fadein 350ms ease-in-out forwards;
            }

            .hello-message {
                height: 100px;
                font-size: 3em;
                font-weight: bolder;
                display: grid;
                place-content: center;
            }

            #loading-message-text {
                font-size: 1.5em;
                font-weight: 400;
                text-align: center;
            }

            .loading-bar-container {
                margin-top: 10px;
                background: lightgray;
                border-radius: 2px;
            }
            
            .loading-bar-status {
                width: 0%;
                height: 8px;
                background: lightslategray;
                border-radius: 2px;
                transition: width 100ms ease-in-out;
            }

            @keyframes fadein {
                from {
                    opacity: 0;
                    transform: scale(0);
                }

                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .fadeout {
                animation: fadeout 350ms ease-in-out forwards;
            }

            @keyframes fadeout {
                from {
                    opacity: 1;
                    transform: scale(1);
                    
                }

                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `,
        adjacentElement: adjacentElement,
        position: 'beforeend'
    });


    return {
        start: () => {
            loadingBar.add();
        },
        update: (counter) => {
            const progressBar = document.querySelector('.loading-bar-status');
            const total = Math.ceil(param.itemCount / 100);

            if (progressBar) {
                progressBar.style.width = `${(counter / total) * 100}%`;
            }
        },
        end: () => {
            return new Promise((resolve, reject) => {
                /** #TODO: Reference component directly not through the DOM. 
                 *         DOM traversal should be implemented in Component.js 
                 * */
                const loadingBar = document.querySelector('.loading-bar');

                if (loadingBar) {
                    loadingBar.classList.add('fadeout');
            
                    loadingBar.addEventListener('animationend', (event) => {
                        loadingBar.remove();
                        resolve(true);
                    });
                }
            });
        }
    }
}