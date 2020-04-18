const sql = require("./db.js");

// constructor
const VehicleType = function(vehicle_type) {
    this.uuid = vehicle_type.uuid;
    this.type = vehicle_type.type;
};

VehicleType.create = (newVehicleType, result) => {
    sql.query("INSERT INTO vehicle_type SET ?", newVehicleType, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created vehicle_type: ", {...newVehicleType });
        result(null, {...newVehicleType });
    });
};


module.exports = VehicleType;