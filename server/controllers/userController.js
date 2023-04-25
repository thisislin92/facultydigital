const {
    User,
  } = require("../models");
  const {
    compareHash,
    hashPassword
  } = require("../helpers/bcrypt");
  const {
    generateTokenForUser
  } = require("../helpers/jwt");
  
  class Controller {
    static async usersRegister(req, res, next) {
      try {
        let {
          name,
          email,
          password,
        } = req.body;
  
        const hashedPassword = hashPassword(password)
        const createdUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });
  
        res.status(201).json({
          username: createdUser.username,
          email: createdUser.email,
        });
      } catch (error) {
        next(error);
      }
    }
  
    static async usersLogin(req, res, next) {
      try {
        let {
          email,
          password
        } = req.body;
        if (!email) {
          throw {
            name: "MissingEmail"
          };
        }
        if (!password) {
          throw {
            name: "MissingPassword"
          }
        }
        const userFromDB = await User.findOne({
          where: {
            email
          }
        });
        if (!userFromDB) {
          throw {
            name: "InvalidCredentials"
          };
        }
  
        const hash = compareHash(password, userFromDB.password);
        if (!hash) {
          throw {
            name: "InvalidCredentials"
          };
        }
  
        const token = {
          id: userFromDB.id,
        };
        let access_token = generateTokenForUser(token);
        res.status(200).json({
          id: userFromDB.id,
          access_token,
          user: userFromDB.name,
        });
      } catch (error) {
        next(error);
      }
    }

  
    static async getUserByAccessToken(req, res, next) {
      try {
        const userFromDB = await User.findOne({
          where: {
            id: req.user.id
          }
        })
  
        res.status(200).json({
          id: userFromDB.id,
          user: userFromDB.name,
          email: userFromDB.email,
        });
      } catch (error) {
        next(error);
      }
    }
  }
  
  module.exports = Controller;