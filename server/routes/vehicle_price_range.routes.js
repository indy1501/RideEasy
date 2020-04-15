module.exports = app => {
    const Pricerange = require("../controllers/vehicle_price_range.controller.js");
  
    // route for creating records in vehicle_price_range table
    app.post("/vehiclepricerange", Pricerange.create);
    console.log("here in routes")

    //route for fetching all the recprds from the vehicle_price_range table
    app.get("/vehiclepricerange", Pricerange.findAll);

};