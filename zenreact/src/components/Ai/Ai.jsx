import React, { useState, useRef, useEffect } from "react";
import { TiLocationArrow, TiThMenu, TiTimes } from "react-icons/ti";
import { FaRobot, FaUser } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Api from "../../Api/BaseApi";
const Ai = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Greetings, Traveler. I am ZenAI. How may I guide you through the digital realm?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const chatContainerRef = useRef(null);
  const userContext = `age:15 
name:harsh
location:indore
education background:10th
hobbies:reading books, playing cricket,
loves science and technology also like filosphy`;
  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GSAP Animation for new messages
  useGSAP(() => {
    const lastMessage =
      chatContainerRef.current?.lastElementChild?.previousElementSibling; // Adjust selector as needed
    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [messages]);

  // Initial Entry Animation
  useGSAP(
    () => {
      gsap.from(".ai-sidebar", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".ai-chat-area", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });
    },
    { scope: containerRef }
  );

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await Api.post("/ai/text", {
        userContext: userContext,
        task: input,
      });

      const aiContent =
        response.data?.reply ||
        response.data?.result ||
        response.data?.message ||
        "I received your message, but the server response format was unexpected.";

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I apologize, but I encountered an error connecting to the server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#dfdff0] pt-28 pb-4 px-4 md:px-10 overflow-hidden font-general"
    >
      <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/40 bg-white/20 shadow-2xl backdrop-blur-xl">
        {/* Sidebar - Desktop */}
        <div
          className={`ai-sidebar hidden md:flex w-64 flex-col justify-between border-r border-white/20 bg-white/40 p-5`}
        >
          <div>
            <h2 className="mb-6 font-zentry text-3xl uppercase text-black/80">
              History
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setMessages([])}
                className="group relative flex items-center justify-between rounded-xl bg-violet-300 px-4 py-3 text-white shadow-md transition-all hover:bg-violet-400 hover:scale-105 active:scale-95"
              >
                <span className="font-bold uppercase tracking-wider text-xs">
                  New Chat
                </span>
                <TiLocationArrow className="text-lg" />
              </button>
              {/* Dummy History */}
              <div className="mt-4 flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="cursor-pointer truncate rounded-lg p-3 text-sm font-medium text-gray-600 transition-colors hover:bg-white/60 hover:text-black"
                  >
                    Previous Session 0{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-xs font-medium text-gray-400 font-circular-web">
            ZenAI v1.0
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-[#dfdff0] p-6 shadow-2xl transition-transform duration-300 ease-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-zentry text-3xl uppercase text-black">
                History
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-full p-1 hover:bg-black/5"
              >
                <TiTimes className="text-2xl" />
              </button>
            </div>
            {/* Mobile History Content */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMessages([]);
                  setIsSidebarOpen(false);
                }}
                className="w-full rounded-xl bg-violet-300 p-3 text-center text-white font-bold uppercase text-xs shadow-md"
              >
                New Chat
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="ai-chat-area flex flex-1 flex-col relative bg-transparent">
          {/* Header Mobile */}
          <div className="flex items-center justify-between border-b border-white/10 p-4 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md p-1 hover:bg-white/20"
            >
              <TiThMenu className="text-2xl text-black" />
            </button>
            <div className="font-zentry text-2xl uppercase tracking-wider">
              ZenAI
            </div>
            <div className="w-8" /> {/* Spacer */}
          </div>

          <div
            className="relative flex-1 overflow-y-auto p-4 md:p-8"
            ref={chatContainerRef}
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-6 pb-4">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3 md:gap-4 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm md:h-10 md:w-10 ${
                      msg.role === "assistant"
                        ? "bg-black text-white"
                        : "bg-violet-300 text-white"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <FaRobot className="text-sm md:text-base" />
                    ) : (
                      <FaUser className="text-xs md:text-sm" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`message-bubble relative max-w-[85%] rounded-2xl px-5 py-3 shadow-sm md:max-w-[75%] ${
                      msg.role === "assistant"
                        ? "bg-white/80 text-gray-800 rounded-tl-none border border-white/50"
                        : "bg-violet-300 text-white rounded-tr-none"
                    }`}
                  >
                    <p className="leading-relaxed text-sm md:text-[15px] font-medium">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:px-8 md:pb-6">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-[2rem] border border-white/50 bg-white/40 p-2 pl-6 shadow-lg backdrop-blur-md ring-1 ring-white/20 transition-all focus-within:bg-white/60 focus-within:ring-violet-300/50">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask ZenAI..."
                rows={1}
                className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-3 text-gray-800 placeholder-gray-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="group mb-1 mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-black shadow-md transition-all hover:scale-110 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-yellow-300"
              >
                <TiLocationArrow className="text-xl transition-transform group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;
