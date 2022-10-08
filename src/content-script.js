// TODO
/*
1. При первом заходе необходимо ставить знак в локал сторйдж, что мы начали скрипт  +++
2. Отправлять сообщение, что скрипт запущен
3. Если есть признак в сторейдже, то рефрешим страницу N раз
 */

const REFRESH_COUNT = 5
const LOCAL_STORAGE_KEY = 'BET_SCRIPT_STARTING'

const btnSelector = '.fn-event-item button'
const completeReservationSelector = '#hc-modal a.fn-redirect'
const acceptSelector = 'terms'
const viewOrderSelector = 'button.fn-checkout'
const completeOrderSelector = ''

chrome.runtime.onMessage.addListener(async (_request, _sender, response) => {
    const refreshCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!refreshCount) {
        localStorage.setItem(LOCAL_STORAGE_KEY, '1')
    }

    /**
     * Здесь условие
     */
    const reserveBtn = document.querySelector(btnSelector)
    if (reserveBtn) {
        response({signal: 'processing'})
        return false;
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
                 */
                const completeOrderNode = document.querySelector(completeOrderSelector)
                // completeOrderNode.click()
            }, 500)

        }, 1500)
    } else {
        document.location.reload()
    }
})

