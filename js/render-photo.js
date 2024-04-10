import {pictureContainer, photoObjectArray} from './photos.js';
import {isEscapeKey} from './util.js';

//переменные
const maxComment = 5;//кол-во комментов при открытии окна
let lowRange = 0;
let commentsCount = 0;
let comments = [];
const bigPictureSection = document.querySelector('.big-picture'); //большое окно, которое мы будем заполнять данными
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img'); //адрес изображения
const likesCount = bigPictureSection.querySelector('.likes-count'); //Количество лайков
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count'); //блок счетчик комментариев
const commentsShownCount = socialCommentCount.querySelector('.social__comment-shown-count');//количество показанных комментариев
const socialCommentTotalCount = socialCommentCount.querySelector('.social__comment-total-count'); //Общее количество комментариев к фотографии
const socialComments = bigPictureSection.querySelector('.social__comments'); //блок для комментариев
const socialComment = bigPictureSection.querySelector('.social__comment');
const socialCaption = bigPictureSection.querySelector('.social__caption'); //блок с опис
const newCommentsLoaderButton = bigPictureSection.querySelector('.comments-loader');//кнопка загрузки новых комментариев
const userModalCanselElement = bigPictureSection.querySelector('.big-picture__cancel'); //кнопка закрытия полноэкранного просмотра


//функция которя закрывает окно
const onBigPictureCancelClick = () => {
  closePhoto();
};

//если мы нажали escape только в это случае делаем closePhoto
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePhoto();
  }
};

const increaseCount = () => {
  lowRange += maxComment;
  commentsShownCount.textContent = (commentsCount > lowRange + maxComment) ? lowRange + maxComment : commentsCount;
  if(commentsCount < lowRange + maxComment) {
    newCommentsLoaderButton.classList.add('hidden');
  }
};


const renderFivecomments = () => {
  const fiveComment = comments.slice(lowRange, lowRange + maxComment); //создаем копию части массива комментов
  const socialCommentsFragment = document.createDocumentFragment();//создаем фрагмент - ящик для комментариев
  fiveComment.forEach((comment) => { //проходимся по 5 комментариям через .forEach
    const userCommentElement = socialComment.cloneNode(true); //записываем в новую переменную клон блока комментов,
    userCommentElement.querySelector('.social__picture').src = comment.avatar; //добавляем аватар комментатора
    userCommentElement.querySelector('.social__picture').alt = comment.name; // добавляем имя комментатора
    userCommentElement.querySelector('.social__text').textContent = comment.message; //добавляем сам коммент

    socialCommentsFragment.append(userCommentElement);//добавляем заполненный li во фрагмент
  });
  socialComments.append(socialCommentsFragment); // дабавляем фрагмент в блок комментов
};

//функция, которая заполняет большое фото
const openBigPicture = (pictureId) => {
  const currentPhoto = photoObjectArray.find((photo) => photo.id === Number(pictureId)); //находим объект = id

  //дальше, заполняем адрес, лайки, комменты и пр.
  bigPictureImg.src = currentPhoto.url; //подставляем адрес картинки
  likesCount.textContent = currentPhoto.likes; // подставляем количество лайков
  comments = currentPhoto.comments;
  commentsCount = comments.length;
  commentsShownCount.textContent = 5;// подставляем количество показанных комментов
  socialCommentTotalCount.textContent = commentsCount;//подставляем общее количество комментов
  socialComments.innerHTML = ''; // очищаем поле для комментов
  renderFivecomments(comments);//чтобы 5 комментов

  socialCaption.textContent = currentPhoto.description; //добавляем описание
  // socialCommentCount.classList.add('hidden');//скрываем блок счетчиков

  bigPictureSection.classList.remove('hidden'); // открываем большое окно для просмотра фото
  userModalCanselElement.addEventListener('click', onBigPictureCancelClick); //навешиваем обработчик по клику на крестик закрытия фото
  document.body.classList.add('modal-open'); //добавляем класс, чтобы не прокручивался фон
  document.addEventListener('keydown', onEscKeydown);// добавляем обработчик событий для закрытия фото по нажатию esc
  newCommentsLoaderButton.addEventListener('click', renderFivecomments);
  newCommentsLoaderButton.addEventListener('click', increaseCount); // функция, которая будет отображать 5 комментов из общего числа)
};

// основная функция, которая открывает. на контейнер где все фото вешаем обработчик с target
const openPicture = () => {
  pictureContainer.addEventListener('click', (evt) => {
    // проверка, что точно нажали по пикчер либо на эл внутри по отношению к нему
    const currentPhoto = evt.target.closest('.picture');

    //проверка - тот ли элемент
    if (currentPhoto) {
      evt.preventDefault();
      //если trye тогда вызываем функцию и добавляем по id (data-picture-id (html)  === dataset.pictureId (js)
      openBigPicture(currentPhoto.dataset.pictureId);
    }
  });
};

//функция закрытия большого фото
function closePhoto() {
  bigPictureSection.classList.add('hidden'); //добавляем класс, который скрывает окно
  userModalCanselElement.removeEventListener('click', onBigPictureCancelClick); // удаляем обработчик закрытия по клику на крестик
  document.removeEventListener('keydown', onEscKeydown); // удаляем обработчик закрытия по нажатию esc
  // commentsShownCount.textContent = '';
  lowRange = 0;
  commentsCount = 0;
}

export { openPicture };
