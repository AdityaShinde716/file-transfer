const error = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'Something went wrong! Please try again' });
  };
  
  module.exports = error;
  