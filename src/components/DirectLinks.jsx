import React from "react";

const DirectLinks = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="font-bold mb-2 text-center">Direct Links</h3>
      <p className="text-sm mb-2">Click these links to navigate directly:</p>
      <div className="flex flex-col gap-1 text-blue-600">
        <a href="/" className="underline hover:text-blue-800">
          Home Page
        </a>
        <a href="/about" className="underline hover:text-blue-800">
          About Page
        </a>
        <a href="/contact" className="underline hover:text-blue-800">
          Contact Page
        </a>
        <a href="/destinations/1" className="underline hover:text-blue-800">
          Destination Details
        </a>
      </div>
    </div>
  );
};

export default DirectLinks;
