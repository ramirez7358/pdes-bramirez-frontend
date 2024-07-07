export const getErrorMessage = ({ code, message, response }) => {
  switch (code) {
    case "ERR_NETWORK":
      return message;
    case "ERR_BAD_REQUEST":
      return response?.data?.message;
    default:
      return "Error not recognized.";
  }
};
