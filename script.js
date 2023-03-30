const body = document.querySelector("body");
const containerPrincipal = document.querySelector(".container-principal");
const containerQuotes = document.querySelector(".container-quotes");
const containerAuthor = document.querySelector(".container-author");
const containerLoader = document.querySelector(".container-loader");
const buttonQuote = document.querySelector(".button-quote");
let indiceText = 0;
let indiceAuthor = 0;
let quotes = [];

const getData = async () => {
  if (quotes.length === 0) {
    quotes = await requestQuote();
  }
  const quoteTexts = quotes.map((quote) => `"${quote.text}"`);
  const quoteAuthor = quotes.map((author) => `-${author.author}`);
  return { quoteTexts, quoteAuthor };
};
const showLoader = () => {
  containerLoader.classList.remove("hidden");
  containerPrincipal.classList.add("hidden");
  setTimeout(() => {
    handleGetData();
  }, 2000);
};
const handleGetData = () => {
  getData()
    .then((data) => {
      const { quoteTexts, quoteAuthor } = data;
      const randomIndex = Math.floor(Math.random() * quoteTexts.length);
      containerQuotes.innerHTML = quoteTexts[randomIndex];
      containerAuthor.innerHTML = quoteAuthor[randomIndex];
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      body.classList.add("loaded");
      containerLoader.classList.add("hidden");
      containerPrincipal.classList.remove("hidden");
    });
};

const init = () => {
  showLoader();
  buttonQuote.addEventListener("click", handleGetData);
};

init();
