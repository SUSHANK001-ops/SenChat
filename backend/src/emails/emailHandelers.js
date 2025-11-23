import { resendClient, sender } from "../lib/resend.js"
import { welcomeEmail } from "./emailTemplates.js"

export const sendWelcomeEmail = async(email,name,clientURL) =>{
    const { html, subject } = welcomeEmail(name, clientURL);
    
    const {data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject: subject,
        html: html
    })
    if(error){
        console.log("Error sending welcome email:",error)
        throw new Error("Failed to send welcome email")
    }
    return data
}