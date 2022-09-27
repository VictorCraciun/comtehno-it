const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "comtehno-it.srl@outlook.com",
        pass:"Teodora*2022!"
    }
  });

const options = {
    from: "comtehno-it.srl@outlook.com",
    to: "craciun.victor.tudor@gmail.com",
    subeject: "Hei",
    text:"wow"
};

transporter.sendMail(options, function(err, info) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Sent" + info.response);
});
