const express = require("express");
const router = express.Router();
const eventController = require("../controllers/Events/events");

router.post("/add-event", eventController.createEvent);
router.get("/get-event", eventController.getAllEvents);
router.get("/get-event-byid/:id", eventController.getSingleEvent);
router.put("/update-event/:id", eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

module.exports = router;
