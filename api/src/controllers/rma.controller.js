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
      const result = await rmaService.insert({  });
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

  module.exports.updateStatus = async (req, res) => {
    const RmaStatusID = req.params.id;
    const { RmaStatus } = req.body;
    try {
        const results = await rmaService.getByStatusID(RmaStatusID);
        if (results.length > 0) {
            const hash = await bcrypt.hash(password, 10);
            await rmaService.updateStatus(
                RmaStatus
            );
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find rma with that status id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
