import React from "react";
import { Button } from "./ui/button";

const PageNavigation = () => {
  return (
    <div className="fixed top-24 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <h3 className="font-bold mb-2 text-center">Page Navigation</h3>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Home
        </Button>
        <Button
          onClick={() => (window.location.href = "/about")}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          About
        </Button>
        <Button
          onClick={() => (window.location.href = "/contact")}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Contact
        </Button>
        <Button
          onClick={() => (window.location.href = "/destinations/1")}
          className="w-full bg-amber-600 hover:bg-amber-700"
        >
          Destination Details
        </Button>
      </div>
    </div>
  );
};

export default PageNavigation;
