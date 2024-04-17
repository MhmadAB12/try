document.getElementById('searchButton').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const searchType = document.getElementById('searchType').value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { url, searchType }, (response) => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
  
        if (response.results.length > 0) {
          response.results.forEach((result) => {
            const resultElement = document.createElement('div');
            resultElement.textContent = result;
            resultsDiv.appendChild(resultElement);
          });
        } else {
          resultsDiv.textContent = 'No results found';
        }
      });
    });
  });