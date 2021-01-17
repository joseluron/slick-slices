const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
    <h2>Your recent order for ${total}</h2>
    <p>We will have your order readsy in the next 20 minutes</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}" />
          ${item.size} ${item.name} - ${item.price} 
        </li>`
        )
        .join('')}
    </ul>
    <h2>Your total is ${total} due at pickup</h2>
  </div>
  `;
}

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Send the email
  const info = await transporter.sendMail(
    {
      from: "Slick's Slices <slick@example.com>",
      to: `${body.name} <${body.email}>, orders@example.com`,
      subject: 'New Order!!',
      text: 'This is your order!',
      html: generateOrderEmail({ order: body.order, total: body.total }),
    },
    (err) => {
      if (err) {
        console.log('An error: ', err.message);
        return err.message;
      }
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
