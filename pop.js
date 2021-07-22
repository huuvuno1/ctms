var dataResponse;
var loadHtml = `<img style="width: 18px; height: 18px;" src="loading.gif" alt="">`;

window.onload = () => {
    

    fetch("https://sa2.vinlp.com/api/v1.0/review?search=&limit=1000000&order=asc&offset=0&type=2&cat=all&revstatus=all", {
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
        document.getElementById('checked_for_others').innerText = data.total;
        dataResponse = data.rows;
    });



    fetch("https://sa2.vinlp.com/api/v1.0/annotation/listing?user_id=97&limit=20000&offset=0", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"91\", \"Chromium\";v=\"91\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://sa2.vinlp.com/annotation",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        }).then(response => response.json())
        .then(data => {
            console.log(data.data)
            let file_accept = 0, file_reject = 0, file_untested = 0;
            for (d of data.data) {
                if (d.status == 11)
                    file_untested++;
                else if (d.status == 12)
                    file_accept++;
                else if (d.status == 13)
                    file_reject++;
            }
            document.getElementById('file_accept').innerText = file_accept;
            document.getElementById('file_reject').innerText = file_reject;
            document.getElementById('file_untested').innerText = file_untested;
        });


        document.getElementById('txtSearch').addEventListener('input', () => {
            let eCount = document.getElementById('count_checked_file_user');
            let value = document.getElementById('txtSearch').value;
            if (value == '') {
                eCount.innerText = 0;
                return;
            }
            eCount.innerHTML = loadHtml;
            let count = 0;
            for (d of dataResponse) {
                if (d.user_name == value)
                    count ++;
            }
            if (count != 0)
                eCount.innerText = count;
        })
}

function search(value) {
    console.log(value)
}