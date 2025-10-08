import { useState, useEffect } from 'react';

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp_number: string;
}

interface WhatsAppMessage {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  eventDate?: string;
  budget?: string;
  location?: string;
  vendorName?: string;
  [key: string]: any;
}

export const useWhatsAppIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWhatsAppNumber();
  }, []);

  const fetchWhatsAppNumber = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/header/contact-info/`);
      if (response.ok) {
        const data: ContactInfo = await response.json();
        setWhatsappNumber(data.whatsapp_number || '');
      }
    } catch (error) {
      console.error('Error fetching WhatsApp number:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendToWhatsApp = (data: WhatsAppMessage, customMessage?: string) => {
    if (!whatsappNumber) {
      console.error('WhatsApp number not available');
      return;
    }

    let message = customMessage;
    
    if (!message) {
      // Generate message from form data
      message = `🌟 *New Inquiry from chobighar Website* 🌟\n\n`;
      
      if (data.name) message += `👤 *Name:* ${data.name}\n`;
      if (data.email) message += `📧 *Email:* ${data.email}\n`;
      if (data.phone) message += `📱 *Phone:* ${data.phone}\n`;
      if (data.service) message += `🎯 *Service:* ${data.service}\n`;
      if (data.eventDate) message += `📅 *Event Date:* ${data.eventDate}\n`;
      if (data.budget) message += `💰 *Budget:* ${data.budget}\n`;
      if (data.location) message += `📍 *Location:* ${data.location}\n`;
      if (data.vendorName) message += `🏪 *Vendor:* ${data.vendorName}\n`;
      if (data.message) message += `💬 *Message:* ${data.message}\n`;
      
      message += `\n✨ *Sent via chobighar.com* ✨`;
    }

    // Clean phone number (remove any non-digits and add country code if needed)
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const phoneNumber = cleanNumber.startsWith('91') ? cleanNumber : `91${cleanNumber}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const sendInquiryToWhatsApp = (inquiryData: WhatsAppMessage) => {
    const message = `🎉 *New Service Inquiry* 🎉\n\n` +
      `👤 *Name:* ${inquiryData.name}\n` +
      `📧 *Email:* ${inquiryData.email}\n` +
      `📱 *Phone:* ${inquiryData.phone}\n` +
      `🎯 *Service Interested:* ${inquiryData.service}\n` +
      `📅 *Event Date:* ${inquiryData.eventDate || 'Not specified'}\n` +
      `💰 *Budget Range:* ${inquiryData.budget || 'Not specified'}\n` +
      `📍 *Event Location:* ${inquiryData.location || 'Not specified'}\n` +
      `💬 *Message:* ${inquiryData.message || 'No additional message'}\n\n` +
      `✨ *Inquiry submitted via chobighar.com* ✨`;
    
    sendToWhatsApp(inquiryData, message);
  };

  const sendVendorInquiryToWhatsApp = (vendorData: WhatsAppMessage) => {
    const message = `🏪 *Vendor Profile Inquiry* 🏪\n\n` +
      `👤 *Client Name:* ${vendorData.name}\n` +
      `📧 *Email:* ${vendorData.email}\n` +
      `📱 *Phone:* ${vendorData.phone}\n` +
      `🏪 *Vendor:* ${vendorData.vendorName}\n` +
      `🎯 *Service:* ${vendorData.service}\n` +
      `📅 *Event Date:* ${vendorData.eventDate || 'To be discussed'}\n` +
      `💰 *Budget:* ${vendorData.budget || 'To be discussed'}\n` +
      `📍 *Location:* ${vendorData.location || 'To be discussed'}\n` +
      `💬 *Requirements:* ${vendorData.message || 'Will discuss further'}\n\n` +
      `✨ *Inquiry for vendor via chobighar.com* ✨`;
    
    sendToWhatsApp(vendorData, message);
  };

  const sendContactFormToWhatsApp = (contactData: WhatsAppMessage) => {
    const message = `📞 *Contact Form Submission* 📞\n\n` +
      `👤 *Name:* ${contactData.name}\n` +
      `📧 *Email:* ${contactData.email}\n` +
      `📱 *Phone:* ${contactData.phone || 'Not provided'}\n` +
      `🎯 *Subject:* ${contactData.service || 'General Inquiry'}\n` +
      `💬 *Message:*\n${contactData.message}\n\n` +
      `✨ *Sent via chobighar.com Contact Form* ✨`;
    
    sendToWhatsApp(contactData, message);
  };

  return {
    whatsappNumber,
    loading,
    sendToWhatsApp,
    sendInquiryToWhatsApp,
    sendVendorInquiryToWhatsApp,
    sendContactFormToWhatsApp
  };
};