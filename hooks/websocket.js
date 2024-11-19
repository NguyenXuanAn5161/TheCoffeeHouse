import { useEffect, useState } from "react";

// Hàm khởi tạo và quản lý WebSocket
export const useWebSocket = (userId, onMessageReceived) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const URL = `ws://192.168.1.187:8082/order-status?userId=${userId}`;
    const ws = new WebSocket(URL);

    // Khi kết nối thành công
    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket đã kết nối thành công");
    };

    // Khi nhận được tin nhắn từ server
    ws.onmessage = (event) => {
      console.log("Nhận thông báo:", event.data);
      if (onMessageReceived) {
        // Gọi callback khi nhận được thông báo mới
        onMessageReceived(event.data); // Chuyển đổi chuỗi JSON thành object
      }
    };

    // Khi kết nối bị đóng
    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket đã bị đóng");
    };

    // Khi có lỗi xảy ra
    ws.onerror = (error) => {
      console.log("WebSocket gặp lỗi:", error);
      alert("WebSocket gặp lỗi");
    };

    // Lưu kết nối WebSocket vào state
    setSocket(ws);

    // Đóng kết nối khi component bị unmount
    return () => {
      ws.close();
    };
  }, [userId]);

  return { socket, isConnected };
};
