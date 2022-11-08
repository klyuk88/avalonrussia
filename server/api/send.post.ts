import nodemailer from 'nodemailer';
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "klyukovskiy",
      pass: "Dmb!02072010",
    },
  });

  let htmlBody = `<table style="width: 100%;">`;

  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      htmlBody =
        htmlBody +
        `<tr style="background-color: #f8f8f8;">
              <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>${key}</b></td>
              <td style="padding: 10px; border: #e9e9e9 1px solid;">${body[key]}</td>
              </tr>`;
    }
  }
  htmlBody = htmlBody + `</table>`;    

try {
  let info = await transporter.sendMail({
    from: 'klyukovskiy@yandex.ru', // sender address
    to: "klyukovskiy@yandex.ru", // list of receivers
    subject: "Заявка с сайта AvalonRus", // Subject line
    text: "", // plain text body
    html: htmlBody, // html body
  });
  return event.res.end(); 
} catch (error) {
  return event.res.statusCode = 400;
}
  
})