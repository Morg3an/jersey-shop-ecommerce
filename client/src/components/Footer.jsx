import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center p-4 mt-8 text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Jersey Shop. All rights reserved.
        </footer>
    );
};

export default Footer;