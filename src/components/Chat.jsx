const ChatComponent = (props) => {
  const { messages } = props;
  return messages.map((message, index) => {
    const role = message.role;
    return (
      <div
        key={index}
        className={`w-3/4 my-1 ${
          role === "user"
            ? "bg-slate-200 p-2 self-start"
            : "bg-sky-500 text-white"
        } p-2 rounded self-end`}
      >
        <p>{message.content}</p>
      </div>
    );
  });
};

export default ChatComponent;
