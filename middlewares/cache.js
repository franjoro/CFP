const setCache = function (req, res, next) {
  const period = 60 * 5 ;

  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
module.exports = setCaches;