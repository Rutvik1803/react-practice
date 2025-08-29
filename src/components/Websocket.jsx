import React, { useEffect, useState } from 'react';

function WebSocketExample() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    // connect to websocket server
    const ws = new WebSocket('wss://echo.websocket.org'); // public echo server
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server ✅');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessages((prev) => [...prev, `Server: ${event.data}`]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected ❌');
    };

    return () => ws.close(); // cleanup
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div>
      <h2>WebSocket Chat Example</h2>
      <div
        style={{
          border: '1px solid gray',
          padding: '10px',
          height: '200px',
          overflowY: 'auto',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default WebSocketExample;
