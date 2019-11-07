// JavaScript source code

//const mailjet = require("node-mailjet").connect(
//    process.env.MAILJET_KEY_PUBLIC,
//    process.env.MAILJET_KEY_PRIVATE
//);




//exports.request = function (req, res) {
//    const quest = mailjet
//        .post("send", { 'version': 'v3.1' })
//        .request({
//            "Messages": [
//                {
//                    "From": {
//                        "Email": req.body.email,
//                        "Name": "emailBoi"
//                    },
//                    "To": [
//                        {
//                            "Email": "fowardgrowth@yahoo.com",
//                            "Name": "fowardgrowth"
//                        }
//                    ],
//                    "Subject": req.body.subject,
//                    "TextPart": req.body.subject,
//                    "HTMLPart": req.body.body,
//                    "CustomID": "foward Growth emailing thing"
//                }
//            ]
//        })

//    quest
//        .then((quest) => {
//            res.send('{"message":"Email successfully sent."}');

//        })
//        .catch((err) => {
//            res.send('{"message":"error while sending email with error code: '.concat(err.statusCode,'"}'));
//        })

//    res.send('{"message":"Email successfully sent."}');

//}