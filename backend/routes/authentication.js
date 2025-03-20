// const express = require("express");
// const router = express.Router();
// const admin = require("../config/firebase");
// const Account = require("../models/account");

// router.post("/signup", async (req, res) => {
//   const { email, password, username } = req.body;

//   if (!email || !password || !username) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     // Create user in Firebase Authentication
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//       displayName: username,
//     });

//     const account = new Account({
//       username,
//       email,
//       password,
//     });

//     res.status(201).json({
//       message: "Signup successful",
//       user: {
//         uid: userRecord.uid,
//         email: userRecord.email,
//         username: userRecord.displayName,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: error.message || "Signup failed." });
//   }
// });

// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Email and password are required." });
//   }

//   try {
//     const userRecord = await admin.auth().getUserByEmail(email);

//     res.status(200).json({
//       message: "User exits",
//       user: {
//         email: userRecord.email,
//         username: userRecord.displayName,
//       },
//     });
//   } catch (error) {
//     console.error("Error checking email:", error);

//     if (error.code === "auth/user-not-found") {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Generic error response
//     res.status(500).json({ message: error.message || "Login failed." });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const Account = require("../models/account");
const bcrypt = require("bcrypt");

router.post("/update", async (req, res) => {
  const { email, username, password, confirmPassword, address, phonenumber } =
    req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Step 1: Fetch the user from Firebase
    const userRecord = await admin.auth().getUserByEmail(email);

    // Step 2: Prepare the update object for MongoDB
    const updateFields = {
      username,
      address,
      phonenumber,
    };

    // Step 3: Update Firebase Authentication (if email or password is provided)
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update Firebase user's email and password
      await admin.auth().updateUser(userRecord.uid, {
        email: email,
        password: password,
        displayName: username,
      });

      // Add the hashed password to the MongoDB update object
      updateFields.password = hashedPassword;
    }

    // Step 4: Update MongoDB user details
    const updatedAccount = await Account.findOneAndUpdate(
      { email: userRecord.email }, // Use the original email to find the document
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Step 5: Return the updated user details
    res.status(200).json({
      message: "User details updated successfully.",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        username: updatedAccount.username,
        address: updatedAccount.address,
        phonenumber: updatedAccount.phonenumber,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);

    // Handle Firebase-specific errors
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found in Firebase." });
    }

    // Handle MongoDB-specific errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    // Generic error response
    res
      .status(500)
      .json({ message: error.message || "Failed to update user details." });
  }
});

router.get("/", async (req, res) => {
  const { email, username } = req.query;
  if (!email || !username) {
    return res
      .status(400)
      .json({ message: "Email  and username is required." });
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const account = await Account.findOne({ email, username }).populate(
      "cart.product orders.product"
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({
      username: account.username,
      email: account.email,
      password: account.password,
      address: account.address,
      phonenumber: account.phonenumber,
      orders: account.orders,
      cart: account.cart,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);

    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(500)
      .json({ message: error.message || "Failed to fetch profile." });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    const account = new Account({
      username,
      email,
      password,
    });

    await account.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        username: userRecord.displayName,
      },
      account: {
        id: account._id,
        username: account.username,
        email: account.email,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);

    if (error.code === "auth/email-already-exists") {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    res.status(500).json({ message: error.message || "Signup failed." });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.status(200).json({
      message: "Signin successful",
      user: {
        email: userRecord.email,
        username: userRecord.displayName,
      },
      account: {
        id: account._id,
        username: account.username,
        email: account.email,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error);

    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(500).json({ message: error.message || "Signin failed." });
  }
});

module.exports = router;
