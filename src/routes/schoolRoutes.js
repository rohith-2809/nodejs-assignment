const express = require("express");
const router = express.Router();
const { addSchool, listSchools } = require("../controllers/schoolController");
const { validateSchool, validateListQuery } = require("../middleware/validate");

router.post("/addSchool", validateSchool, addSchool);
router.get("/listSchools", validateListQuery, listSchools);

module.exports = router;
