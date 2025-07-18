const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE_WHATSAPP } = process.env;

const client = twilio(TWILIO_SID, TWILIO_AUTH);

if (!TWILIO_SID || !TWILIO_AUTH) {
  throw new Error('Twilio credentials are missing from .env');
}

const formatOrderDetails = (order, isCancellation = false) => {
    const {
        _id,
        quantity,
        product,
        customization,
        contact,
        status
    } = order;

    return isCancellation
        ? `❌ Hello Customer. Your order #${_id} has been cancelled.\n\nProduct: ${product?.name || 'Unknown'}\nQty: ${quantity}\nStatus: ${status}\n\nWe hope to serve you again. – Jersey Shop`
        : `🟢 Hello Customer! Your order has been received.

🛍️ Product: ${product?.name || 'Unknown'}
🔢 Qty: ${quantity}
✏️ Name: ${customization?.nameOnShirt || 'N/A'}
🏷️ Number: ${customization?.number || 'N/A'}
🎨 Color: ${customization?.colorChoice || 'N/A'}

📞 Phone: ${contact?.whatsapp}
📦 Status: ${status}

🙏 Thank you for shopping with Jersey Shop!`;
};

const sendWhatsAppMessage = async (order, isCancellation = false) => {
    const message = formatOrderDetails(order, isCancellation);
    await client.messages.create({
        body: message,
        from: `whatsapp:${TWILIO_PHONE_WHATSAPP}`,
        to: `whatsapp:${order.contact.whatsapp}`
    });
};

module.exports = { sendWhatsAppMessage };