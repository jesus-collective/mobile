/* Amplify Params - DO NOT EDIT
	ANALYTICS_JCMOBILE_ID
	ANALYTICS_JCMOBILE_REGION
	ENV
	REGION
Amplify Params - DO NOT EDIT */

'use strict';

var aws = require('aws-sdk');

// Provide the full path to your config.json file. 
async function sendAlertEmail() {
  console.log("Sending Email");
  //  aws.config.loadFromPath('./config.json');
  // Replace sender@example.com with your "From" address.
  // This address must be verified with Amazon SES.
  const sender = "Jesus Collective <donot-reply@jesuscollective.com>";

  // Replace recipient@example.com with a "To" address. If your account 
  // is still in the sandbox, this address must be verified.
  const recipient = "george.bell@themeetinghouse.com";

  // Specify a configuration set. If you do not want to use a configuration
  // set, comment the following variable, and the 
  // ConfigurationSetName : configuration_set argument below.


  // The subject line for the email.
  const subject = "Jesus Collective Message Alert";

  // The email body for recipients with non-HTML email clients.
  const body_text = "You have received a message on Jesus Collective\r\n"
    + "Please login to view it.";

  // The HTML body of the email.
  const body_html = `<html>
<head></head>
<body>
  <h1>Jesus Collective Message Alert</h1>
  <p>You have received a direct message on Jesus Collective
    <a href='https://beta.jesuscollective.com/'>Login</a></p>
</body>
</html>`;

  // The character encoding for the email.
  const charset = "UTF-8";
  console.log("Create SES");
  // Create a new SES object. 
  var ses = new aws.SES();

  // Specify the parameters to pass to the API.
  var params = {
    Source: sender,
    Destination: {
      ToAddresses: [
        recipient
      ],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset
      },
      Body: {
        Text: {
          Data: body_text,
          Charset: charset
        },
        Html: {
          Data: body_html,
          Charset: charset
        }
      }
    }
  };
  console.log("Sending");

  //Try to send the email.
  const data = await ses.sendEmail(params).promise()
  return data

}

exports.handler = async event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  const data = await sendAlertEmail()
  console.log(data)
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
