const Vehicle = require("../models/vehicle.model.js")
const { uuid } = require("uuidv4")
//all vehicle apis will be updated in this file

// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
  console.log("inside create exports")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    uuid: uuid(),
    vehicle_type_uuid: req.body.vehicle_type_uuid,
    model: req.body.model,
    make: req.body.make,
    year: req.body.year,
    registration_number: req.body.registration_number,
    current_mileage: req.body.current_mileage,
    last_serviced_date: req.body.last_serviced_date,
    is_reserved: req.body.is_reserved,
    vehicle_condition: req.body.vehicle_condition,
    next_available_time: req.body.next_available_time,
    location_uuid: req.body.location_uuid
  })

  // Save Vehicle in the database
  Vehicle.create(vehicle, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Vehicle."
      })
    else res.send(data)
  })
}

// Retrieve all unreserved Vehicles which satisfy the search criteria

exports.findBySearchCriteria = (req, res) => {
  Vehicle.getBySearchCriteria(
    req.query.vehicle_type,
    req.query.location,
    req.query.reservation_start_time,
    req.query.reservation_end_time,
    (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error occurred while retrieving vehicles."
        })
      else {
        console.log(data)
        res.send(data)
      }
    }
  )
}

// Retrieve a single vehicle with vehicle UUID

exports.findVehicleByUuid = (req, res) => {
  Vehicle.findVehicleByUuid(req.params.vehicleUuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vehicle with uuid ${req.params.vehicleUuid}.`
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Vehicle with uuid " + req.params.vehicleUuid
        })
      }
    } else res.send(data)
  })
}

// For the admin to see all vehicles

exports.findAllVehicles = (req, res) => {
  Vehicle.getAllVehicles((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occurred while retrieving membership."
      })
    else res.send(data)
  })
}
