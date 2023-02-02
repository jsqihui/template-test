const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author-text');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function getNewQuote() {
     showLoader();
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     if (!quote.author) {
        authorText.textContent = 'Unknown'
     } else {
        authorText.textContent = quote.author;
     }
     if (quote.text.length > 50) {
        quoteText.classList.add('long-quote-text')
     } else {
        quoteText.classList.remove('long-quote-text')
     }
     quoteText.textContent = quote.text;
     hideLoader();
}

async function getQuotesFromApi() {
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        getNewQuote();
        hideLoader()
    } catch (error) {
        console.log(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteButton.addEventListener('click', getNewQuote);
twitterButton.addEventListener('click', tweetQuote);
// On Load
getQuotesFromApi();