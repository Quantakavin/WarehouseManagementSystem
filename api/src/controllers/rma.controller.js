const router = require('express').Router();
//database connection
const { rmaService } = require('../services');

// Get RMA
exports.getAllRMA = async (req, res) => {
    try {
      const result = await rmaService.getAllRMA();
  
      if (!result)
        return res.status(404).json({
          error: 'No Posts Found!',
        });
  
      return res.status(200).json({
        result,
      });
    } catch (e) {
      console.log({ e });
    }
  };

  // Get RMA by RMA number
exports.getByRMANO = async (req, res) => {
    const { RMANO } = req.params;
    // Post
    const rma = await rmaService.getByRMANO(RMANO);
    if (!post)
      return res.status(404).json({
        error: `RMA ${RMANO} Not Found!`,
      });
  
    return res.status(200).json({
      result,
    });
  };

  // Create RMA
exports.create = async (req, res) => {
    try {
      const {  } = req.body;
    //   const creator_id = req.authUser.id;
  
      // Checking
  
      // Creating
      const result = await rmaService.create({  });
      if (!result) {
        return res.status(400).json({
          error: 'RMA Not Created!',
        });
      }

      return res.status(201).json({ result });
    } catch (e) {
      console.log({ e });
    }
  };

  module.exports = router