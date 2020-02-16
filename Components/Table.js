/* (C) 2019 Stephen Matheis */

/* Global Actions */
import Component from '../Actions/Component.js'

export default function Component_Table(param) {
    const {
        adjacentElement,
        heading,
        toolbar,
        checkboxes,
        headers,
        rows,
        tables
    } = param;
    
    let viewTables = tables;

    const id = app.setComponentId();

    const component = Component({
        id,
        html: /*html*/ `
            <div id='${id}' class="table-container">
                <table class="table">
                    ${createTableHTML()}
                </table>
            </div>
        `,
        style: /*css*/ `
            /* Container */
            .table-container { /* Hack. */
                user-select: none; /* Hack. */
                display: flex;
                flex-direction: column;
                overflow: overlay;
                background: white;
                overflow: auto;
                border-radius: 4px;
                /* border: solid 1px lightgray; */
                padding: 10px;
                margin-bottom: 50px; /* Hack. */
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            }

            @media (max-width: 1100px) {
                .table-container {
                    margin: 4px;
                }
            }

            /* Table */
            .table {
                flex: 1;
                width: 100%;
                table-layout: fixed;
                /* margin: 0px 10px 10px 10px; */
                border-collapse: separate;
                border-spacing: 0px;
                font-size: .9em;
            }

            /* Columns */
            .table .checkbox-col {
                width: 50px;
            }

            /* Rows */
            .table tbody tr:not(:last-child) td,
            .table tbody tr:not(:last-child) th {
                border-bottom: solid 1px lightgray;
            } 

            .table tbody tr:hover {
                /*background: ${app.secondaryColor};*/
                background: ${app.secondaryColor};
            }

            .table tr:hover td:first-child {
                border-radius: 4px 0px 0px 4px;
            }

            .table tr:hover td:last-child {
                border-radius: 0px 4px 4px 0px;
            }

            /* Head */
            .table thead tr th {
                font-weight: 500;
            }

            /* Cells */
            .table th, 
            .table td {
                width: auto;
                padding: 10px;
                vertical-align: top;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table thead th,
            .table tbody th {
                text-align: left;
            }

            .table thead th {
                border-bottom: solid 2px ${app.primaryColor};
                white-space: nowrap;
            }

            .table tbody th {
                white-space: nowrap; 
            }

            .table tbody td:not(:first-child),
            .table tbody th {
                cursor: pointer;
            }

            .table tbody td {
                font-weight: 500;
            }

            /* Inner cell content */
            .table tbody tr td div,
            .table tbody tr th div {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                max-height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* Checkboxes */
            label {
                display: flex;
            }

            input[type='checkbox'] {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            input[type='checkbox'] ~ .toggle {
                width: 20px;
                height: 20px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                /* border: solid 2px seagreen; */
                border: solid 2px lightgray;
                border-radius: 4px;
                cursor: pointer;
            }

            input[type='checkbox']:hover ~ .toggle {
                border-color: mediumseagreen;
            }
            

            input[type='checkbox']:checked ~ .toggle {
                border: solid 2px mediumseagreen;
                background: mediumseagreen url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
            }
        `,
        adjacentElement: adjacentElement,
        position: param.position || 'beforeend',
        events: [
            {
                selector: `#${id} thead tr th input[type="checkbox"]`,
                event: 'change',
                listener: selectAllBodyCheckboxes
            },
            {
                selector: `#${id} tbody tr td input[type="checkbox"]`,
                event: 'change',
                listener: toggleActionData
            },
            {
                selector: `#${id} tbody tr td:not(:first-child)`,
                event: 'click',
                listener: runAction
            },
            {
                selector: `#${id} tbody tr th`,
                event: 'click',
                listener: runAction
            }
        ]
    });

    function createTableHTML() {
        return (checkboxes !== false ? createCheckboxColumn() : '') + (headers !== false ? createHeaders() : '') + (rows !== false ? createRows() : '');
    }

    function createCheckboxColumn() {
        return /*html*/ `
            <colgroup>
                <col class="checkbox-col">
            </colgroup>
        `
    }

    function createHeaders() {
        let headers = /*html*/ `
            <thead>
                <tr>
        `;

        // Add Checkboxes
        if (checkboxes !== false) {
            headers += /*html*/ `
                <th>
                    <label>
                        <input type="checkbox"  />
                        <span class="toggle"></span>
                    </label>
                </th>
            `
        }

        param.table.columns.forEach((column) => {
            headers += /*html*/ `
                <th>${column}</th>
            `;
        });

        headers += /*html*/ `
                </tr>
            </thead>
        `

        return headers;
    }

    function createRows() {
        let rows = /*html*/ `
            <tbody>
        `;
       
        param.data.forEach((item) => {
            rows += /*html*/ `
                <tr data-itemid=${item.Id}>
            `

            // Add Checkboxes
            if (checkboxes !== false) {
                rows += /*html*/ `
                    <td data-itemid=${item.Id}>
                        <label>
                            <input type="checkbox" data-itemid=${item.Id} />
                            <span class="toggle"></span>
                        </label>
                    </td>
                `
            }

            // First column th not td
            const firstField = param.table.fields[0];
            const type = firstField.includes('Date'); // Hack.
            const value = type ? new Date(item[firstField]).toLocaleDateString() : item[firstField];

            rows += /*html*/ `
                <th data-itemid=${item.Id}>
                    <div>
                        ${value}
                    </div>
                </th>
            `;

            param.table.fields
            .slice(1)
            .forEach((field, index) => {
                const type = field.includes('Date'); // Hack.
                const value = type ? new Date(item[field]).toLocaleDateString() : item[field];

                rows += /*html*/ `
                    <td data-itemid=${item.Id}>
                        <div>
                            ${value}
                        </div>
                    </td>
                `;
            });

            rows += /*html*/ `
                </tr>
            `;
        });

        rows += /*html*/ `
            </tbody>
        `;

        return rows;
    }

    /** On row lick, fire passed in [param.action] callback */
    function runAction(event) {
        const itemId = parseInt(this.dataset.itemid);

        if (param.action) {
            param.action(itemId);
        }
    }

    function selectAllBodyCheckboxes(event) {
        toggleButtonState();

        const rows = document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]`); // Just this table's checkboxes
        // const rows = document.querySelectorAll(`.table tbody tr td input[type="checkbox"]`); // Default to all rows in current view

        if (this.checked) {
            rows.forEach(row => {
                toggleChecked(row, true);
            });
        } else {
            rows.forEach(row => {
                toggleChecked(row, false);
            });   
        }
    }

    function toggleChecked(checkbox, checked) {
        const changeEvent = new Event("change", {'bubbles': true, 'cancelable' :false});

        checkbox.checked = checked;
        checkbox.dispatchEvent(changeEvent);
    }

    function toggleButtonState() {
        let checked;

        if (viewTables) {
            // All tables in curren view
            checked = viewTables
                .map(table => [...table.getChecked()])
                .flat()
                .length;
        } else {
            // Just this table's checkboxes
            checked = document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]:checked`).length;
        }

        if (checked) {
            setButtonState(enableButton);
        } else {
            setButtonState(disableButton);
        }
    }

    function setButtonState(state) {
        Object.entries(toolbar.buttons).forEach(state);
    }
    
    function enableButton([key, value]) {
        value.enable();
    }

    function disableButton([key, value]) {
        value.disable();
    }

    function toggleActionData(event) {
        toggleHeaderCheckbox();
        toggleButtonState();

        const rowCount = document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]`).length;

        const actionData = {
            list: param.list,
            node: this.closest('tr'),
            table: component,
            heading,
            itemId: this.dataset.itemid,
            rowCount
        }

        if (this.checked) {
            registerActionData(actionData);
        } else {
            removeActionData(actionData);
        }
    }

    function toggleHeaderCheckbox() {
        const rows = document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]`).length; // Just this table's checkboxes
        const checked = document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]:checked`).length; // Just this table's checkboxes

        // If all unchecked, uncheck header checkbox 
        if (checked === 0) {
            const selectAll = document.querySelector(`#${id} thead tr th input[type="checkbox"]`);

            selectAll.checked = false;
        } 

        // If all checked, check header checkbox 
        else if (checked === rows) {
            const selectAll = document.querySelector(`#${id} thead tr th input[type="checkbox"]`);

            selectAll.checked = true;
        }
    }

    function registerActionData(item) {
        app.store.registerActionData(item);
    }

    function removeActionData(item) {
        app.store.removeActionData(item);
    }

    component.setTables = (newTables) => {
        viewTables = newTables;
    }

    component.getChecked = () => {
        return document.querySelectorAll(`#${id} tbody tr td input[type="checkbox"]:checked`);
    }

    component.selectAll = (checked) => {
        const selectAllCheckbox = document.querySelector(`#${id} thead tr th input[type="checkbox"]`);

        if (!selectAllCheckbox) {
            return;
        }

        if (checked && selectAllCheckbox) {
            toggleChecked(selectAllCheckbox, true);
        } else {
            toggleChecked(selectAllCheckbox, false);
        }
    }

    return component;
}