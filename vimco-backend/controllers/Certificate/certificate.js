const Certificate = require("../../models/Certificate/certificate");
const { certificateValidationSchema } = require("../../Validation/certificate");


// 🔹 Create Certificate
exports.createCertificate = async (req, res) => {
  try {
    const { error, value } = certificateValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const certificate = await Certificate.create(value);

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// 🔹 Get All Certificates
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ display_order: 1 });

    res.json({
      success: true,
      data: certificates,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// 🔹 Get Single Certificate
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      data: certificate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// 🔹 Update Certificate
exports.updateCertificate = async (req, res) => {
  try {
    const { error, value } = certificateValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// 🔹 Delete Certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
