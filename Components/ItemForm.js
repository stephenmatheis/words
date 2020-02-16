/* (C) 2019 Stephen Matheis */

/* Global Actions */
import Component from '../Actions/Component.js'

export default function Component_ItemForm(param) {
    const {
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' data-list=${param.list} data-itemid=${param.item.Id}>
                ${createFormHTML()}
            </div>
        `,
        style: /*css*/ `
            /* Rows */
            .item-form-row {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }

            /* Labels */
            .item-form-label {
                font-size: 1em;
                font-weight: bold;
                padding-left: 5px;
            }

            /* Fields */
            .item-form-field {
                font-size: .9em;
                margin-top: 2px;
                margin-bottom: 4px;
                padding: 10px;
                background: white;
                border: solid 2px lightgray;
                border-radius: 4px;
                font-weight: 500;
            }

            .item-form-field:active,
            .item-form-field:focus {
                outline: none;
                border: solid 2px ${app.primaryColor};
            }
        `,
        adjacentElement: adjacentElement,
        position: param.position || 'beforeend',
        events: [

        ]
    });

    function createFormHTML() {
        let html = '';

        param.labels.forEach((label, index) => {
            html += /*html*/ `
                <div class='item-form-row'>
                    <div class='item-form-label'>${label}</div>
                    <div class='item-form-field' contenteditable="true" data-internalfieldname=${param.fields[index]}>${param.item[param.fields[index]]}</div>
                </div>
            `;
        });

        return html;
    }
}