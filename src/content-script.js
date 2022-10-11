const REFRESH_COUNT = 50
const LOCAL_STORAGE_KEY = 'BET_SCRIPT_STARTING'

const btnSelector = '.fn-event-item button.fn-new-prs-reserve'
const completeReservationSelector = '#hc-modal a.fn-redirect'
const acceptSelector = 'terms'
const viewOrderSelector = 'button.fn-checkout'
const completeOrderSelector = ''


let refreshCount = localStorage.getItem(LOCAL_STORAGE_KEY);
setTimeout(() => {
    if (refreshCount < REFRESH_COUNT) {
        chrome.runtime.sendMessage({
            signal: 'start'
        })
    } else {
        chrome.runtime.sendMessage({
            signal: 'fail'
        })
        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
}, 5000)


chrome.runtime.onMessage.addListener(async (_request, _sender, response) => {
    if (!refreshCount) {
        localStorage.setItem(LOCAL_STORAGE_KEY, '1')
    }

    response({signal: 'processing'})

    /**
     * Здесь условие
     */
    const reserveBtn = document.querySelector(btnSelector)

    if (reserveBtn) {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        /**
         * reserve
         */
        await reserveBtn.click()

        /**
         * go to cart
         */
        const completeReservationLink = document.querySelector(completeReservationSelector)
        await completeReservationLink.click()

        setTimeout(async () => {
            /**
             *
             * accept order
             */
            const termsNode = document.getElementById(acceptSelector)
            termsNode.checked = true
            await termsNode.click()

            /**
             * view order
             */
            const viewOrderNode = document.querySelector(viewOrderSelector)
            await viewOrderNode.click()


            setTimeout(() => {
                /**
                 * complete order
                 **/
                const completeOrderNode = document.querySelector(completeOrderSelector)
                // completeOrderNode.click()
            }, 500)

        }, 1500)
    } else {
        const newCount = Number(refreshCount) + 1

        if (newCount < REFRESH_COUNT) {
            localStorage.setItem(LOCAL_STORAGE_KEY, String(newCount))
            document.location.reload()
        } else {
            refreshCount = 0
            localStorage.removeItem(LOCAL_STORAGE_KEY)
            chrome.runtime.sendMessage({
                signal: 'fail'
            })
        }
    }
})

