const router = require("express").Router();
const Controller = require("../controllers/revenueController");



router.get("/revenue", Controller.revenue);


module.exports = router;
