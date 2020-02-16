/** (C) Stephen Matheis 2019 */

/* Actions */
import Data from './Actions/Data.js'
import Store from './Actions/Store.js'
import Router from './Actions/Router.js'

/* App Parts */
import View_AppContainer from './AppContainer/AppContainer.js'

window.onload = main;

async function main() {
    // Load data
    const data = await Data();

    let componentId = 1;

    // Define app Namespace. Could make this it's own module.
    window.app = {
        data: data,
        name: 'new',
        defaultColor: 'darkslategray;',
        primaryColor: 'mediumpurple',
        secondaryColor: 'whitesmoke',
        highlightColor: '#f6b73c',
        store: Store(),
        getName() {
            return app.name;
        },
        setComponentId() {
            return `${app.getName()}-${componentId++}`;
        }
    };

    app.store.setApp({
        get() {
            return document.querySelector('#app');
        }
    })

    // Get current route
    const paths = location.href.split('#');
    const route = paths[1] || '';

    // Attach Router to browser back/forward event
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            Router(route);
        }
    });

    // Render app container on page load
    View_AppContainer({
        route
    });

    // Run route on page load
    // Router(route); 
}
