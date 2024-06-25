const nodemailer = require("nodemailer");

class Mailer {
	static Transporter() {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "adir.hino92@gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "adirhno@gmail.com",
				pass: "xbxvyrnfjuuumakd",
			},
            tls: { ciphers: 'SSLv3' }
           
		});
		return transporter;
	}

	static async sendEmail( email, sub, text) {
        let vendor = "";
        for(let i in text){
            vendor += "vendor:  ";
            vendor += text[i].name;
            vendor += "  sum: ";
            vendor += text[i].sum
        }
		const info = {
			to: email,
			subject: sub,
			text: vendor,
		};
        console.log(vendor)
		const transporter = this.Transporter();
		transporter.sendMail(info, (response)=>{if(response.error){console.log(response.error)}})
	}
}

module.exports = Mailer;
