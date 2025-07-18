const axios = require('axios');
const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;


const formatOrderDetails = (order, isCancellation = false) => {
    const {
        _id,
        quantity,
        product,
        customization,
        contact,
        status,
    } = order;
    return isCancellation
        ? `❌ Your order #${_id} has been cancelled.\nProduct: ${product?.name || 'Unknown'}\nQty: ${quantity}\nStatus: ${status}\n– Jersey Shop`
        : `🛒 Order #${_id}
Product: ${product?.name || 'Unknown'}
Qty: ${quantity}
Name on Shirt: ${customization?.nameOnShirt || 'N/A'}
Number: ${customization?.number || 'N/A'}
Color: ${customization?.colorChoice || 'N/A'}

Contact:
- Email: ${contact?.email}
- Phone: ${contact?.phone}
- WhatsApp: ${contact?.whatsapp}
Status: ${status}`;
};

const sendEmail = async (order, isCancellation = false) => {
    try {
        const subject = isCancellation
            ? '❌ Order Cancelled – Jersey Shop'
            : '✅ Order Confirmation – Jersey Shop';

        await axios.post(
            'https://api.resend.com/emails',
            {
                from: RESEND_FROM_EMAIL,
                to: order.contact.email,
                subject,
                text: formatOrderDetails(order, isCancellation),
            },
            {
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('❌ Failed to send customer email:', error.response?.data || error.message);
    }
};

// @TODO: Uncomment when shop email functionality is implemented
/* const sendEmailToShop = async (order) => {
    try {
        await axios.post(
            'https://api.resend.com/emails',
            {
                from: RESEND_FROM_EMAIL,
                to: SHOP_EMAIL,
                subject: '🛍️ New Order Received – Jersey Shop',
                text: formatOrderDetails(order),
            },
            {
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('❌ Failed to send shop email:', error.response?.data || error.message);
    }
};
*/

module.exports = {
    sendEmail
};