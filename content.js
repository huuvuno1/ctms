localStorage.setItem('fileNumber', 0);


if (window.location.pathname == "/annotation") {
    var boot = document.createElement('button');
    boot.classList.add('btnvin');
    boot.innerText = "fill";

    var parent = document.querySelector('#main-segment-form > div > center:nth-child(1)');
    boot.addEventListener('click', () => {
        document.querySelector('#trans-dialect > option:nth-child(1)').selected = true;
        document.querySelector('#trans-env > option:nth-child(1)').selected = true;
        document.querySelector('#trans-age > option:nth-child(1)').selected = true;
        document.querySelector('#trans-emotion > option:nth-child(1)').selected = true;
    })
    parent.appendChild(boot);

    document.querySelector('#save-for-review').addEventListener('click', () => {
        let fileNumber = localStorage.getItem('fileNumber');
        localStorage.setItem('fileNumber', parseInt(fileNumber) + 1);
    })
    
}


document.querySelector('body').addEventListener('keydown', (e) => {
    if (e.key == "Escape") {
        var esc = document.querySelector("#close-segment-form");
        esc.click();
        esc = document.querySelector("#next-without-save");
        esc.click();
    }

    if (e.key == 3) {
        document.querySelector("#main-segment-form > div > center:nth-child(1) > button.btnvin").click();
    }

    if (e.key == 4) {
        document.querySelector('#toggle-audio-btn').click();
    }

    if (e.key == 1) {
        var audio = document.querySelector('#waveform > audio');
        audio.currentTime -= 3;
    }
})


if (window.location.pathname == "/review-annotation") {
    
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-sm', 'btn-danger');
    button.innerText = 'Bắt đầu auto';
    button.addEventListener('click', () => {
        // open page check
        document.querySelector('#btShowReviewDialog').click();
        check()
    })
    document.querySelector('body > div > div.dash-app > main > div > div.col-12 > div')
        .appendChild(button)
    
}



const check = async () => {

    // wait load html    
    await sleep(2000)
    // find list check
    let audios = document.querySelectorAll('#segments-table > tbody > tr')

    if (!audios) {
        return
    }

    let hasFileReject = false;

    for (e of audios) {
        e.querySelector('td').click();

        // check xxx
        let text = e.querySelector('#segments-table > tbody > tr.selected-row > td:nth-child(3)').innerText;

        let eStatus = e.querySelector('td:nth-child(10)');
        if (eStatus.innerText.includes('Không đạt')) {
            console.log('detect reject ', document.querySelector('#review-title').innerText);
            // click ignore
            document.querySelector('#btSkipOver').click();
            await sleep(2000);
            document.querySelector('#btSkipOverGo').click();
            check();
            return;
        }

        if (text.includes('xxx')) {
            hasFileReject = true;
            document.querySelector('#btReject').click();
        }
        else
            document.querySelector('#btApprove').click();
        
        console.log(text,"có chứa 'xxx' hay không: ", text.includes('xxx'))

        let numRd = Math.floor(Math.random() * 3) + 2; 
        await sleep(numRd * 1000);
    }

    // save
    document.querySelector('#btSubmit').click();
    await sleep(2000)

    if (hasFileReject) {
        console.log('click reject: ', document.querySelector('#review-title').innerText)
        document.querySelector('#btRejectGo').click();
    }
    else
        document.querySelector('#btApproveGo').click();


    // // update
    chrome.extension.sendMessage({
        type: 'done-check', 
        data: {}
    });

    check();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}