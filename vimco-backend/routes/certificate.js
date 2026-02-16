const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/Certificate/certificate");

router.post("/add-certificate", certificateController.createCertificate);
router.get("/get-certificate", certificateController.getCertificates);
router.get("/get-certificate-byid/:id", certificateController.getCertificateById);
router.put("/update-certificate/:id", certificateController.updateCertificate);
router.delete("/delete-certificate/:id", certificateController.deleteCertificate);

module.exports = router;
