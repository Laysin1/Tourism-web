import React from "react";
import { Button } from "./ui/button";

const NavigationLinks = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="font-bold mb-2">Quick Navigation</h3>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          size="sm"
          className="justify-start"
        >
          Home Page
        </Button>
        <Button
          onClick={() => (window.location.href = "/about")}
          variant="outline"
          size="sm"
          className="justify-start"
        >
          About Page
        </Button>
        <Button
          onClick={() => (window.location.href = "/contact")}
          variant="outline"
          size="sm"
          className="justify-start"
        >
          Contact Page
        </Button>
        <Button
          onClick={() => (window.location.href = "/destinations/1")}
          variant="outline"
          size="sm"
          className="justify-start"
        >
          Destination Details
        </Button>
      </div>
    </div>
  );
};

export default NavigationLinks;
