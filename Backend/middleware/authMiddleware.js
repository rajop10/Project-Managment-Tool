const authMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login"); // Only redirect if NOT logged in
  }
  next(); // Otherwise, proceed
};