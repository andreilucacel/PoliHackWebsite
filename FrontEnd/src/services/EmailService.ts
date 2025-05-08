import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init(""); // Replace with your actual public key

interface EmailParams {
  to_email: string;
  match_date: string | Date;
  match_time: string | Date;
  match_location: string;
  match_type: string;
}

export const sendMatchConfirmationEmail = async (params: EmailParams) => {
  try {
    const templateParams = {
      to_email: params.to_email,
      match_date: params.match_date,
      match_time: params.match_time,
      match_location: params.match_location,
      match_type: params.match_type,
    };

    const response = await emailjs.send(
      "service_84dl0xp", // Replace with your EmailJS service ID
      "template_wor3jna", // Replace with your EmailJS template ID
      templateParams
    );

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};