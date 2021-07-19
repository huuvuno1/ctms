window.onload = () => {
    document.getElementById('checked_file').innerText = localStorage.getItem('checked_file')
    fetch("https://sa2.vinlp.com/api/v1.0/review?search=&order=asc&offset=0&limit=25&type=2&cat=all&revstatus=all", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://sa2.vinlp.com/review-annotation",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    }).then(response => response.json())
    .then(data => {
        document.getElementById('total').innerText = data.total;
    });
}

