export default class MessageService {
    constructor() {
        this.titleBar = null;
    }

    showMessage (message, messageType, isTitle, title, buttons, listItems, closeButtonAction, isHideCloseButton) {
        if (isTitle) {
            let titleBar = this.titleBar;

            if (titleBar) {
                titleBar.showMessage(message, messageType);
            }
        } else {
            // let messageBox = Ember.View.views['message-box'];

            // messageBox.send('showMessageBox', messageType, message, title, buttons, listItems, closeButtonAction, isHideCloseButton);
        }
    }
}