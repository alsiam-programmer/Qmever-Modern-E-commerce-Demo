import React, { useState } from "react";
import {
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

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={handleNativeShare}
        disabled={disabled}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700"
      >
        <FaCopy /> Copy/Share
      </button>
    </div>
  );
};

export default ShareProductsLink;
