import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer(){
  const footerLinks = [
    ["CornHub Business", "Teach on CornHub", "Get the app", "About us", "Contact us"],
    ["Careers", "Blog", "Help and Support", "Affiliate", "Investors"],
    ["Terms", "Privacy policy", "Cookie settings", "Sitemap", "Accessibility statement"],
  ];
  return (
    <div className="font-normal leading-5 text-1.6 text-gray-900">
      <div className="px-8 pt-10 pb-0 text-white bg-blue-800 border-t border-gray-700 border-solid">
        <div className="flex">
          <div className="order-1 p-0 ml-auto">
            <div className="text-white justify-start min-w-36 bg-transparent h-16 relative items-center inline-flex cursor-pointer font-normal leading-5 text-1.6 px-4 py-0 border border-white">
              <LanguageIcon style={{ width: "2rem", height: "2rem" }} />
              <span className="ml-1">English</span>
            </div>
          </div>
          {footerLinks.map((section, index) => (
            <ul key={index} className="w-64 p-0 my-0 ml-0 mr-4">
              <li className="pl-0">
                {section.map((link, i) => (
                  <div key={i} className="text-white block font-normal text-1.4 no-underline px-0 py-1 hover:cursor-pointer hover:underline">
                    {link}
                  </div>
                ))}
              </li>
            </ul>
          ))}
        </div>
        <div className="flex items-center justify-between px-0 pt-16 pb-8 text-white">
          <div className="text-1.2 p-0">&copy; {new Date().getFullYear()} Developed by CornHub, Inc.</div>
          <div className="flex space-x-4">
            <TwitterIcon style={{ width: "2rem", height: "2rem" }} />
            <InstagramIcon style={{ width: "2rem", height: "2rem" }} />
            <FacebookIcon style={{ width: "2rem", height: "2rem" }} />
            <YouTubeIcon style={{ width: "2rem", height: "2rem" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;