function sendResponse(type, message, data = []) {
  const response = { type, message, data };
  return response;
}

module.exports = { sendResponse };
