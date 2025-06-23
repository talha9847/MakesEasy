

using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Text;

namespace MakesEasy.Services
{
    public class EmailService
    {
        public async Task<int> SendEmail(string email, string subject, string resetLink)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    EnableSsl = true,
                    Credentials = new NetworkCredential("cse.210840131054@gmail.com", "rbwiaxmdusnfaspp") // Use App Password
                };

                string plainTextBody = $"Hello,\n\nYou requested to reset your Makes Easy password.\n\n" +
                                       $"Click the link to reset your password: {resetLink}\n\n" +
                                       $"This link will expire in 30 minutes.\n\n" +
                                       $"If you didn't request this, you can safely ignore this email.\n\n" +
                                       $"Best regards,\nThe Makes Easy Team\n© {DateTime.UtcNow.Year} Makes Easy.";

                string htmlBody = $@"<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Password Reset - Makes Easy</title>
    <style>
        body {{ margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif; line-height: 1.6; color: #334155; }}
        .container {{ width: 100%; background-color: #f8fafc; padding: 20px 0; }}
        .email-wrapper {{ max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden; }}
        .header {{ background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%); padding: 40px 30px; text-align: center; }}
        .logo {{ display: inline-flex; align-items: center; gap: 12px; justify-content: center; }}
        .logo-icon {{ width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; color: #ffffff; font-size: 18px; }}
        .logo-text {{ color: #ffffff; font-size: 28px; font-weight: 600; }}
        .tagline {{ color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 12px; }}
        .content {{ padding: 50px 40px; }}
        .icon-wrapper {{ text-align: center; margin-bottom: 30px; }}
        .icon {{ width: 80px; height: 80px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 3px solid #0ea5e9; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto; }}
        .title {{ text-align: center; color: #0f172a; font-size: 32px; font-weight: 700; margin: 20px 0; }}
        .subtitle {{ text-align: center; color: #64748b; font-size: 18px; margin-bottom: 30px; }}
        .message-box {{ background: #f8fafc; border-left: 4px solid #3b82f6; padding: 24px; margin: 30px 0; border-radius: 0 8px 8px 0; }}
        .button-wrapper {{ text-align: center; margin: 40px 0; }}
        .reset-button {{ display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-size: 18px; font-weight: 600; }}
        .warning-box {{ background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 30px 0; }}
        .link-box {{ background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 30px 0; }}
        .link-container {{ background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; word-break: break-word; }}
        .footer {{ background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }}
        .signature {{ margin-top: 50px; padding-top: 30px; border-top: 2px solid #f1f5f9; }}
    </style>
</head>
<body>
    <div class=""container"">
        <table class=""email-wrapper"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden;"">
            <tr>
                <td style=""background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%); padding: 40px 30px; text-align: center;"">
                    <div style=""text-align: center;"">
                        <div style=""display: inline-block; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 8px; line-height: 40px; font-weight: bold; color: #ffffff; font-size: 18px; margin-right: 12px;"">ME</div>
                        <span style=""color: #ffffff; font-size: 28px; font-weight: 600; vertical-align: middle;"">Makes Easy</span>
                    </div>
                    <p style=""color: rgba(255, 255, 255, 0.9); font-size: 16px; margin-top: 12px; margin-bottom: 0;"">Your trusted productivity partner</p>
                </td>
            </tr>
            <tr>
                <td style=""padding: 50px 40px;"">
                    <div style=""text-align: center; margin-bottom: 30px;"">
                        <div style=""width: 80px; height: 80px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 3px solid #0ea5e9; border-radius: 50%; display: inline-block; line-height: 74px; font-size: 32px;"">🔐</div>
                    </div>
                    
                    <h1 style=""text-align: center; color: #0f172a; font-size: 32px; font-weight: 700; margin: 20px 0;"">Reset Your Password</h1>
                    <p style=""text-align: center; color: #64748b; font-size: 18px; margin-bottom: 30px;"">We received a request to reset your account password</p>
                    
                    <div style=""background: #f8fafc; border-left: 4px solid #3b82f6; padding: 24px; margin: 30px 0; border-radius: 0 8px 8px 0;"">
                        <p style=""margin: 0; font-size: 16px; color: #475569;""><strong>Hello,</strong><br><br>Someone requested a password reset for your <strong>Makes Easy</strong> account. If this was you, click the button below to create a new password.</p>
                    </div>
                    
                    <div style=""text-align: center; margin: 40px 0;"">
                        <a href=""{resetLink}"" style=""display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-size: 18px; font-weight: 600;"">🔓 Reset My Password</a>
                    </div>
                    
                    <div style=""background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 30px 0;"">
                        <p style=""margin: 0; color: #92400e; font-size: 14px;"">⚠️ This link will expire in <strong>30 minutes</strong> for your security.</p>
                    </div>
                    
                    <div style=""background: #f1f5f9; border-radius: 12px; padding: 24px; margin: 30px 0;"">
                        <p style=""margin: 0 0 12px 0; font-size: 14px; color: #64748b; font-weight: 600;"">Button not working? Copy and paste this link:</p>
                        <div style=""background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; word-break: break-word;"">
                            <a href=""{resetLink}"" style=""color: #3b82f6; font-size: 14px; text-decoration: none;"">{resetLink}</a>
                        </div>
                    </div>
                    
                    <p style=""text-align: center; color: #64748b; font-size: 15px;"">Didn't request this password reset? You can safely ignore this email. Your password will remain unchanged.</p>
                    
                    <div style=""margin-top: 50px; padding-top: 30px; border-top: 2px solid #f1f5f9;"">
                        <p style=""color: #475569; font-size: 16px; margin-bottom: 5px;"">Best regards,</p>
                        <p style=""color: #0f172a; font-size: 18px; font-weight: 600; margin-top: 0;"">The Makes Easy Team 🚀</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td style=""background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;"">
                    <p style=""color: #94a3b8; font-size: 12px; margin: 5px 0;"">&copy; {DateTime.UtcNow.Year} Makes Easy. All rights reserved.</p>
                    <p style=""color: #cbd5e1; font-size: 11px; margin: 5px 0;"">This email was sent because a password reset was requested for your account.</p>
                    <p style=""margin: 12px 0 5px 0; color: #94a3b8; font-size: 12px;"">Need help? Contact us at <a href=""mailto:support@makeseasy.in"" style=""color: #3b82f6;"">support@makeseasy.in</a></p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>";

                var message = new MailMessage
                {
                    From = new MailAddress("cse.210840131054@gmail.com", "Makes Easy Support"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = htmlBody,
                    BodyEncoding = Encoding.UTF8
                };

                message.To.Add(email);
                message.ReplyToList.Add(new MailAddress("support@makeseasy.in"));
                
                var plainView = AlternateView.CreateAlternateViewFromString(plainTextBody, Encoding.UTF8, "text/plain");
                message.AlternateViews.Add(plainView);
                
                var htmlView = AlternateView.CreateAlternateViewFromString(htmlBody, Encoding.UTF8, "text/html");
                message.AlternateViews.Add(htmlView);

                await smtpClient.SendMailAsync(message);
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Email send error: " + ex.Message);
                return 0;
            }
        }
    }
}