function searchWebsite(url, searchType) {
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
  
        let results = [];
  
        switch (searchType) {
          case 'links':
            results = Array.from(doc.querySelectorAll('a')).map((link) => link.href);
            break;
          case 'text':
            results = Array.from(doc.querySelectorAll('*')).map((element) => element.textContent);
            break;
          case 'images':
            results = Array.from(doc.querySelectorAll('img')).map((img) => img.src);
            break;
          case 'videos':
            results = Array.from(doc.querySelectorAll('video')).map((video) => video.src);
            break;
        }
  
        return results;
      })
      .catch((error) => {
        console.error('Error:', error);
        return [];
      });
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { url, searchType } = request;
  
    searchWebsite(url, searchType)
      .then((results) => {
        sendResponse({ results });
      })
      .catch((error) => {
        console.error('Error:', error);
        sendResponse({ results: [] });
      });
  
    return true; // Keep the message channel open for asynchronous response
  });