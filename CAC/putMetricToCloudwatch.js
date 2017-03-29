var AWS = require('aws-sdk');
var cloudwatch = new AWS.CloudWatch();

exports.handler = (event, context, callback) => {

    var warningCount = 0;
    event.Records.forEach(function(record) {
        warningCount++;
        // Kinesis data is base64 encoded so decode here
        var payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
        console.log('warning count:', warningCount);
        var eventTime =  new Date(payload.split('|')[1]);
        console.log('date :', eventTime);
        
        var params = {
          MetricData: [ /* required */
            {
              MetricName: 'WarningCount', /* required */
              Dimensions: [
                {
                  Name: 'warningID', /* required */
                  Value: '123456' /* required */
                },
                /* more items */
              ],
              Timestamp: eventTime.toISOString(),
              Unit: 'None',
              Value: warningCount 
            },
          ],
          Namespace: 'CACDemo' /* required */
        };
        
        cloudwatch.putMetricData(params, function(err, data) {
          var logMsg = 'Count:'+ warningCount+ ' on '+ eventTime.toISOString();
          console.log(logMsg);
          
          context.callbackWaitsForEmptyEventLoop = false; 
          
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
          callback(err,data); 
        });

    });
    
    callback(null, 'finished ');
};