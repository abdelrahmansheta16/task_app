const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const nodemailGun = require('nodemailer-mailgun-transport')
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(nodemailGun(auth));



// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'abdelrahman.sheta16@gmail.com',
//         pass: 'rerbrazhnijrnuco'
//     }
// });

// transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: 'src/views/'
// }));

const sendWelcomeEmail = async (email, name) => {
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: 'abdelrahmansheta16@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Thanks for joining in", // Subject line
        text: `Welcome to the app ${name}`, // plain text body
        html: await readFile('src/views/index.handlebars', 'utf-8')
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendCancellationEmail = async (email, name) => {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'abdelrahman.sheta16@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Email Cancellation", // Subject line
        text: `Thank you for using the app ${name}`, // plain text body
        amp: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="font-family:arial, 'helvetica neue', helvetica, sans-serif">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>New message</title>
    <!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }

        [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 30px 10px 30px !important;
        }

        @media only screen and (max-width:600px) {

            p,
            ul li,
            ol li,
            a {
                line-height: 150% !important
            }

            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
                line-height: 120% !important
            }

            h1 {
                font-size: 36px !important;
                text-align: left
            }

            h2 {
                font-size: 26px !important;
                text-align: left
            }

            h3 {
                font-size: 20px !important;
                text-align: left
            }

            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
                font-size: 36px !important;
                text-align: left
            }

            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
                font-size: 26px !important;
                text-align: left
            }

            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
                font-size: 20px !important;
                text-align: left
            }

            .es-menu td a {
                font-size: 12px !important
            }

            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
                font-size: 14px !important
            }

            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
                font-size: 14px !important
            }

            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
                font-size: 14px !important
            }

            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
                font-size: 12px !important
            }

            *[class="gmail-fix"] {
                display: none !important
            }

            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
                text-align: center !important
            }

            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
                text-align: right !important
            }

            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
                text-align: left !important
            }

            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
                display: inline !important
            }

            .es-button-border {
                display: inline-block !important
            }

            a.es-button,
            button.es-button {
                font-size: 20px !important;
                display: inline-block !important
            }

            .es-adaptive table,
            .es-left,
            .es-right {
                width: 100% !important
            }

            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
                width: 100% !important;
                max-width: 600px !important
            }

            .es-adapt-td {
                display: block !important;
                width: 100% !important
            }

            .adapt-img {
                width: 100% !important;
                height: auto !important
            }

            .es-m-p0 {
                padding: 0 !important
            }

            .es-m-p0r {
                padding-right: 0 !important
            }

            .es-m-p0l {
                padding-left: 0 !important
            }

            .es-m-p0t {
                padding-top: 0 !important
            }

            .es-m-p0b {
                padding-bottom: 0 !important
            }

            .es-m-p20b {
                padding-bottom: 20px !important
            }

            .es-mobile-hidden,
            .es-hidden {
                display: none !important
            }

            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
                width: auto !important;
                overflow: visible !important;
                float: none !important;
                max-height: inherit !important;
                line-height: inherit !important
            }

            tr.es-desk-hidden {
                display: table-row !important
            }

            table.es-desk-hidden {
                display: table !important
            }

            td.es-desk-menu-hidden {
                display: table-cell !important
            }

            .es-menu td {
                width: 1% !important
            }

            table.es-table-not-adapt,
            .esd-block-html table {
                width: auto !important
            }

            table.es-social {
                display: inline-block !important
            }

            table.es-social td {
                display: inline-block !important
            }

            .es-m-p5 {
                padding: 5px !important
            }

            .es-m-p5t {
                padding-top: 5px !important
            }

            .es-m-p5b {
                padding-bottom: 5px !important
            }

            .es-m-p5r {
                padding-right: 5px !important
            }

            .es-m-p5l {
                padding-left: 5px !important
            }

            .es-m-p10 {
                padding: 10px !important
            }

            .es-m-p10t {
                padding-top: 10px !important
            }

            .es-m-p10b {
                padding-bottom: 10px !important
            }

            .es-m-p10r {
                padding-right: 10px !important
            }

            .es-m-p10l {
                padding-left: 10px !important
            }

            .es-m-p15 {
                padding: 15px !important
            }

            .es-m-p15t {
                padding-top: 15px !important
            }

            .es-m-p15b {
                padding-bottom: 15px !important
            }

            .es-m-p15r {
                padding-right: 15px !important
            }

            .es-m-p15l {
                padding-left: 15px !important
            }

            .es-m-p20 {
                padding: 20px !important
            }

            .es-m-p20t {
                padding-top: 20px !important
            }

            .es-m-p20r {
                padding-right: 20px !important
            }

            .es-m-p20l {
                padding-left: 20px !important
            }

            .es-m-p25 {
                padding: 25px !important
            }

            .es-m-p25t {
                padding-top: 25px !important
            }

            .es-m-p25b {
                padding-bottom: 25px !important
            }

            .es-m-p25r {
                padding-right: 25px !important
            }

            .es-m-p25l {
                padding-left: 25px !important
            }

            .es-m-p30 {
                padding: 30px !important
            }

            .es-m-p30t {
                padding-top: 30px !important
            }

            .es-m-p30b {
                padding-bottom: 30px !important
            }

            .es-m-p30r {
                padding-right: 30px !important
            }

            .es-m-p30l {
                padding-left: 30px !important
            }

            .es-m-p35 {
                padding: 35px !important
            }

            .es-m-p35t {
                padding-top: 35px !important
            }

            .es-m-p35b {
                padding-bottom: 35px !important
            }

            .es-m-p35r {
                padding-right: 35px !important
            }

            .es-m-p35l {
                padding-left: 35px !important
            }

            .es-m-p40 {
                padding: 40px !important
            }

            .es-m-p40t {
                padding-top: 40px !important
            }

            .es-m-p40b {
                padding-bottom: 40px !important
            }

            .es-m-p40r {
                padding-right: 40px !important
            }

            .es-m-p40l {
                padding-left: 40px !important
            }

            button.es-button {
                width: 100%
            }
        }
    </style>
</head>

<body
    style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FAFAFA">
        <!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#fafafa"></v:fill>
</v:background>
<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
            <tr>
                <td valign="top" style="padding:0;Margin:0">
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                    cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center">
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-infoblock" align="center"
                                                                    style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">
                                                                        <a target="_blank" href=""
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View
                                                                            online version</a></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-header" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                    align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td class="es-m-p0r" valign="top" align="center"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0;padding-bottom:20px;font-size:0px"
                                                                    align="center"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_887f48b6a2f22ad4fb67bc2a58c0956b/images/93351617889024778.png"
                                                                        alt="Logo"
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px"
                                                                        title="Logo" width="200"></td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:0;Margin:0">
                                                                    <table class="es-menu" width="100%" cellspacing="0"
                                                                        cellpadding="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr class="links">
                                                                            <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:15px;padding-bottom:15px;border:0"
                                                                                width="50%" valign="top" align="center">
                                                                                <a target="_blank" href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px">
                                                                                    (000) 123 45 67</a></td>
                                                                            <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:15px;padding-bottom:15px;border:0"
                                                                                width="50%" valign="top" align="center">
                                                                                <a target="_blank"
                                                                                    href="mailto:parker@email.com"
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666;font-size:14px">parker@email.com</a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                    align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c" align="left"
                                                                    style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px">
                                                                    <h1
                                                                        style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">
                                                                        WE LOOK FORWARD TO SERVING YOU!</h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:60px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p20b" align="left"
                                                        style="padding:0;Margin:0;width:60px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c"
                                                                    style="padding:0;Margin:0;font-size:0px"
                                                                    align="right"><a target="_blank"
                                                                        href="https://viewstripo.email"
                                                                        style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><img
                                                                            src="https://jehjxy.stripocdn.email/content/guids/CABINET_a5dd84a718ff1bbe8a9ddfab44cc6511/images/12581621865359778.png"
                                                                            alt
                                                                            style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                            width="60"></a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:10px"></td><td style="width:490px" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:490px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c" align="left"
                                                                    style="padding:0;Margin:0">
                                                                    <h3
                                                                        style="Margin:0;line-height:40px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#666666">
                                                                        Aaron Parker</h3>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666;font-size:14px">
                                                                        CEO of "Style Casual"</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="left"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        Hi&nbsp;*|FNAME|*&nbsp;*|LNAME|*!</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        During the last meeting, we agreed that this
                                                                        Summer, Style Casual&nbsp;would provide the
                                                                        services as follows:</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:30px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-c"
                                                                                style="padding:0;Margin:0;font-size:0px"
                                                                                align="right"><img
                                                                                    src="https://jehjxy.stripocdn.email/content/guids/CABINET_a5dd84a718ff1bbe8a9ddfab44cc6511/images/2851617878322771.png"
                                                                                    alt
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                                    width="25"></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:510px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-l" align="left"
                                                                                style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                                    build a mobile app that will help
                                                                                    you track your orders;</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:30px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-c"
                                                                                style="padding:0;Margin:0;font-size:0px"
                                                                                align="right"><img
                                                                                    src="https://jehjxy.stripocdn.email/content/guids/CABINET_a5dd84a718ff1bbe8a9ddfab44cc6511/images/2851617878322771.png"
                                                                                    alt
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                                    width="25"></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:510px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-l" align="left"
                                                                                style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                                    open 150 new offline stores and
                                                                                    showrooms&nbsp;all over the world.
                                                                                    So&nbsp;customers&nbsp;can come and
                                                                                    try on new pieces
                                                                                    of&nbsp;clothing&nbsp;at any time;
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:30px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-c"
                                                                                style="padding:0;Margin:0;font-size:0px"
                                                                                align="right"><img
                                                                                    src="https://jehjxy.stripocdn.email/content/guids/CABINET_a5dd84a718ff1bbe8a9ddfab44cc6511/images/2851617878322771.png"
                                                                                    alt
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                                    width="25"></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td class="es-m-p0r" align="center"
                                                                    style="padding:0;Margin:0;width:510px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-l" align="left"
                                                                                style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                                    pack and ship&nbsp;orders 24/7.
                                                                                    Users book&nbsp;a dress on Saturday,
                                                                                    get it on Sunday.</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0"><span
                                                                        class="es-button-border"
                                                                        style="border-style:solid;border-color:#5c68e2;background:#5c68e2;border-width:2px;display:inline-block;border-radius:5px;width:auto"><a
                                                                            href="https://viewstripo.email"
                                                                            class="es-button" target="_blank"
                                                                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#5C68E2;border-width:10px 30px 10px 30px;display:inline-block;background:#5C68E2;border-radius:5px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">VIEW
                                                                            FULL LIST</a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                    align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c" align="left"
                                                                    style="padding:0;Margin:0">
                                                                    <h1
                                                                        style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">
                                                                        INVOICE</h1>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="es-m-txt-c" align="left"
                                                                    style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px">
                                                                    <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#999999;font-size:14px"
                                                                        class="p_description">July&nbsp;</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                                    TASK DESCRIPTION</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <p
                                                                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                                    AMOUNT</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td class="es-m-txt-l" align="left"
                                                                                style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:-webkit-left">
                                                                                    Building a mobile app<br><span
                                                                                        style="color:#999999;font-size:14px">This
                                                                                        mobile app will let&nbsp;your
                                                                                        clients pay for their orders
                                                                                        online. And will let them track
                                                                                        their
                                                                                        orders'&nbsp;shipment.</span>
                                                                                </h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <span style="font-size:14px">$850</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:-webkit-left">
                                                                                    Opening 150 new offline stores<br>
                                                                                    <font style="font-size:14px"
                                                                                        color="#999999">For in-store
                                                                                        pick-up. Users book online and
                                                                                        then visit your offline stores
                                                                                        to try on some pieces of
                                                                                        clothing and to "taste" the
                                                                                        aromas.&nbsp;</font>
                                                                                </h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <span style="font-size:14px">$850</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:-webkit-left">
                                                                                    Packing and shipping orders
                                                                                    24/7<br><span
                                                                                        style="color:#999999;font-size:14px">You
                                                                                        hire our "Shipment" team. They
                                                                                        cover night shifts and weekends
                                                                                        so you perform delivery
                                                                                        24/7.</span></h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <span style="font-size:14px">$850</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;background-position:center center"
                                            align="left">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="right"
                                                                                style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:right">
                                                                                    Subtotal</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">
                                                                                    $2550</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="right"
                                                                                style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:right">
                                                                                    Discounts</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">
                                                                                    -$250</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0px"
                                                                    align="center">
                                                                    <table width="100%" height="100%" cellspacing="0"
                                                                        cellpadding="0" border="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;border-bottom:2px solid #efefef;background:none;height:1px;width:100%;margin:0px">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="esdev-adapt-off" align="left"
                                            style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                            <table class="esdev-mso-table" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                                <tr>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-left" cellspacing="0" cellpadding="0"
                                                            align="left"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:410px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="right"
                                                                                style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:right">
                                                                                    Total</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding:0;Margin:0;width:20px"></td>
                                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                                        <table class="es-right" cellspacing="0" cellpadding="0"
                                                            align="right"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;width:130px">
                                                                    <table width="100%" cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="left" style="padding:0;Margin:0">
                                                                                <h3
                                                                                    style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">
                                                                                    $2300</h3>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0"><span
                                                                        class="es-button-border"
                                                                        style="border-style:solid;border-color:#5c68e2;background:#5c68e2;border-width:2px;display:inline-block;border-radius:5px;width:auto"><a
                                                                            href="https://viewstripo.email"
                                                                            class="es-button" target="_blank"
                                                                            style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#5C68E2;border-width:10px 30px 10px 30px;display:inline-block;background:#5C68E2;border-radius:5px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">DOWNLOAD
                                                                            INVOICE</a></span></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff"
                                    align="center"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:143px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p0r es-m-p20b" align="center"
                                                        style="padding:0;Margin:0;width:133px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0;font-size:0px"
                                                                    align="center"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/17971617974647919.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="45"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        FREE <br>SHIPPING</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="es-hidden" style="padding:0;Margin:0;width:10px"></td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:143px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p20b" align="center"
                                                        style="padding:0;Margin:0;width:133px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0;font-size:0px"
                                                                    align="center"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/80801617974647921.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="45"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        EASY <br>PAYMENT</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="es-hidden" style="padding:0;Margin:0;width:10px"></td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:132px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td class="es-m-p20b" align="center"
                                                        style="padding:0;Margin:0;width:132px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0;font-size:0px"
                                                                    align="center"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/77861617974647919.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="45"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        QUICK <br>RETURN</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:10px"></td><td style="width:132px" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="center" style="padding:0;Margin:0;width:132px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td style="padding:0;Margin:0;font-size:0px"
                                                                    align="center"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_1154ef987a3f887ce59a7fdb008c50d6/images/59831617975283573.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="45"></td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        QUALITY ASSURANCE</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:255px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c"
                                                                    style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px"
                                                                    align="right"><img
                                                                        src="https://jehjxy.stripocdn.email/content/guids/CABINET_90f69f3562bdb558f48526150425d3b6/images/12581621865359778.png"
                                                                        alt
                                                                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                                                        width="150"></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td><td style="width:5px"></td><td style="width:300px" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:300px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-m-txt-c" align="left"
                                                                    style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                                                                    <h3
                                                                        style="Margin:0;line-height:40px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">
                                                                        Aaron Parker</h3>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        CEO of "Style Casual"</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        <a target="_blank"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px;line-height:21px"
                                                                            href="">+ 0 (000) 123 456 789</a></p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                                        <a target="_blank"
                                                                            href="mailto:aaronparker@email.com"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:14px;line-height:21px">parker@email.com</a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="es-m-txt-c"
                                                                    style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"
                                                                    align="left">
                                                                    <table class="es-table-not-adapt es-social"
                                                                        cellspacing="0" cellpadding="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td valign="top" align="center"
                                                                                style="padding:0;Margin:0;padding-right:10px">
                                                                                <img title="Facebook"
                                                                                    src="https://jehjxy.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                                                    alt="Fb" width="24" height="24"
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                            </td>
                                                                            <td valign="top" align="center"
                                                                                style="padding:0;Margin:0;padding-right:10px">
                                                                                <img title="Twitter"
                                                                                    src="https://jehjxy.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                                                                    alt="Tw" width="24" height="24"
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                            </td>
                                                                            <td valign="top" align="center"
                                                                                style="padding:0;Margin:0;padding-right:10px">
                                                                                <img title="Instagram"
                                                                                    src="https://jehjxy.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                                                                    alt="Inst" width="24" height="24"
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                            </td>
                                                                            <td valign="top" align="center"
                                                                                style="padding:0;Margin:0"><img
                                                                                    title="Youtube"
                                                                                    src="https://jehjxy.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                                                                    alt="Yt" width="24" height="24"
                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-footer-body"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                    cellspacing="0" cellpadding="0" align="center">
                                    <tr>
                                        <td align="left"
                                            style="Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:30px">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-bottom:35px">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">
                                                                        Style Casual&nbsp;?? 2021 Style Casual, Inc. All
                                                                        Rights Reserved.</p>
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">
                                                                        4562 Hazy Panda Limits, Chair Crossing,
                                                                        Kentucky, US, 607898</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding:0;Margin:0">
                                                                    <table class="es-menu" width="100%" cellspacing="0"
                                                                        cellpadding="0" role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr class="links">
                                                                            <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0"
                                                                                width="33.33%" valign="top"
                                                                                align="center"><a target="_blank"
                                                                                    href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Visit
                                                                                    Us </a></td>
                                                                            <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"
                                                                                width="33.33%" valign="top"
                                                                                align="center"><a target="_blank"
                                                                                    href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Privacy
                                                                                    Policy</a></td>
                                                                            <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:5px;padding-bottom:5px;border:0;border-left:1px solid #cccccc"
                                                                                width="33.33%" valign="top"
                                                                                align="center"><a target="_blank"
                                                                                    href=""
                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#999999;font-size:12px">Terms
                                                                                    of Use</a></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table class="es-content" cellspacing="0" cellpadding="0" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table class="es-content-body"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                    cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center">
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table width="100%" cellspacing="0" cellpadding="0"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td class="es-infoblock" align="center"
                                                                    style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC">
                                                                    <p
                                                                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">
                                                                        <a target="_blank" href=""
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No
                                                                        longer want to receive these emails?&nbsp;<a
                                                                            href="" target="_blank"
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a
                                                                            target="_blank" href=""
                                                                            style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = { sendWelcomeEmail, sendCancellationEmail }

