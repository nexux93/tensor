const url = "https://jsonplaceholder.typicode.com",
    userUrl = "/users/1",
    postUrl = "/posts/1",
    commentUrl = "/comments/1",
    $addUserListBtn = document.getElementById("addUserElement"),
    $addPostListBtn = document.getElementById("addPostElement"),
    $addCommentsListBtn = document.getElementById("addCommentElement"),
    $gallery = document.getElementById("gallery");

$addUserListBtn.addEventListener("click", eventWatcher);
$addPostListBtn.addEventListener("click", eventWatcher);
$addCommentsListBtn.addEventListener("click", eventWatcher);

/**
 * @description выключаем кнопку на которую только что нажали.
 * @param btnName {HTMLElement} кнопка которую отключают
 */
function buttonOff(btnName) {
    btnName.disabled = true;
    btnName.classList.add("disable");

    setTimeout(() => {
        btnName.disabled = false;
        btnName.classList.remove("disable");
    }, 700);
}

/**
 * @description в зависимости от нажатой кнопки выключим её и запросим с сервера данные
 * @param data {Object} объект вернувшийся из промиса
 */
function eventWatcher(data) {

    switch (data.target.value) {
        case "1":
            buttonOff($addUserListBtn);
            getJsonplaceholder(userUrl, "1");
            break;
        case "2":
            buttonOff($addPostListBtn);
            getJsonplaceholder(postUrl, "2");
            break;
        case "3":
            buttonOff($addCommentsListBtn);
            getJsonplaceholder(commentUrl, "3");
            break;
    }
}


/**
 * @description добавляет шаблон с данными в блок "gallery" первым элементом
 * @param data {Object} объект вернувшийся из промиса
 * @param type {String} тип элемента который хотим добавить
 */
function render(data, type) {

    switch (type) {
        case "1":
            const typeOne = `<div class="users">
        <div class="block">
            <div class="userName"><span>User name:</span> ${data.username}, <span>Name:</span> ${data.name}</div>
            <div class="phone"><span>Phone</span>: ${data.phone}</div>
            <div class="email"><span>Email</span>: ${data.email}</div>
            <div class="webSite"><span>Website</span>: ${data.website}</div>
            <div class="company"><span>Company name:</span> ${data.company.name} </br> <span>Catch Phrase:</span> ${data.company.catchPhrase} </br> <span>BS:</span> ${data.company.bs}</div>
            <div class="address"><span>Address</span>: ${data.address.suite}, ${data.address.street}, ${data.address.city}, ${data.address.zipcode}</div>
        </div>
    </div>`;
            $gallery.insertAdjacentHTML("afterbegin", typeOne);
            break;
        case "2" :
            const typeTwo = `<div class="postList">
             <div class="block">
                 <h3 class="postTitle">${data.title}</h3>
                 <div class="postBody">${data.body}</div>
            </div>
         </div>`
            $gallery.insertAdjacentHTML("afterbegin", typeTwo);
            break;
        case "3":
            const typeThree = `<div class="commentList">
        <div class="block">
            <h5 class="commentName">${data.name}(<a href="malito:${data.email}">${data.email}</a> )</h5>
            <div class="commentBody">${data.body}</div>
        </div>
    </div>`
            $gallery.insertAdjacentHTML("afterbegin", typeThree);
            break;
    }


}

/**
 * @description метод обращается к серверу по указанному url + elmUrl, парсит ответ и передаёт его методу показа
 * @param elmUrl {String} элемент который мы запросили
 * @param type {String} тип элемента который мы запросили
 */
function getJsonplaceholder(elmUrl, type) {
    fetch(url + elmUrl)
        .then((response) => {
            if (!response.ok) {
                throw Error(`Не удалось получить данные с сервера.
            Ответ сервера: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            render(data, type);
        })
        .catch((reject) => alert(`Не удалось получить данные с сервера.`));
}