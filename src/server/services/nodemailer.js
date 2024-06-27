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
			tls: { ciphers: "SSLv3" },
		});
		return transporter;
	}

	static async sendEmail(email, balance, sub, content) {
		let message =
			'<table style="border: 1px solid #333; border-spacing: 15px; margin-left: 50px; font-size: 20px">' +
			"<thead>" +
			"<th style='margin-left: 50px;'> Vendor </th>" +
			"<th>  </th>" +
			"<th> sum </th>" +
			"</thead>";

		for (let i in content) {
			message +=
				"<tr>" +
				"<td>" +
				`${content[i].name} ` +
				"</td>" +
				"<td>   </td>" +
				"<td>" +
				`${content[i].sum} ` +
				"</td>" +
				"</tr>";
		}

		message += "</table>";
		message +=`<br></br><span style='margin-left: 50px; font-size: 20px;'><strong>Current Balance: </strong>${balance}ש״ח</span>`;


		const info = {
			to: email,
			subject: sub,
			html: message,
		};
		const transporter = this.Transporter();
		transporter.sendMail(info, (response) => {
			if (response.error) {
				console.log(response.error);
			}
		});
	}
}

module.exports = Mailer;
