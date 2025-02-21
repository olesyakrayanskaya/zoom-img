'use strict'

function imageZoom(image, details) {
    let img, lens, result, cx, cy;
    img = document.querySelector(image);
    result = document.querySelector(details);
    /* Создаем лупу */
    lens = document.createElement('DIV');
    lens.setAttribute('class', 'card__img-zoom-lens');
    /* Добавляем лупу в разметку */
    img.parentElement.insertBefore(lens, img);
    /* Увеличиваем во сколько раз */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Выполняем функцию, когда кто-то перемещает курсор по изображению или лупе */
    img.addEventListener('mouseenter', startZoom);
    img.addEventListener('mousemove', moveLens);
    img.addEventListener('mouseleave', resetResult);
    /* Аналогично, для тач-устройств */
    img.addEventListener('touchstart', startZoom);
    img.addEventListener('touchmove', moveLens);
    img.addEventListener('touchend', resetResult);
    function moveLens(e) {
        /* Устанавливаем свойства фона результирующего блока */
        result.style.backgroundSize = `${(img.width * cx)}px ${(img.height * cy)}px`;
        let pos, x, y;
        e.preventDefault();
        /* Получим координаты x и y курсора относительно изображения */
        pos = getCursorPos(e);
        /* Рассчитываем положение лупы */
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /* Не пускаем лупу за пределами изображения */
        if (x > img.offsetWidth - lens.offsetWidth) { x = img.offsetWidth - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.offsetHeight - lens.offsetHeight) { y = img.offsetHeight - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        /* Устанавливаем положение лупы */
        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        /* Выводим, что под лупой */
        result.style.backgroundPosition = `-${(x * cx)}px -${(y * cy)}px`;
    }
    function getCursorPos(e) {
        let x = 0, y = 0;
        /* Получаем координаты x и y изображения */
        let a = img.getBoundingClientRect();
        /* Рассчитываем координаты x и y курсора относительно изображения */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Учитываем прокрутку страницы: */
        x = x - window.scrollX;
        y = y - window.scrollY;
        return { x: x, y: y };
    }
    const text = document.querySelector('.details__text');
    function startZoom() {
        text.classList.add('hidden');
        result.style.backgroundImage = `url(${img.src})`;
        lens.classList.remove('hidden');
    }
    function resetResult() {
        text.classList.remove('hidden');
        result.style.backgroundImage = 'none';
        lens.classList.add('hidden');
    }
}

imageZoom('.card__img', '.details');