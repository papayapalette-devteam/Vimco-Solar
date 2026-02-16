const Logo = require("../../models/Logo/logo");
const { logoValidationSchema } = require("../../Validation/logo");

/* ================= CREATE LOGO ================= */
exports.createLogo = async (req, res) => {
  try {
    const { error } = logoValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const logo = new Logo(req.body);
    await logo.save();

    res.status(201).json({
      success: true,
      message: "Logo created successfully",
      data: logo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL LOGOS ================= */
exports.getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({ display_order: 1 });

    res.status(200).json({
      success: true,
      count: logos.length,
      data: logos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET SINGLE LOGO ================= */
exports.getSingleLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: logo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE LOGO ================= */
exports.updateLogo = async (req, res) => {
  try {
    const { error } = logoValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const logo = await Logo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo updated successfully",
      data: logo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE LOGO ================= */
exports.deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findByIdAndDelete(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
