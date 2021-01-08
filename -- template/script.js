const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading

    function loading() {
        loader.hidden = false;
        quoteContainer.hidden = true;
}

// HIDE LOADING
    function complete() {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }


// Show New Quote
function newQuote() {
    loading();
    
    // Pick a Random Quote From APi Quotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    
    // Check If Author Field Is Blank and replace with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent =quote.author;
    }


    //  Check the quote length to determine styling
if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}

// SET THE QUOTE AND HIDE LOADER
quoteText.textContent = quote.text;
complete();
}




// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error here
    }
}





// Tweet a quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
    // _blank allows twitter to open in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();





