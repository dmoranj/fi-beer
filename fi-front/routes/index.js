
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.history = function(req, res) {
    res.render('history', { title: 'History'});
}