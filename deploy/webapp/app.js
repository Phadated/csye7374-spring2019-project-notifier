const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const auth = require('basic-auth');
const fs = require('fs');
const AWS = require('aws-sdk');

var s3 = new AWS.S3();

let config = JSON.parse(fs.readFileSync('./config/config1.json'));
let secret = JSON.parse(fs.readFileSync('./secret/Secrets1.json'));

const promClient = require('prom-client')
const port = 5001;
const kafka = require('kafka-node');
const bp = require('body-parser');

var kafka_topic=secret.topicname;
var kafka_server=secret.kafkaserver;

AWS.config.update({
    region: secret.REGION,
    domain: secret.DOMAIN_NAME
  });

var sns = new AWS.SNS();

console.log(kafka_topic);
try {
  
  const client = new kafka.KafkaClient({kafkaHost:kafka_server});
  
  // console.log(client);

  // const admin = new kafka.Admin(client);
  // admin.listTopics((err, res) => {
  //   console.log('err', err);
  //   console.log('topics', res);

  // });
  // const consumer = new kafka.Consumer(
  //   client,
  //   [{ topic: secret.topicname, partition: 2 , offset: 0 }],
  //   {
  //     autoCommit: true
  //   }
  // );

  const consumer = new kafka.Consumer(
    client,
    [{ topic: secret.topicname }],
    {
      autoCommit: true
    }
  );

  console.log(consumer);
  consumer.on('message', async function(message) {
    console.log('in comsumer');
    console.log("message:L= ", message)
    console.log(
      'kafka-> ',
      message.value
    );


      
      sns.publish({
        Message: message.value,      // Required
        TargetArn: secret.PWDRESETARN // Required

      }, function(err, data) {
        if (err) {
          console.log(err.stack);
          return;
        }

        console.log('push sent');

      });
  })
  consumer.on('error', function(err) {
    console.log('error', err);
  });
}
catch(e) {
  console.log(e);
}
 
// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

