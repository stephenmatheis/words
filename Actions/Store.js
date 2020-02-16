/** (C) Stephen Matheis 2019 */

export default function Store() {
    let app;
    let appContainer;
    let mainContainer;
    let components = [];
    let events = [];

    return {
        setApp(component) {
            app = component;
        },
        getApp() {
            return app;
        },
        setAppContainer(component) {
            appContainer = component;
        },
        getAppContainer() {
            return appContainer;
        },
        setMainContainer(component) {
            mainContainer = component;
        },
        getMainContainer() {
            return mainContainer;
        },
        addComponent(component) {
            components.push(component);
        },
        getComponent(component) {
            return components.find(component);
        },
        removeComponent(component) {
            const index = components.indexOf(component);
    
            components.splice(index, 1);
        },
        addEvent(event) {
            events.push(event);
        },
        getEvent(event) {
            return events.find(event);
        },
        removeEvent(event) {
            const index = events.indexOf(event);
    
            events.splice(index, 1);
        },
        empty() {
            components = [];
            events = [];
        }
    }
}