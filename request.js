const requestQuote = async () => {
  const response = await fetch("https://type.fit/api/quotes");
  const data = await response.json();
  return data;
};
