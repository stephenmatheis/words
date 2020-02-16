/** (C) Stephen Matheis 2019 */

import Component_SideBar from './Components/SideBar.js'
import Component_AppContainer from './Components/AppContainer.js'
import Component_MainContainer from './Components/MainContainer.js'

export default function View_AppContainer(param) {
    const {
        route
    } = param;

    const appContainer = Component_AppContainer({
        adjacentElement: app.store.getApp()
    });
    
    app.store.setAppContainer(appContainer);
    appContainer.add();

    const sideBar = Component_SideBar({
        adjacentElement: appContainer,
        route: route
    });

    sideBar.add();

    const mainContainer = Component_MainContainer({
        adjacentElement: appContainer
    });

    app.store.setMainContainer(mainContainer);
    mainContainer.add();
}
