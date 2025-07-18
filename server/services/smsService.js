const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE_SMS } = process.env;

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
        ? `Order Cancelled ❌ - #${_id}
Product: ${product?.name || 'Unknown'}
Qty: ${quantity}
Status: ${status}
– Jersey Shop`
        : `Order Confirmed ✅ - #${_id}
Product: ${product?.name || 'Unknown'}
Qty: ${quantity}
Name: ${customization?.nameOnShirt || 'N/A'}
Number: ${customization?.number || 'N/A'}
Color: ${customization?.colorChoice || 'N/A'}
Contact: ${contact?.phone}
Status: ${status}
– Jersey Shop`
        ;
};

const sendSMS = async (order, isCancellation = false) => {
    const message = formatOrderDetails(order, isCancellation);
    await client.messages.create({
        body: message,
        from: TWILIO_PHONE_SMS,
        to: order.contact.phone
    });
};

module.exports = { sendSMS };