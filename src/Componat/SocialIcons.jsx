import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
// Store icon names instead of React elements
export const socialLinks = [
  { name: "Facebook", iconName: "FaFacebook" },
  { name: "Instagram", iconName: "FaInstagram" },
  { name: "Twitter", iconName: "FaTwitter" },
  { name: "YouTube", iconName: "FaYoutube" },
  { name: "TikTok", iconName: "FaTiktok" },
  { name: "LinkedIn", iconName: "FaLinkedin" },
  { name: "Google_Maps", iconName: "FaMapMarkerAlt" }, // ✅ underscore version
  { name: "GitHub", iconName: "FaGithub" },
];

// Map of brand colors
export const brandColors = {
  Facebook: "#1877F2",
  Instagram: "#E4405F",
  Twitter: "#1DA1F2",
  YouTube: "#FF0000",
  TikTok: "#000000",
  LinkedIn: "#0A66C2",
  Google_Maps: "#34A853", // ✅ underscore key
  GitHub: "#181717",
};


  // Get icon component dynamically
export const getIcon = (iconName, color) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent color={color} /> : null;
  };
const SocialIcons = ({ AllValues, setAllValues }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({ name: "", iconName: "", url: "" });

  // Open input box when icon is clicked
  const handleGetOpen = (item) => {
    setShow(true);
    setInput({ name: item.name, iconName: item.iconName, url: "" });
  };

  // Update URL state
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, url: e.target.value }));
  };

  // Save URL (replace if same platform exists)
  const handleSend = () => {
    const url = input.url.trim();
    if (url === "") return;

    // Validate URL
    try {
      new URL(url);
    } catch {
      alert("Please enter a valid URL.");
      return;
    }

    setAllValues((prev) => {
      const filtered = prev.filter((item) => item.name !== input.name);
      return [...filtered, input];
    });

    setShow(false);
  };

  // Remove link by index
  const handlerem = (i) => {
    setAllValues((prev) => prev.filter((_, index) => index !== i));
  };


  return (
    <div className="w-full">
      {/* Social Buttons */}
      <div className="flex flex-wrap bg-gray-200 justify-between rounded-xl p-2 gap-4 text-2xl mb-4">
        {socialLinks.map((item, index) => (
          <button
            key={index}
            onClick={() => handleGetOpen(item)}
            title={`Add ${item.name} link`}
            className="transition duration-200 p-1 bg-white rounded hover:scale-105"
          >
            {getIcon(item.iconName, brandColors[item.name])}
          </button>
        ))}
      </div>

      {/* Popup */}
      {show && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 rounded-[20px] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Add {input.name} Link
              </h2>
              <button
                onClick={() => setShow(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>
            <input
              type="url"
              placeholder={`Enter your ${input.name} URL`}
              value={input.url}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Show saved links */}
      {AllValues.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <h3 className="font-semibold text-gray-700">Saved Links</h3>
          <div className="flex flex-col gap-2">
            {AllValues.map((val, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <span
                  onClick={() => handlerem(i)}
                  className="text-red-700 cursor-pointer hover:text-red-900"
                >
                  ✕
                </span>
                {getIcon(val.iconName, brandColors[val.name])}
                <a
                  href={val.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 break-all"
                >
                  {val.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialIcons;
