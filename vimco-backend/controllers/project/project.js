const Project = require("../../models/Project/project");
const { projectValidationSchema  } = require("../../Validation/project");

/* ================= CREATE PROJECT ================= */
exports.createProject = async (req, res) => {
  try {
    const { error } = projectValidationSchema .validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newProject = new Project(req.body);
    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ALL PROJECTS ================= */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET SINGLE PROJECT ================= */
exports.getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE PROJECT ================= */
exports.updateProject = async (req, res) => {
  try {
    const { error } = projectValidationSchema .validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE PROJECT ================= */
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.importProjectsFromJson = async (req, res) => {
  try {
    const { projects } = req.body;

    if (!projects || projects.length === 0) {
      return res.status(400).json({ message: "No project data provided" });
    }

    await Project.insertMany(projects);

    res.status(200).json({
      success: true,
      message: `${projects.length} Projects Imported Successfully`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Import failed" });
  }
};
