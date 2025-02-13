// components/ChatInterface.tsx
import DashboardLayout from '@/layouts/dashboard';
import { useState } from 'react';

const ChatBubble = ({ message, isUser }: { message: string; isUser?: boolean }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-lg p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            {message}
        </div>
    </div>
);

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { message: 'Do androids truly dream of electric sheep?', isUser: true },
        { message: 'The question of whether androids dream of electric sheep...', isUser: false },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { message: input, isUser: true }]);
        setInput('');

        setTimeout(() => {
            setMessages((prev) => [...prev, { message: "Let's say it does - what happens then?", isUser: false }]);
        }, 1000);
    };

    return (
        <DashboardLayout>

            <div className="p-6 max-w-5xl  h-full overflow-auto w-full">
                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">Chat Bot</h1>


                </div>

                <div className="flex flex-col h-full w-full p-2 bg-gray-100 rounded-lg shadow-md">

                    <div className="flex-1 overflow-auto mb-2">
                        {messages.map((msg, index) => (
                            <ChatBubble key={index} message={msg.message} isUser={msg.isUser} />
                        ))}
                    </div>
                    <div className="flex items-center border-gray-300 mb-9 ">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none"
                            placeholder="Message QIT..."
                        />
                        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChatInterface;
