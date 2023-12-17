import DashBoardTemplate from "@/components/template/DashBoardTemplate";
import useAuthState, { authState } from "@/store/AuthState";
import env from "@/utils/env";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Stack, TextField } from "@mui/material";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { Message, User } from "@/utils/types";
import { useEffect, useState } from "react";

const socket = io(env.BASE_URL, {
  withCredentials: true,
  auth: {
    token: authState.getState().token,
  },
  autoConnect: false,
});

const SOCKET_EVENTS = {
  USER_CONNECTED: "USER_CONNECTED",
} as const;

const DashBoardPage = () => {
  const { user } = useAuthState();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.connect();
    socket.on("connection", () => {
      toast.success("Connected");
    });
    socket.on(SOCKET_EVENTS.USER_CONNECTED, (data: User) => {
      if (user || user?._id === data._id) return;
      toast.success(`${data.name} connected`);
    });
    socket.on("message", (data: Message) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });
    socket.on("errr", (err) => {
      console.log(err);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <DashBoardTemplate>
      <Stack height="92dvh" p={2}>
        <Stack flex={1} overflow="auto">
          <>
            {messages.map((message, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent={
                  message.userId == user?._id ? "flex-end" : "flex-start"
                }
              >
                <Stack
                  sx={{
                    background: "#e7e5e5",
                    p: 1,
                    borderRadius: "0 10px 10px 10px",
                  }}
                >
                  {message.message}
                </Stack>
              </Stack>
            ))}
          </>
        </Stack>
        <Stack direction="row" component="form" onSubmit={sendMessage}>
          <TextField
            label="Enter Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </Stack>
    </DashBoardTemplate>
  );
};

export default DashBoardPage;
