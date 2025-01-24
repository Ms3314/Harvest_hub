import { useState } from 'react';

interface Message {
    self : boolean ,
    message : string ,
} 

// the basic UI for the chatroom is ready 

function ChatRoom() {
    const [inputText, setInputtext] = useState<string | null>(null);
    const [message, setMessage] = useState<(Message | { self: boolean; message: null; })[]>([]);

    function setFunction(e: React.ChangeEvent<HTMLInputElement>) {
        setInputtext(e.target.value);
    }

    function handleSubmitMessage() {
        const messagedemo = {
            self: true,
            message: inputText,
        };
        setMessage((message: (Message | { self: boolean; message: null; })[]) => [...message, messagedemo]);
        localStorage.setItem("message" , JSON.stringify(message)) ;
    }


  return (
    <div className='flex flex-col w-[300px] gap-5 md:w-[600px]  lg:w-[1000px] p-2'>
      <nav className='w-full flex flex-row items-center justify-left p-5 gap-4 mt-2'>
        <div className='w-10 h-10 rounded-full bg-slate-700'></div>
        <div className='flex flex-col'>
          <h2>Halleluya farms</h2>
        </div>
      </nav>
      <div className='w-full h-[300px] lg:h-[400px] xl:h-[400px] 2xl:h-[600px] overflow-y-auto p-2 flex flex-col gap-4'>
        {/* Chat messages */}
        {/* these are how the chat message will look like  */}
            <div className='w-full flex flex-row justify-start'>
                <div className='w-52 bg-slate-300 p-2 rounded-xl'>sami</div>
            </div>
            <div className='w-full flex flex-row justify-end'>
                <div className="w-52 rounded-xl bg-blue-500 text-white p-4 break-words">
                    samissdsdsdsdsdssssssssamissdsdsdsdsdssssssssamissdsdsdsdsdsssssss
                </div>
            </div>
      </div>
      <div className='flex gap-3 justify-center'>
        <input
          onChange={(e)=>setFunction(e)}
          className='w-[300px] p-2 bg-slate-200 rounded-md'
          placeholder='message !!'
          type="text"
        />
        <button className='h-10 px-7 gap-3 bg-blue-500 text-white rounded-xl' onClick={() => handleSubmitMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;

// this will be used for showcasing the messages
const MessageBubble = ({message} : {message : Message}) => {
    if(message.self) {
        return (
            <div className='w-full flex flex-row justify-end'>
                <div className="w-52 rounded-xl bg-blue-500 text-white p-4 break-words">
                    {message.message}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='w-full flex flex-row justify-start'>
                <div className='w-52 bg-slate-300 p-2 rounded-xl'>
                    {message.message}
                </div>
            </div>
        )
    }
}