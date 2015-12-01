var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAJ4XXSEPRWE3PUFXA', secretAccessKey: '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',region: 'us-west-2'});

var cloudwatch = new AWS.CloudWatch();

var params = {
  MetricData: [ /* required */
    {
      MetricName: 'Status', /* required */
      Dimensions: [
        {
          Name: 'playerId', /* required */
          Value: '123456' /* required */
        },
        /* more items */
      ],
/*
      StatisticValues: {
        Maximum: 0.0, 
        Minimum: 0.0,
        SampleCount: 0.0,
        Sum: 0.0 
      },
*/
      Timestamp: new Date() ,
      Unit: 'None',
      Value: 1
    },
  ],
  Namespace: 'MusicPlayer' /* required */
};

cloudwatch.putMetricData(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var params = {
  Dimensions: [
    {
          Name: 'playerId', /* required */
          Value: '123456' /* required */
    },
  ],
  MetricName: 'Status',
  Namespace: 'MusicPlayer',
};

cloudwatch.listMetrics(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
