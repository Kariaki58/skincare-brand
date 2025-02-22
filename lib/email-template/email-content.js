export const generateSellerAppointmentNotificationTemplate = (appointmentId, date, time, numberOfPeople) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            background-color: #0a74da;
            color: #ffffff;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            background-color: #0a74da;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777777;
            background-color: #f4f4f4;
        }
        .footer a {
            color: #0a74da;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">
            <h1>New Appointment Request</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>You have received a new appointment request. Please review and respond accordingly.</p>
            <p>Appointment Date: ${date}</p>
            <p>Appointment Time: ${time}</p>
            <p>Number of People who booked has booked this slot: ${numberOfPeople}</p>
            <a href="${process.env.FRONTEND_URL}/dashboard/admin/appointment/${appointmentId}/accept" class="button" style="background-color: #28a745;">Accept</a>
            <a href="${process.env.FRONTEND_URL}/dashboard/admin/appointment/${appointmentId}/decline" class="button" style="background-color: #dc3545;">Deny</a>
            <p>Once you accept, an email will be sent to the customer confirming their booking. If you deny, they will be notified as well.</p>
        </div>
        <div class="footer">
            <p>Thank you for using our platform!</p>
        </div>
    </div>
</body>
</html>
`;

export const generateCustomerAppointmentConfirmationTemplate = (status, date, time, reason=null) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            background-color: #0a74da;
            color: #ffffff;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            background-color: #0a74da;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777777;
            background-color: #f4f4f4;
        }
        .footer a {
            color: #0a74da;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Appointment ${status ? 'Confirmed' : 'Declined'}</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>Your appointment has been ${status ? 'confirmed' : 'declined'}.</p>
            <p>If you have any questions or need further assistance, please don't hesitate to reach out.</p>
            <p>we expect to see you soon at ${date} and ${time}</p>
            <p>Thank you for choosing our platform!</p>
            ${!status ? `<p>Reason: ${reason}</p>` : ''}
            ${!status ? `<p>You can book another date and time.</p><a href="${process.env.FRONTEND_URL}/book-appointment" class="button">Book Again</a>` : ''}
        </div>
        <div class="footer">
            <p>Thank you for using our platform!</p>
        </div>
    </div>
</body>
</html>
`;

export const generateSellerDepositRequestTemplate = (price) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            background-color: #ff9800;
            color: #ffffff;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Deposit Required</h1>
        </div>
        <div class="content">
            <p>Please make a deposit of $20 to secure your booking:</p>
            <p>Bank: Cashapp or Zelle pay</p>
            <p>Phone Number: 7047138472</p>
            <p>Account Name: Aderonke animashaun</p>
        </div>
    </div>
</body>
</html>
`;

export const generateSimpleSellerOrderNotificationTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            text-align: center;
            background-color: #0a74da;
            color: #ffffff;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            background-color: #0a74da;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #777777;
            background-color: #f4f4f4;
        }
        .footer a {
            color: #0a74da;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Congratulations 🎉 New Order Received</h1>
        </div>

        <div class="content">
            <p>Hi there,</p>
            <p>You have received a new order! To view the details and start processing the order, please visit your admin dashboard.</p>

            <a href="${process.env.FRONTEND_URL}/dashboard/admin/orders" class="button">Go to Admin Dashboard</a>
        </div>

        <div class="footer">
            <p>Congratulations on your new order 🎊🎊🎉</p>
        </div>
    </div>
</body>
</html>
`;