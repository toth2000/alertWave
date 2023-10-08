const parseData = (response) => {
  try {
    const data = response["Global Quote"];
    const symbol = data["01. symbol"];
    const high = data["03. high"];
    const low = data["04. low"];
    const price = data["05. price"];
    const change = data["09. change"];

    return {
      symbol,
      high,
      low,
      price,
      change,
    };
  } catch (error) {
    console.error("Error in parseData util: ", error);
    return null;
  }
};

module.exports = { parseData };