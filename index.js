const express = require("express");
const app = express();

// Winston Logger
const logger = require("./log/logger");

// Database Connection
require("./db/connection");

// Middleware
app.use(express.json());

// User
const User = require("./models/users");

// Getting list of all users ---- GET request
app.get("/users", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
    logger.info("Successfully Fetched all User data");
  } catch (e) {
    res.status(400).send(e);
    logger.error("Unable to fetch user data : Error in GET request");
  }
});

// Getting specific user ----GET request
app.get("/users/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await User.find({ name });
    if (result.length === 0) {
      res.status(400).send("User Not Found ");
      logger.error(
        `User not found with the name ${name} : Error in GET request`
      );
    } else {
      res.status(200).send(result);
      logger.info(`Successfully Fetched User data with name = ${name}`);
    }
  } catch (e) {
    res.status(400).send(e);
    logger.error("Unable to fetch user data : Error in GET request");
  }
});

// Creating a new user ---- POST request
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const createUser = await user.save();
    res.status(200).send(createUser);
    logger.info("Successfully Created User : POST request");
  } catch (e) {
    res.status(400).send(e);
    logger.error("Unable to create user : Error in POST request");
  }
});

// Deleting a user ---- DELETE request
app.delete("/users/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await User.findOneAndDelete({ name });
    if (result === null){
        res.status(400).send("User Not Found")
    }
    else{
    res.status(200).send(result);
    logger.info(
      `Successfully Deleted User with name = ${name} : DELETE request`
    );
    }
  } catch (e) {
    res.status(400).send(e);
    logger.error("Unable to delete user : Error in DELETE request");
  }
});

// Updating a user ---- PUT request
app.put("/users/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const uname = req.body.name;
    const uemail = req.body.email;
    const uphoneNumber = req.body.phoneNumber;
    const uaddress = req.body.address;

    const updatedUser = await User.findOneAndUpdate(
      { name: name },
      {
        $set: {
          name: uname,
          email: uemail,
          phoneNumber: uphoneNumber,
          address: uaddress,
        },
      },
      { new: true }
    );
    // console.log(updatedUser);
    if (updatedUser === null) {
      res.status(200).send("User Not Found");
      logger.error(`User not found with name = ${name} : Unable to UPDATE`);
    } else {
      res.status(200).send(updatedUser);
      logger.info(
        `Successfully Updated User with name = ${name} : PUT request`
      );
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(8000, () => {
  console.log("Server listening at port 8000");
});

module.exports = app;
