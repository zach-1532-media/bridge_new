const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

const JobEmailHandler = async (req, res) => {
  const { method } = req;

  const { operation, data, jobTitle } = req.body;

  if (method === 'POST') {
    switch (operation) {
      case 'Interview':
        try {
          const msg = {
            to: 'support@connectatthebridge.com',
            bcc: data,
            from: 'welcome@connectatthebridge.com',
            subject: `Interview for ${jobTitle}`,
            html: '<h1>Interview time</h1>',
          };
          sgMail.send(msg);

          res.status(200).json({
            case: 1,
            success: true,
            message: 'Candidates notified!',
          });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      case 'Delete':
        try {
          const msg = {
            to: 'support@connectatthebridge.com',
            bcc: data,
            from: 'welcome@connectatthebridge.com',
            subject: `Update for ${jobTitle}`,
            html: '<h1>Unfortunately....</h1>',
          };
          sgMail.send(msg);

          res.status(200).json({
            case: 1,
            success: true,
            message: 'Candidates notified!',
          });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      case 'Offer':
        try {
          const msg = {
            to: 'support@connectatthebridge.com',
            bcc: data,
            from: 'welcome@connectatthebridge.com',
            subject: `Update for ${jobTitle}`,
            html: '<h1>Congrats!</h1>',
          };
          sgMail.send(msg);

          res.status(200).json({
            case: 1,
            success: true,
            message: 'Candidates notified!',
          });
        } catch (err) {
          res.status(400).json({ case: 2, success: false });
        }
        break;
      default:
        res.status(400).json({ case: 2, success: false });
        break;
    }
  }
};

export default JobEmailHandler;
