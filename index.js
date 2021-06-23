import sendgrid from "sendgrid";

const { SENDGRID_API_KEY } = process.env;
const sg = SENDGRID_API_KEY ? sendgrid(SENDGRID_API_KEY) : null;


function sendEmailToMOM(payload) {
    const emailAddresses = [
        {
          email: userEmail,
        },
      ];
      const currentDate = moment().format("YYYYMMDD_hh:mm:ss");
      const momSubjectHeader = `{WebChat}_${currentDate}_${chatRowKey}`;
      // Prepare Email JSON
      const EmailJSON = {
        method: "POST",
        path: "/v3/mail/send",
        body: {
          personalizations: [
            {
              to: emailAddresses,
              subject: momSubjectHeader,
            },
          ],
          from: {
            name: "KeyReply",
            email: "bot@keyreply.com",
          },
          content: [
            {
              type: "text/html",
              value: payload,
            },
          ],
        },
      };
    
      console.log(JSON.stringify(EmailJSON.body));
    
      const request = sg.emptyRequest(EmailJSON);
      const response = await sg.API(request);

      // Success
      console.log(response.statusCode.toString());
      console.log(response.body);
      console.log(JSON.stringify(response.headers));
      return true;
}