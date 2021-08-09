export default class Component {
    constructor(componentObject) {
        // Below properties are pascal case according to profile service protocol.
        this.Id = componentObject.Id;
        this.ComponentTypeId = componentObject.ComponentTypeId;
        this.Status = componentObject.Status;
        this.ProfileId = componentObject.ProfileId;
        this.Version = componentObject.Version;
        this.Name = componentObject.Name;
        this.Type = componentObject.Type;
        this.Contents = componentObject.Contents;
        this.PermissionList = [];
    }

    setData (componentData) {
        let that = this;

        Object.keys(componentData).forEach(function(key) {
            that.key =componentData[key];
        });
    }
}