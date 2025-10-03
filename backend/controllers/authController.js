const User = require("../models/User");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User already exists with this email" });
      }

      const user = new User({ name, email, password });
      await user.save();

      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      res.json({
        message: "Registration successful",
        user: req.session.user,
      });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      res.json({
        message: "Login successful",
        user: req.session.user,
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  },

  getProfile: (req, res) => {
    res.json({ user: req.session.user });
  },

  checkAuth: (req, res) => {
    if (req.session.user) {
      res.json({ authenticated: true, user: req.session.user });
    } else {
      res.json({ authenticated: false });
    }
  },
};

module.exports = authController;
