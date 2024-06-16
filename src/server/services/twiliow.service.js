
// const twilio = require('twilio')

//  require('dotenv').config();

// class TwilioMessagesManager {
//     constructor() {
//         try {
//             this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//         }
//         catch(error) {
//             console.log("Failed to Initialize Twilio Client");
//             console.log(error);
//         }
//     }

//     async sendSMS(phoneNumber, message) {
//         try {
//             await this.client.messages
//                 .create({
//                     body: message,
//                     from: '+972547443231',
//                     to: "+972525441293"
//                 })
//         }
//         catch(error) {
//             console.log("Failed to send SMS:");
//             console.log(error);
//         }
//     }

//     async sendWhatsapp(phoneNumber, message) {
//         try {
//             await this.client.messages
//             .create({
//                 body: message,
//                 from: "whatsapp:" + process.env.TWILIO_WHATSAPP_PHONE_NUMBER,
//                 to: "whatsapp:" + phoneNumber
//             })
//         }
//         catch(error) {
//             console.log("Failed to send Whatsapp:")
//             console.log(error);
//         };
//     }
// }

// const twilioMessagesManager = new TwilioMessagesManager();
// module.exports = twilioMessagesManager
