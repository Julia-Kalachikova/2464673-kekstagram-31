const DESCRIPTION = ['Ничего личного', 'Просто так', 'Пусть будет здесь', 'Прекрасный вид', 'На чиле', 'Ноу коммент', 'Такая вот история', 'Жить хорошо', 'Могло быть и лучше', 'Мгновение - ты прекрасно!'
];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Софи', 'Максимилиан', 'Ромео', 'Сантьяго', 'Марио', 'Колумб', 'Юпитер', 'Доминго', 'Олимпия', 'Юлианна'
];
let commentId = 0;
const createPhotoObject = (id, url, description, likes, comments) => {
  return {
  id: id,
  url: url,
  description: description,
  likes: likes,
  comments: comments
  };
}

const createCommentObject = (id, avatar, message, name) => ({
    id: id,
    avatar: avatar,
    message: message,
    name: name
  };)


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArreyElement = (array) => {
  let min = 0;
  let max = array.length - 1;
  let random = getRandomInteger(min, max);
  return array[random];
};

const getCommentObjectArrey = (qtt) => {
  let arrayResult = [];
  for (let i = 0; i < qtt; i++) {
    let randomCommentObject = createCommentObject(
      commentId,
      'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      getRandomArreyElement(MESSAGES),
      getRandomArreyElement(NAMES)
    );
    commentId++;
    arrayResult.push(randomCommentObject);
  }
  return arrayResult;
};

const createCommentObjectArray = () => {
  let arrayResultFinish = [];
  for (let i = 0; i < 25; i++) {
    let id = i + 1;
    arrayResultFinish.push(
      createPhotoObject(
        id,
        'photos/' + id + '.jpg',
        getRandomArreyElement(DESCRIPTION),
        getRandomInteger(15, 200),
        getCommentObjectArrey(getRandomInteger(0, 30))
      )
    );
  }
  return arrayResultFinish;
};
