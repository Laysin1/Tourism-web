import React from "react";
import { cn } from "../lib/utils";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  quickLinks?: Array<{
    title: string;
    href: string;
  }>;
  legalLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const Footer = ({
  companyName = "Wanderlust Travel",
  companyLogo = "/vite.svg",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  contactInfo = {
    email: "info@wanderlusttravel.com",
    phone: "+1 (555) 123-4567",
    address: "123 Adventure Ave, Travelville, TX 78701",
  },
  quickLinks = [
    { title: "Destinations", href: "/destinations" },
    { title: "Tours", href: "/tours" },
    { title: "Activities", href: "/activities" },
    { title: "Travel Guides", href: "/guides" },
    { title: "Special Offers", href: "/offers" },
  ],
  legalLinks = [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Sitemap", href: "/sitemap" },
  ],
}: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={companyLogo} alt={companyName} className="h-8 w-8" />
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the world's most breathtaking destinations with our
              expertly curated travel experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.email && (
                <li className="flex items-start space-x-3">
                  <Mail size={18} className="text-gray-400 mt-0.5" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-start space-x-3">
                  <Phone size={18} className="text-gray-400 mt-0.5" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-gray-400 mt-0.5" />
                  <span className="text-gray-400 text-sm">
                    {contactInfo.address}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm text-center mb-4">
              Stay updated with our latest travel deals and destination guides.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            <Globe size={12} className="inline mr-1" />
            <span>Explore the world with us</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
