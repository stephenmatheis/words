/** (C) Stephen Matheis 2019 */

import Component_AppContainer from './Components/AppContainer.js'
import Component_Topbar from './Components/Topbar.js';
import Component_Sidebar from './Components/Sidebar.js'
import Component_MainContainer from './Components/MainContainer.js'

export default function View_AppContainer(param) {
    const {
        route
    } = param;

    const topbar = Component_Topbar({
        adjacentElement: app.store.getApp(),
        route: route
    });

    topbar.add();

    const appContainer = Component_AppContainer({
        adjacentElement: app.store.getApp()
    });
    
    app.store.setAppContainer(appContainer);
    appContainer.add();

    const sidebar = Component_Sidebar({
        adjacentElement: appContainer,
        route: route
    });

    sidebar.add();

    const mainContainer = Component_MainContainer({
        adjacentElement: appContainer
    });

    app.store.setMainContainer(mainContainer);
    mainContainer.add();
}
