/* Note: Only add common properties to this class. For very specific unique properties, add them within the context
  taking the advantage of dynamic behaviour of JavaScript

  Ex: objUiWrapper.set('unique-UI-property-name-goes-here', 'value-goes-here');
 */
export default class EntityUiWrapper {
    constructor(entityUiWrapperObject) {
        this.entity = entityUiWrapperObject.entity;
        this.css = null;
        this.style = null;
        this.icon = null;
    }
}