module.exports = (req, res, next) => {
  req.crawlerManager = req.app.crawlerManager;
  next();
}