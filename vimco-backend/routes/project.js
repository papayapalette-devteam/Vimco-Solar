const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project/project");

router.post("/add-project", projectController.createProject);
router.get("/get-project", projectController.getAllProjects);
router.get("/get-project-byid/:id", projectController.getSingleProject);
router.put("/update-project/:id", projectController.updateProject);
router.delete("/delete-project/:id", projectController.deleteProject);

module.exports = router;
