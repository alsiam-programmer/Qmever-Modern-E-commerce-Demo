import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
  FaPinterestP,
  FaCopy
} from "react-icons/fa";

const ShareProductsLink = ({ title }) => {
  const url = window.location.href;
  const [disabled, setDisabled] = useState(false);

  const handleClick = (callback) => {
    if (disabled) return; // prevent multiple clicks
    setDisabled(true);
    callback();
    setTimeout(() => setDisabled(false), 1000); // re-enable after 1 sec
  };

  const handleNativeShare = () => {
    handleClick(() => {
      if (navigator.share) {
        navigator.share({
          title: title,
          text: `Check out this product: ${title}`,
          url: url,
        }).catch((err) => console.log(err));
      } else {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    });
  };

  const socialLink = (href) => {
    handleClick(() => window.open(href, "_blank", "noopener,noreferrer"));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={handleNativeShare}
        disabled={disabled}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700"
      >
        <FaCopy /> Copy/Share
      </button>

      <button
        onClick={() =>
          socialLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        }
        disabled={disabled}
        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
      >
        <FaFacebookF /> Facebook
      </button>

      <button
        onClick={() =>
          socialLink(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          )
        }
        disabled={disabled}
        className="flex items-center gap-2 bg-sky-500 text-white px-3 py-2 rounded hover:bg-sky-400"
      >
        <FaTwitter /> Twitter
      </button>

      <button
        onClick={() =>
          socialLink(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`)
        }
        disabled={disabled}
        className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-400"
      >
        <FaWhatsapp /> WhatsApp
      </button>

      <button
        onClick={() =>
          socialLink(
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
              title
            )}`
          )
        }
        disabled={disabled}
        className="flex items-center gap-2 bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-300"
      >
        <FaTelegramPlane /> Telegram
      </button>

    </div>
  );
};

export default ShareProductsLink;
