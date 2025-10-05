import { getDatabase, onValue, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

// ✅ Function to format timestamps
const formatTime = (timestamp) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(timestamp).toLocaleDateString();
};

const Comment = ({ id }) => {
  const db = getDatabase();
  const [showcom, setShowcom] = useState(10);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/40"
  );

  // ✅ Fetch comments live from Firebase
  useEffect(() => {
    if (!id) return;
    const commentsRef = ref(db, `/Comments/${id}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const loadedComments = Object.values(snapshot.val())
          .sort((a, b) => b.time - a.time)
          .slice(0, showcom);
        setComments(loadedComments);
      } else {
        setComments([]);
      }
    });
    return () => unsubscribe();
  }, [db, id, showcom]);

  // ✅ Push new comment
  const handleSend = () => {
    if (input.trim() === "") return;
    const commentsRef = ref(db, `/Comments/${id}`);
    push(commentsRef, {
      message: input,
      username,
      profile_picture: profilePicture,
      uid: "anonymous", // you can replace with real UID if you add auth
      time: Date.now(),
    });
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full mx-auto p-6 border rounded-2xl bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Comments</h2>

      {/* Comment Input */}
      <div className="flex items-start mb-6 space-x-3">
        <img
          src={profilePicture}
          alt="profile"
          className="w-11 h-11 rounded-full border shadow-sm"
        />
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write a comment..."
            rows={1}
            className="w-full resize-none border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-gray-50"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <IoIosSend/>
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-5 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3">
              <img
                src={comment.profile_picture || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                className="w-10 h-10 rounded-full border shadow-sm"
              />
              <div className="flex-1 bg-gray-50 p-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    {comment.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(comment.time)}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{comment.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {comments.length >= showcom && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowcom(showcom + 10)}
            className="text-blue-500 hover:underline"
          >
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
