import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";
function forms(timeoutOpenModal) {
    // отправка данных на сервер

    const forms = document.querySelectorAll('form');
    forms.forEach(e => {
        bindPostData(e);
    });



    function bindPostData(form) {
        form.addEventListener("submit", element => {
            element.preventDefault();
            let message = {
                loading: "img/form/spinner.svg",
                success: "отправлено",
                failure: "ошибка"
            };
            let statusMessage = document.createElement("img");

            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
            //form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);
            // statusMessage.classList.add('status');
            // statusMessage.textContent = message.loading;
            // form.appendChild(statusMessage);
            const formData = new FormData(form);

            // let jsonRequest = {};
            // formData.forEach((item, key) => {
            //     jsonRequest[key] = item;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                    console.log("Fail");
                }).finally(() => {
                    form.reset();
                });

            // const request = new XMLHttpRequest();
            // request.open("POST", "server.php");
            // request.setRequestHeader("Content-type", 'applcaton/json');



            // let jsonRequest = {};
            // formData.forEach((item, key) => {
            //     jsonRequest[key] = item;
            // });    
            //request.send(JSON.stringify(jsonRequest));

            // request.addEventListener("load", () => {
            //     if (request.status == 200) {
            //         console.log(request.response);
            //         showThanksModal();
            //         statusMessage.textContent = message.success;
            //         form.reset();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 2000);
            //         //setTimeout(closeModal, 1000);
            //     } else {
            //         statusMessage.textContent = message.failure;
            //         form.append(statusMessage);
            //         console.log("Fail");
            //     }
            // });
        }

        );
    }


    function showThanksModal(messageText) {
        let previousModal = document.querySelector(".modal__content");
        previousModal.classList.add("hide");
        openModal(".modal", timeoutOpenModal);
        let thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__content");
        thanksModal.innerHTML = `
<form action="#">
<div class="modal__close">&times;</div>
<div class="modal__title">${messageText}</div>
</form>
`;
        document.querySelector(".modal .modal__dialog").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModal.classList.remove("hide");
            previousModal.classList.add("show");
            closeModal(".modal");
        }, 3000);
    }

}
export default forms;