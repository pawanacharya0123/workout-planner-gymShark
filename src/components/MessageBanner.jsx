import React from "react";

const MessageBanner = ({ type, message }) => {
  if (!message) return null;

  const styles = {
    success:
      "bg-green-100 dark:bg-green-950 border-green-400 dark:border-green-800 text-green-800 dark:text-green-200",
    warning:
      "bg-yellow-100 dark:bg-yellow-950 border-yellow-400 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
  };
  return (
    <div className={`${styles[type]} border px-4 py-3 rounded relative mb-4`}>
      {type === "warning" ? "⚠️" : "✅"} {message}
    </div>
  );
};

export default MessageBanner;
