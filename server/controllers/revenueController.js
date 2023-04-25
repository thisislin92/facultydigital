const { Revenue } = require("../models");

class ControllerRevenue {
  static async revenue(req, res, next) {
    try {
        const revenueFromDb = await Revenue.findAll({
        })
        res.status(200).json({
            revenue: revenueFromDb
        })
    } catch (error) {
        next(error)
    }
  }
}


module.exports = ControllerRevenue