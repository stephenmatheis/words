/** (C) Stephen Matheis 2019 */

export default function Component(param) {
    const {
        id,
        html,
        style,
        adjacentElement,
        position,
        register,
        events,
    } = param;

    const component = {
        id,
        html,
        style,
        adjacentElement,
        position,
        events,
        get() {
            return document.querySelector(`#${component.id}`);
        },
        remove() {
            component.get().remove();
        },
        empty() {
            const children = document.querySelector(`#${component.id}`).querySelectorAll('*');
            
            [...children]
                .filter(child => app.store.get(child))
                .map(child => app.store.get(child))
                .forEach(component => component.remove());
        },
        add() {
            addStyle();
            insertHTML();
        }
    }

    function addStyle() {
        const head = document.querySelector('head');
        const html = `
            <style type="text/css" data-component="${component.id}">
                ${style}
            </style>
        `;
    
        head.insertAdjacentHTML('beforeend', html);
    }

    function insertHTML() {
        const element = adjacentElement.get() || app.store.getMainContainer().get();
        
        element.insertAdjacentHTML(position, html);

        addToStore();
        addEventListeners(events);
    }

    function addToStore() {
        if (register !== false) {
            app.store.addComponent(component);
        }
    }

    function addEventListeners(events) {
        if (events) {
            events.forEach(item => {
                if (typeof item.selector === 'string') {
                    document.querySelectorAll(item.selector).forEach((node) => {
                        node.addEventListener(item.event, item.listener);
                    });
                } else {
                    item.selector.addEventListener(item.event, item.listener);
                }
            });
        }
    }

    return component;
}