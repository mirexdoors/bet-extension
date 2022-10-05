const btn = document.getElementById('start')

const setAction = () => {
    console.log(1111)
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)  => {
        console.log(222, tabs)
        chrome.tabs.sendMessage(tabs[0].id, 'payload!!!');
    });
}

btn.addEventListener('click', setAction)
