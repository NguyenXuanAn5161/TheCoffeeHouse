import dayjs from "dayjs";

/**
 * Chuyển đổi timestamp thành giờ và ngày theo định dạng HH:mm DD/MM/YYYY
 * @param {number} timestamp - Thời gian theo định dạng timestamp (miliseconds)
 * @returns {string} - Thời gian định dạng HH:mm DD/MM/YYYY
 */
export const formatTime = (timestamp) => {
  return dayjs(timestamp).format("HH:mm DD/MM/YYYY");
};
