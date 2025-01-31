const ChatComponent = (props) => {
  const { messages } = props;
  return messages.map((message, index) => {
    const role = message.role;
    return (
      <div
        key={index}
        className={`flex gap-1 w-3/4 ${
          role === "user" ? "self-start" : "self-end"
        } `}
      >
        <img
          className={`mt-1 w-10 h-10 object-cover rounded-full border border-slate-200 shadow ${
            role === "user" ? "order-0" : "order-1"
          }`}
          src={`${
            role === "user"
              ? "https://i.pravatar.cc/300"
              : "https://img.cryptorank.io/coins/deep_seek1737979405027.png"
          }`}
          alt="Avatar"
        />
        <div
          className={`w-full my-1 ${
            role === "user"
              ? "bg-slate-200 rounded-bl-xl rounded-e-xl"
              : "bg-indigo-500 text-white rounded-br-xl rounded-s-xl"
          } px-4 py-4 shadow`}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/<think><\/think>/g, "<br/>")
                .replace(/\*\*(.*?)\*\*/g, "<span class='font-bold'>$1</span>"),
            }}
          />
        </div>
      </div>
    );
  });
};

export default ChatComponent;
