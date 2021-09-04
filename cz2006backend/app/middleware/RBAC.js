const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.Roles = (function() {
    ac.grant("user")
        .createOwn("profile")
        .readOwn("profile")
        .updateOwn("profile")
        .deleteOwn("profile")
    ac.grant("admin")
        .createAny("profile")
        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile")
    return ac;
})();
