// /d:/WebdevStuff/SenChat/backend/src/emails/emailTemplates.js
// Simple, reusable welcome email template generator.
// Returns an object with subject, text and html fields.
// Usage: const { welcomeEmail } = require('./emailTemplates');
//        const message = welcomeEmail({ name: 'Alice', openSenChatUrl: 'https://senchat.example.com' });

function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Generate welcome email content.
 * @param {Object} opts
 * @param {string} opts.name - Recipient name (used in greeting)
 * @param {string} opts.openSenChatUrl - URL for "Open SenChat" button/link
 * @returns {{subject: string, text: string, html: string}}
 */
function welcomeEmail( name, openSenChatUrl ) {
    const safeName = escapeHtml(name);
    const safeUrl = escapeHtml(openSenChatUrl);

    const subject = `Welcome to SenChat, ${name}!`;
    const text = [
        `Hi ${name},`,
        '',
        'Welcome to SenChat — we are happy to have you on board.',
        '',
        `Open SenChat: ${openSenChatUrl}`,
        '',
        'If you did not sign up for this account, please ignore this email.',
        '',
        '— The SenChat Team'
    ].join('\n');

    const html = `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
            body { font-family: Arial, Helvetica, sans-serif; background:#f6f8fb; margin:0; padding:20px; }
            .card { max-width:600px; margin:20px auto; background:#fff; border-radius:8px; padding:24px; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
            .logo { font-weight:700; color:#0b69ff; font-size:20px; margin-bottom:12px; }
            .greeting { font-size:18px; margin-bottom:8px; }
            .lead { color:#555; margin-bottom:20px; line-height:1.5; }
            .btn { display:inline-block; background:#0b69ff; color:#fff; text-decoration:none; padding:12px 18px; border-radius:6px; }
            .footer { color:#999; font-size:12px; margin-top:20px; }
        </style>
    </head>
    <body>
        <div class="card" role="article" aria-label="Welcome to SenChat">
            <div class="logo">SenChat</div>
            <div class="greeting">Hi ${safeName},</div>
            <div class="lead">
                Welcome to SenChat — we're excited to have you. Get started by opening SenChat and exploring your new workspace.
            </div>
            <a class="btn" href="${safeUrl}" target="_blank" rel="noopener">Open SenChat</a>
            <div class="footer">
                If you didn't sign up for SenChat, you can safely ignore this email.<br/>
                © ${new Date().getFullYear()} SenChat
            </div>
        </div>
    </body>
</html>`.trim();

    return { subject, text, html };
}

export { welcomeEmail };