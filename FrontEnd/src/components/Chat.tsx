import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

declare const SockJS: any;
declare const Stomp: any;

interface ChatMessage {
  sender: string;
  content: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}

const colors = [
  "#8e44ad", // purple
  "#e67e22", // orange
  "#16a085", // teal
  "#d35400", // dark orange
  "#2980b9", // blue
  "#c0392b", // red
  "#2c3e50", // dark blue-grey
  "#f39c12", // yellow
];

const Chat: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const [username, setUsername] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${matchId}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [messageInput, setMessageInput] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const stompClientRef = useRef<any>(null);
  const messageAreaRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    localStorage.setItem(`chatMessages_${matchId}`, JSON.stringify(messages));
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages, matchId]);

  const connect = (event: React.FormEvent) => {
    event.preventDefault();
    const name = (document.querySelector("#name") as HTMLInputElement)?.value.trim();
    if (name) {
      setUsername(name);
      setIsConnecting(true);
      const socket = new SockJS("https://7eac-5-2-197-133.ngrok-free.app/ws");
      stompClientRef.current = Stomp.over(socket);
      stompClientRef.current.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClientRef.current.subscribe(`/topic/match/${matchId}`, onMessageReceived);
    stompClientRef.current.send("/app/chat.addUser", {}, JSON.stringify({ sender: name, type: "JOIN", matchId }));
    setIsConnecting(false);
  };

  const onError = () => {
    setConnectionError("Could not connect to WebSocket server. Please refresh to try again!");
    setIsConnecting(false);
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const content = messageInput.trim();
    if (content && stompClientRef.current) {
      const chatMessage: ChatMessage = { sender: username!, content, type: "CHAT" };
      stompClientRef.current.send(`/app/chat.sendMessage/${matchId}`, {}, JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  const onMessageReceived = (payload: any) => {
    const message: ChatMessage = JSON.parse(payload.body);
    setMessages((prev) => [...prev, message]);
  };

  const getAvatarColor = (messageSender: string): string => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages_${matchId}`);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center p-0"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #BDC3C7 0%, #2980B9 100%)", // gradient from grey to blue
      }}
    >
      {!username ? (
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "16px",
          }}
        >
          <h2 className="text-center mb-4 text-dark">
            Join Match Chat <span className="text-primary">{matchId}</span>
          </h2>
          <form onSubmit={connect}>
            <div className="mb-3">
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enter Chat
            </button>
          </form>
        </div>
      ) : (
        <div
          className="card shadow-lg"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "650px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div className="card-header text-center bg-light border-bottom">
            <h4 className="mb-0 text-primary">Match Chat {matchId}</h4>
          </div>
          {isConnecting && (
            <div className="text-center py-2 text-muted">Connecting...</div>
          )}
          {connectionError && (
            <div className="text-center py-2 text-danger">
              {connectionError}
            </div>
          )}
          <ul
            ref={messageAreaRef}
            className="list-unstyled px-3 py-2 mb-0"
            style={{ height: "calc(100% - 160px)", overflowY: "auto" }}
          >
            {messages.map((message, index) => (
              <li
                key={index}
                className={`py-2 ${message.type === "CHAT" ? "d-flex" : "text-center"}`}
                style={{ borderBottom: "1px solid #f4f4f4" }}
              >
                {message.type === "JOIN" || message.type === "LEAVE" ? (
                  <p className="text-muted mb-0">
                    {message.sender} {message.type === "JOIN" ? "joined!" : "left!"}
                  </p>
                ) : (
                  <>
                    <div
                      className="rounded-circle text-white text-center me-3"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: getAvatarColor(message.sender),
                        lineHeight: "42px",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}
                    >
                      {message.sender[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="fw-semibold text-dark">{message.sender}</span>
                      <p className="mb-0 text-secondary">{message.content}</p>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage} className="p-3 bg-light border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary ms-2">
                Send
              </button>
              <button
                type="button"
                className="btn btn-outline-danger ms-2"
                onClick={clearChatHistory}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
