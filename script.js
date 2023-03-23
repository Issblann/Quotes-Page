const body = document.querySelector("body");
const containerPrincipal = document.querySelector(".container-principal");
const containerQuotes = document.querySelector(".container-quotes");
const containerAuthor = document.querySelector(".container-author");
const containerLoader = document.querySelector(".container-loader");
const buttonQuote = document.querySelector(".button-quote");
let indiceText = 0;
let indiceAuthor = 0;

const getData = async () => {
  const quotesAndAuthors = await requestQuote();
  const quoteTexts = quotesAndAuthors.map((quote) => `"${quote.text}"`);
  const quoteAuthor = quotesAndAuthors.map((author) => `-${author.author}`);
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

      containerQuotes.innerHTML = quoteTexts[indiceText];
      indiceText++;
      if (indiceText >= quoteTexts.length) {
        indiceText = 0;
      }

      containerAuthor.innerHTML = quoteAuthor[indiceAuthor];
      indiceAuthor++;
      if (indiceAuthor >= quoteAuthor.length) {
        indiceAuthor = 0;
      }
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
