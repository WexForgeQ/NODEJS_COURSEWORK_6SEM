import React, { useEffect, useState } from "react";
import { send_prompt_icon, filter_button_icon, repeat_icon } from "../../../../assets/icons/services/chagall";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
export const BoxerHelp = () => {
    const [socket, setSocket] = useState("")
    const [showFilter, setShowFilter] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch();
    const [me, setMe] = useState("")
    const [client, setClient] = useState("");
    const user_role = useSelector(state => state.authData.user_role)

    useEffect(() => {
    if(user_role == 0){
        setMe("admin");
        const newSocket = new WebSocket('wss://localhost:5000/reviewsocket');
        setSocket(newSocket)
            newSocket.onopen = () => {
                newSocket.send(JSON.stringify({ 
                message: "Соединение с клиентами открыто",
                userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                sender: localStorage.getItem("USERID"),
                receiver: client,
                role: "admin"
          }));
          setMessages((prevMessages) => [...prevMessages, { 
            message: `Соединение с клиентом открыто`,
            userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
            sender: localStorage.getItem("USERID"),
            receiver: client,
            role: "admin"}]);
        };
        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setClient(messageData.sender)
            setMessages((prevMessages) => [...prevMessages, messageData])
          };
      
        newSocket.onclose = () => {
          console.log('WebSocket соединение закрыто.');
        };
        return () => {
          newSocket.close();
        };
    }
    else{
        setMe("client");
        const newSocket = new WebSocket('wss://localhost:5000/reviewsocket');
        setSocket(newSocket)
            newSocket.onopen = () => {
                newSocket.send(JSON.stringify({ 
                message: "Соединение с техподдержкой открыто",
                userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                sender: localStorage.getItem("USERID"),
                receiver: 1,
                role: "client"
          }));
          setMessages((prevMessages) => [...prevMessages, { 
            message: `Соединение с техподдержкой открыто`,
            userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
            sender: localStorage.getItem("USERID"),
            receiver: 1,
            role: "client"}]);
            console.log(messages);
        };
        newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, messageData])
          };
      
        newSocket.onclose = () => {
          console.log('WebSocket соединение закрыто.');
        };
        return () => {
          newSocket.close();
        };
    }
        
        
        
      }, []);

    const sendPrompt = () => {
        console.log(user_role);
        if (inputValue) {
            if(user_role == 0){
                if(inputValue.includes("|")){
                    const msg = inputValue.split("|")[1];
                    const receiver = inputValue.split("|")[0];
                    socket.send(JSON.stringify({ 
                        message: msg,
                        userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                        sender: localStorage.getItem("USERID"),
                        receiver: receiver,
                        role: "admin"}))
                    setMessages((prevMessages) => [...prevMessages, { 
                        message: msg,
                        userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                        sender: localStorage.getItem("USERID"),
                        receiver: receiver,
                        role: "admin"}]);
                    setInputValue("");
                }
                else{
                    enqueueSnackbar("Вы не ввели id пользователя", "default")
                }

            }
            else{
                socket.send(JSON.stringify({ 
                    message: inputValue,
                    userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                    sender: localStorage.getItem("USERID"),
                    receiver: 1,
                    role: "client"}))
                setMessages((prevMessages) => [...prevMessages, { 
                    message: inputValue,
                    userToken: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN),
                    sender: localStorage.getItem("USERID"),
                    receiver: 1,
                    role: "client"}]);
                    console.log(messages);
                setInputValue("");
            }
            
        }
    }
    


    const inputKeyHandle = (e) => {
        if (e.key === "Enter") {
            sendPrompt();
        }
    }


    return (
        <div className="boxer-service-home">
            <div className="boxer-service-home-container">
                <div className="boxer-service-home-chat">
                    <div className="boxer-service-home-chat-messages">
                        <div className="boxer-service-home-chat-messages-container">
                            {messages?.map((msg, index) => {
                                return msg.role === me
                                    ? <div className="user-message-container" key={index}>
                                        <div className="user-message-container-message">
                                            {msg.message}
                                        </div>
                                    </div>
                                    : <div className="bot-message-container" key={index}>
                                        <div className="bot-message-container-message">
                                            {msg.role != "admin" && msg.role != "server" ?
                                            <>{`Client ID:${msg.receiver}/${msg.message}`}</> :
                                            <>{msg.message}</>
                                            }
                                            
                                        </div>
                                    </div>
                            })}
                        </div>
                    </div>
                    <div className="boxer-service-home-chat-input">
                        <div className="boxer-service-home-chat-input-input" >
                            <input value={inputValue} id={"prompt-input"} onKeyDown={inputKeyHandle} onChange={(e) => setInputValue(e.target.value)} type={"text"} placeholder="Введите сообщение" />
                        </div>
                        <div className="boxer-service-home-chat-input-send-button">
                            <img src={send_prompt_icon.svg_icon} alt={send_prompt_icon.alt_prop}
                                onClick={sendPrompt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}