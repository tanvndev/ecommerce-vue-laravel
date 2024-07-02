const formatMessages = (messages) => {
  if (messages && typeof messages === 'string') {
    return [messages];
  }

  const formattedMessages = [];
  for (const key in messages) {
    formattedMessages.push(Array.isArray(messages[key]) ? messages[key][0] : messages[0]);
  }
  return formattedMessages;
};

const formatDataToSelect = (data, value = 'id', label = 'name') => {
  const formattedData = [];
  data.forEach((item) => {
    formattedData.push({ label: item[label], value: item[value] });
  });
  return formattedData;
};

export { formatMessages, formatDataToSelect };
