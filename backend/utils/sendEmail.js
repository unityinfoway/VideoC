const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (userEmail, userPassword) => {
    try {
        // 1. Transporter banayein (Email kaun bhejega)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Hum Gmail use kar rahe hain
            auth: {
                user: process.env.GMAIL_USER, // Aapki Gmail ID
                pass: process.env.GMAIL_APP_PASSWORD, // Aapka Gmail App Password
            },
        });

        // 2. Email ke options set karein (Email kaisa dikhega)
        const mailOptions = {
            from: `"Your App Name" <${process.env.GMAIL_USER}>`, // Bhejne wale ka naam aur email
            to: userEmail, // Paane wale ka email
            subject: 'Welcome to Your App Name! 🎉', // Email ka subject
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Welcome aboard, ${userEmail}!</h2>
                    <p>Thank you for registering with us. We are excited to have you.</p>
                    <p>You can now log in to your account using the following credentials:</p>
                    <ul>
                        <li><strong>Email:</strong> ${userEmail}</li>
                        <li><strong>Password:</strong> ${userPassword}</li>
                    </ul>
                    <p>For security reasons, we recommend you change your password after your first login.</p>
                    <a href="http://localhost:3000/login" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Login to Your Account</a>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <p>Best Regards,<br/>The Your App Name Team</p>
                </div>
            `,
        };

        // 3. Email bhejein
        await transporter.sendMail(mailOptions);
        console.log('✅ Welcome email sent successfully to:', userEmail);

    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
    }
};

module.exports = sendWelcomeEmail;
