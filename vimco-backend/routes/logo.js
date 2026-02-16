const express = require("express");
const router = express.Router();
const logoController = require("../controllers/Logo/logo");

router.post("/add-logo", logoController.createLogo);
router.get("/get-logo", logoController.getAllLogos);
router.get("/get-logo-byid/:id", logoController.getSingleLogo);
router.put("/update-logo/:id", logoController.updateLogo);
router.delete("/delete-logo/:id", logoController.deleteLogo);

module.exports = router;
