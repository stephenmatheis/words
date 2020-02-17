/** (C) Stephen Matheis 2019 */

/* Components */
import Title from '../Components/Title.js'

/* Actions */
import History from './History.js'

/* Views */
import View_Home from '../Views/Home/Home.js'

export default function Router(route) {
    // Remove components form DOM and store
    app.store.empty();

    // Set browswer history state
    History({
        url: `${location.href.split('#')[0]}${(route) ? `#${route}` : ''}`,
        title: `app${(route) ? ` - ${route}` : ''}`
    });

    // Choose view to render
    switch (route) {
        case '':
            addTitle('Home Page Title');

            View_Home();
        default:
            break;
    }

    function addTitle(displayText) {
        const title = Title({
            title: displayText,
            adjacentElement: app.store.getMainContainer()
        });

        title.add();
    }
}
