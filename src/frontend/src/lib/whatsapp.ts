export const WHATSAPP_NUMBER = '09033449260';

/**
 * Generates a WhatsApp chat URL with optional pre-filled message
 * @param message Optional message to pre-fill in the chat
 * @returns WhatsApp URL
 */
export function getWhatsAppUrl(message?: string): string {
  // Format: Remove leading zero and add country code (assuming Nigeria +234)
  const formattedNumber = '234' + WHATSAPP_NUMBER.substring(1);
  
  const baseUrl = `https://wa.me/${formattedNumber}`;
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  
  return baseUrl;
}
