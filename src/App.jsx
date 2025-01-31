import { Ollama } from "ollama";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import ChatComponent from "./components/Chat";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo perkenalkan nama Saya DeepSeek, Ayo mulai ngobrol...",
    },
  ]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChat = async (event) => {
    event.preventDefault();
    const question = event.target.question.value;
    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setMessages([
      ...newMessages,
      { role: "assistant", content: "DeepSeek sedang memproses ..." },
    ]);
    setInputMessage("");
    const deepseek = new Ollama({ host: apiUrl });
    const response = await deepseek.chat({
      model: "deepseek-r1:7b",
      messages: [{ role: "user", content: question }],
    });
    setMessages([...newMessages, response.message]);
  };
  return (
    <div className="bg-slate-100 min-h-screen py-1 text-sm">
      <div className="py-10">
        <h1 className="text-center text-2xl font-bold my-2">
          DeepSeek Chatbot
        </h1>
        <p className="text-center text-sm my-2">
          Ini adalah chatbot DeepSeek R1 yang dibuat dengan React JS dan
          TailwindCSS <br />
          API DeepSeek diperoleh dari akun YouTube: <br />
          <a
            href="https://www.youtube.com/@deaafrizal"
            className="text-sky-500"
            target="_blank"
          >
            https://www.youtube.com/@deaafrizal
          </a>
        </p>
      </div>
      <div className="container md:w-2/3 mx-auto p-2 rounded-lg bg-white">
        <div className="min-h-80 h-auto flex-col w-full mx-auto mb-2">
          <div className="flex flex-col gap-1 flex-1 min-h-72 w-full py-2">
            <ChatComponent messages={messages} />
          </div>
          <form
            className="flex justify-center gap-0"
            onSubmit={handleChat}
            autoComplete="off"
          >
            <input
              className="w-full outline-none border-2 border-indigo-600 rounded-s-lg py-4 px-4"
              rows={1}
              name="question"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Bertanya disini ..."
            />
            <button
              className="flex items-center gap-1 bg-indigo-500 text-white rounded-e-lg px-4 cursor-pointer font-bold hover:bg-indigo-600"
              type="submit"
            >
              Kirim <MdSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
