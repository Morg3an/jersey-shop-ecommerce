import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    const phone = '254704916766';
    const message = encodeURIComponent("Hi, I'm interested in ordering a jersey.");
    const link = `https://wa.me/${phone}?text=${message}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 left-4 group flex items-center bg-green-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 animate-pulse"
        >
            <FaWhatsapp size={20} />
            <span className="ml-2 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap">
                Reach out to us!
            </span>
        </a>
    );
};

export default WhatsAppButton;