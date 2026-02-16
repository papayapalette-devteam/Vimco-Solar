const express = require("express");
const router = express.Router();
const controller = require("../controllers/Testimonials/testimonials");

router.post("/add-testimonial", controller.createTestimonial);
router.get("/get-testimonial", controller.getAllTestimonials);
router.get("/get-testimonial-byid/:id", controller.getSingleTestimonial);
router.put("/update-testimonial/:id", controller.updateTestimonial);
router.delete("/delete-testimonial/:id", controller.deleteTestimonial);

module.exports = router;
