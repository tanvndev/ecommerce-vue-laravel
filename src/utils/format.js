const formatMessages = (messages) => {
  const formattedMessages = [];
  for (const key in messages) {
    formattedMessages.push(Array.isArray(messages[key]) ? messages[key][0] : messages[0]);
  }
  return formattedMessages;
};

export { formatMessages };
