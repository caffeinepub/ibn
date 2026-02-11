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

/**
 * Generates a WhatsApp order URL with network and plan details
 * @param options Order details including network, plan name, data, and price
 * @returns WhatsApp URL with pre-filled order message
 */
export function getWhatsAppOrderUrl(options: {
  network: string;
  planName: string;
  data: string;
  price: string;
}): string {
  const message = `Hello! I want to purchase the following data plan:\n\nNetwork: ${options.network}\nPlan: ${options.planName}\nData: ${options.data}\nPrice: ${options.price}\n\nPlease assist me with this order.`;
  return getWhatsAppUrl(message);
}

/**
 * Generates a WhatsApp URL for bank transfer payment confirmation
 * @param planSummary Selected plan details including network, plan name, data, and price
 * @returns WhatsApp URL with pre-filled confirmation message
 */
export function getWhatsAppBankTransferConfirmationUrl(planSummary: {
  network: string;
  planName: string;
  data: string;
  price: string;
}): string {
  const message = `Hello! I have completed a bank transfer for the following data plan:\n\nNetwork: ${planSummary.network}\nPlan: ${planSummary.planName}\nData: ${planSummary.data}\nAmount: ${planSummary.price}\n\nI will send my payment proof shortly. Please confirm and activate my data plan.`;
  return getWhatsAppUrl(message);
}
