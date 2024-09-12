import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Movie Website.</p>
          </div>
          <div className="flex space-x-4">
            {/* <a href="#" className="text-gray-300 hover:text-gray-400">
              About Us
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
