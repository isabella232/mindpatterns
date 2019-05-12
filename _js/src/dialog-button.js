/**
* Copyright 2019 eBay Inc.
*
* Use of this source code is governed by a MIT-style
* license that can be found in the LICENSE file or at
* https://opensource.org/licenses/MIT.
*/

const Dialog = require('./dialog.js');

function onClick() {
    this._dialogWidget.open = true;
}

function onClose() {
    this._el.focus();
}

module.exports = class {
    constructor(widgetEl) {
        this._el = widgetEl;

        this._dialogEl = document.getElementById(widgetEl.dataset.makeupDialog);
        this._dialogWidget = new Dialog(this._dialogEl);

        this._destroyed = false;

        this._onClickListener = onClick.bind(this);
        this._onDialogCloseListener = onClose.bind(this);

        this._el.classList.add('dialog-button--js');

        this.wake();
    }

    sleep() {
        this._el.removeEventListener('click');
        this._dialogEl.removeEventListener('dialog-close', this._onDialogCloseListener);
    }

    wake() {
        if (this._destroyed !== true) {
            this._el.addEventListener('click', this._onClickListener);
            this._dialogEl.addEventListener('dialog-close', this._onDialogCloseListener);
        }
    }

    destroy() {
        this._destroyed = true;

        this.sleep();

        this._onClickListener = null;
        this._onDialogCloseListener = null;
    }
}