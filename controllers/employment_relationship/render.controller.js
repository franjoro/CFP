/*
name: render.controller
description: render controller for employment relationship
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 03/11/2021 for OsmaroBonilla
last-update: 03/11/2021 for OsmaroBonilla
*/
  const pool = require("../../models/db");
  const { getUserDataByToken } = require("../../middlewares/auth");
  const renderController = {};
  
 //#region 
 renderController.menu = async (req, res) => {
    //  use for permissions management 
    const usuario = getUserDataByToken(req.cookies.token);
      try {
        //   response
        return res.render("./employment_relationship/menu", {
            data: usuario.data,

        });
      } catch (error) {
          return res.status(400).json(error);
      }
  };

renderController.detail = async(req, res) =>{
  const usuario = getUserDataByToken(req.cookies.token);
  try {
      return res.render("./employment_relationship/details",{
        data: usuario.data,
      });
  } catch (error) {
      return res.status(400).json(error);
  }
};
  
  module.exports = renderController;