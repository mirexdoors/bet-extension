const btn = document.getElementById('start')

const changeBtn = (msg) => {
    if (msg && msg.signal === "processing") {
        btn.innerText = 'processing'
        btn.disabled = true
    }
}

const setAction = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'start', changeBtn);
    });
}


btn.addEventListener('click', setAction)
