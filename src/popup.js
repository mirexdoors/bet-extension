const btn = document.getElementById('start')

const changeBtn = (msg) => {
    if (msg && msg.signal === "processing") {
        btn.innerText = 'processing'
        btn.disabled = true
    } else if (msg && msg.signal === "fail") {
        btn.innerText = 'try again later'
        btn.disabled = false
    }
}

const setAction = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'start', changeBtn);
    });
}

chrome.runtime.onMessage.addListener(msg => {
    if (msg && msg.signal === 'start') {
        setAction()
    }

    if (msg && msg.signal === "processing") {
        btn.innerText = 'processing'
        btn.disabled = true
    }

    if (msg && msg.signal === "fail") {
        btn.innerText = 'try again later'
        btn.disabled = false
    }
})

btn.addEventListener('click', setAction)
