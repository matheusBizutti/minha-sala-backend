const Metrics = require('../../models/metrics/metrics.model');

exports.metrics_create = (req, res) => {
  const metrics = new Metrics(
    {
      name: req.body.name,
      api: req.body.api,
      date: req.body.date,
      httpStatusCode: req.body.httpStatusCode,
      user: req.body.user
    }
  );

  metrics.save((err) => {
    if (err) {
      res.send(err);
    }
    res.send('Metric: ' + metrics.name + ' created successfully');
  });
  
};

exports.metrics_details = (req, res) => {

  Metrics.findById(req.params.id, (err, metric) => {
    if (err) return res.send(err);
    res.send(metric);
  });

};

exports.metrics_list = (req, res) => {

  getMetrics(req, res);

};

function getMetrics(req, res) {

  const metricsModel = [
    'name',
    'api',
    'httpStatusCode',
    'date',
    'user'
  ];

  
  Metrics.find({}, metricsModel, (error, metrics) => {
    res.json(metrics);
  });

}