/**
 * Chuyển đổi timestamp thành giờ theo định dạng HH:mm
 * @param {number} timestamp - Thời gian theo định dạng timestamp (miliseconds)
 * @returns {string} - Thời gian định dạng HH:mm
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);

  // Lấy giờ và phút
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng giờ và phút (HH:mm)
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
