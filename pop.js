document.getElementById('re').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({
        url: 'https://www.facebook.com/VuWtf/'
    });
})

