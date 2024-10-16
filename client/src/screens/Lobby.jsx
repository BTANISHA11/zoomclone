import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate an asynchronous task, like a server request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lobby</h1>
      <form onSubmit={handleSubmitForm} className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold mb-1">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full transition duration-300 focus:outline-none focus:border-blue-500"
        />
        <br />
        <label htmlFor="room" className="block text-sm font-semibold mb-1 mt-2">
          Room Number
        </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border p-2 w-full transition duration-300 focus:outline-none focus:border-blue-500"
        />
        <br />
        <button
          className={`bg-blue-500 text-white py-2 px-4 mt-4 transition duration-300 ${
            isLoading ? "cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Joining..." : "Join"}
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;