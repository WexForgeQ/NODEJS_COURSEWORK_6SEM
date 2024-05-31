import { SOCKET_ACTIONS } from "../../../consts/actions/ws";
import { wsRequestGroupDetector } from "../../../utils";

let URL = "";
let socket = null;

const connectSocket = () => ({
    type: SOCKET_ACTIONS.CONNECT_SOCKET,
});

const disconnectSocket = () => ({
    type: SOCKET_ACTIONS.DISCONNECT_SOCKET,
});

const receiveMessage = (message) => ({
    type: SOCKET_ACTIONS.RECEIVE_MESSAGE,
    payload: message,
});

const prevRequest = (message) => ({
    type: SOCKET_ACTIONS.PREVIOUS_REQUEST,
    payload: message,
})

const loading = (payload) => ({
    type: SOCKET_ACTIONS.LOADING,
    payload: payload,
})

const setRequestData = (payload) => ({
    type: SOCKET_ACTIONS.SET_REQUEST_DATA,
    payload: payload,
})

export const sendMessage = (message = { action: "", data: {} }) => dispatch => {
    dispatch(loading(true));
    dispatch(prevRequest(message));
    const msg = structuredClone(message);
    msg.access = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(msg));
    }
}

export const startListening = (url) => (dispatch) => {
    URL = url;
    socket = new WebSocket(URL);
    socket.binaryType = 'blob';
    if (socket.readyState === 0) {
        setTimeout(() => {
            if (socket.readyState === 0) {
                socket.close();
            }
        }, 3000)
    }

    socket.onopen = (e) => {
        dispatch(connectSocket());
    }

    socket.onmessage = async (e) => {
        const response = JSON.parse(e.data);
        dispatch(receiveMessage(response.data));
        dispatch(setRequestData({
            group: wsRequestGroupDetector(response.action),
            action: response.action,
            status: response.status
        }));
        dispatch(loading(false))
    }

    socket.onclose = (e) => {
        dispatch(disconnectSocket());
        setTimeout(() => dispatch(startListening(URL)), 4000);
    }

    socket.onerror = (error) => {
        console.log(error);
    }
};
