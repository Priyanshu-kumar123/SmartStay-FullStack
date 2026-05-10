import { useState, useRef, useEffect } from "react";

const responses = {
  greeting: ["hello", "hi", "hey", "namaste"],
  booking: ["book", "booking", "reserve", "reservation"],
  checkin: ["check in", "checkin", "check-in"],
  checkout: ["check out", "checkout", "check-out"],
  price: ["price", "cost", "rate", "charge", "fee", "kitna"],
  amenities: ["amenities", "facilities", "wifi", "breakfast", "pool", "gym"],
  cancel: ["cancel", "cancellation", "refund"],
  contact: ["contact", "phone", "email", "call"],
  location: ["location", "address", "where", "kahan"],
  payment: ["payment", "pay", "upi", "card", "cash"],
};

const getResponse = (msg) => {
  const lower = msg.toLowerCase();

  if (responses.greeting.some((w) => lower.includes(w)))
    return "Hello! 👋 Welcome to Smart Stay. How can I help you today?";

  if (responses.booking.some((w) => lower.includes(w)))
    return "To book a room, go to the 'Hotels' page, select your dates and click 'Check Availability'. Need more help? 😊";

  if (responses.checkin.some((w) => lower.includes(w)))
    return "Check-in time is 12:00 PM (Noon). Early check-in is available subject to room availability.";

  if (responses.checkout.some((w) => lower.includes(w)))
    return "Check-out time is 11:00 AM. For late check-out, please contact the hotel directly.";

  if (responses.price.some((w) => lower.includes(w)))
    return "Our rooms start from ₹199/night. Visit the 'Hotels' page to see exact pricing. 🏨";

  if (responses.amenities.some((w) => lower.includes(w)))
    return "Our hotels offer Free WiFi, Free Breakfast, Room Service, Pool Access and Mountain View! 🌟";

  if (responses.cancel.some((w) => lower.includes(w)))
    return "To cancel a booking, go to 'My Bookings' page. Free cancellation is available 24 hours before check-in.";

  if (responses.contact.some((w) => lower.includes(w)))
    return "You can reach us at: 📧 support@smartstay.com | 📞 +91-9999999999";

  if (responses.location.some((w) => lower.includes(w)))
    return "Smart Stay hotels are available in Dubai, Singapore, New York and London! 🌍";

  if (responses.payment.some((w) => lower.includes(w)))
    return "We accept UPI, Credit/Debit Card, and 'Pay At Hotel'. Safe & secure payments! 💳";

  return "Sorry, I didn't understand that. 😅 You can ask me about: Booking, Check-in, Check-out, Price, Amenities, Cancellation, Payment, or Location.";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! 👋 I'm Smart Stay's virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
              <p className="font-medium text-sm">Smart Stay Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white text-lg leading-none">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-72 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${msg.from === "user" ? "bg-black text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              className="flex-1 text-sm outline-none px-2 py-1.5 rounded-lg border border-gray-200"
            />
            <button onClick={sendMessage} className="bg-black text-white px-3 py-1.5 rounded-lg text-sm">
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-105 transition-all"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default Chatbot;