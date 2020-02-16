/* (C) 2019 Stephen Matheis */

/* Global Actions */
import Component from '../Actions/Component.js'

export default function Component_InfoBox(param) {
    const {
        adjacentElement,
        page,
        pages,
        start,
        end,
        total
    } = param;

    const id = app.setComponentId();

    const component = Component({
        id,
        html: /*html*/ `
            <div id='${id}' class='info-box'>
                <div>
                    <span>Page</span>
                    <span class="page-count">${page}</span>
                    <span>of</span>
                    <span class="page-total">${pages}</span>
                </div>
                <div>
                    <span>Showing</span>
                    <span class="item-start">${start}</span>
                    <span>-</span>
                    <span class="item-end">${end}</span>
                    <span>of</span>
                    <span class="item-total">${total}</span>
                </div>
            </div>
        `,
        style: /*css*/ `
            /* Icon */
            .info-box {
                user-select: none;
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

            .info-box > div {
                margin-right: 20px;
            }

            .page-count,
            .page-total,
            .item-start,
            .item-end,
            .item-total {
                font-weight: 500;
            }
        `,
        adjacentElement: adjacentElement,
        position: param.position || 'beforeend',
        events: [
            
        ]
    });

    component.update = (param) => {
        const {
            page,
            start,
            end,
        } = param;
        
        const pageCount = document.querySelector(`#${id} .page-count`);
        const itemStart = document.querySelector(`#${id} .item-start`);
        const itemEnd = document.querySelector(`#${id} .item-end`);

        pageCount.innerText = page;
        itemStart.innerText = start;
        itemEnd.innerText = end;
    }

    return component;
}