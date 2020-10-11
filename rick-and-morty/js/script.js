let data = null;
let pages = null;
let currentPage = 1;
let isSearch = false;

const container = document.querySelector('#container');
const search = document.querySelector('.btn-search');
const home = document.querySelector('.home');

const render = async () => {
  await load();
  if (!isSearch) {
    listCharacters(data);
  }
};

const load = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}`
  ).catch((error) => {
    console.log('Erro na url');
  });
  const json = await response.json();
  data = json;
  pages = json.info.pages;
};

const listCharacters = (content) => {
  content.results.map((character) => {
    createElements(
      character.id,
      character.name,
      character.status,
      character.species,
      character.image
    );
  });
  createButtons();
};

const createButtons = () => {
  const divButtons = document.querySelector('.divButtons');
  divButtons.textContent = '';
  const next = document.createElement('button');
  const prev = document.createElement('button');

  next.addEventListener('click', nextPage);
  prev.addEventListener('click', prevPage);

  next.textContent = '>>';
  next.classList = 'next';
  prev.textContent = '<<';
  prev.classList = 'prev';
  divButtons.id = 'divButtons';

  divButtons.appendChild(prev);
  divButtons.appendChild(next);
};

const createElements = (id, name, status, species, image) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const ul = document.createElement('ul');
  const liName = document.createElement('li');
  const liStatus = document.createElement('li');
  const liSpecies = document.createElement('li');
  img.setAttribute('data-toggle', 'modal');
  img.setAttribute('data-target', '#modal');
  img.setAttribute('id', id);

  img.addEventListener('click', modal);
  search.addEventListener('click', seekCharacter);
  home.addEventListener('click', backHome);

  img.src = image;
  liName.textContent = `${name}`;
  liStatus.textContent = `Status: ${status}`;
  liSpecies.textContent = `Specie: ${species}`;
  div.className = 'card';
  liName.className = 'name';

  div.appendChild(img);
  ul.appendChild(liName);
  ul.appendChild(liStatus);
  ul.appendChild(liSpecies);
  div.appendChild(ul);
  container.appendChild(div);
};

const modal = (event) => {
  const title = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  modalBody.textContent = '';

  const div = document.createElement('div');
  const img = document.createElement('img');
  const ul = document.createElement('ul');
  const liStatus = document.createElement('li');
  const liSpecies = document.createElement('li');
  const liGender = document.createElement('li');
  const liOrigin = document.createElement('li');
  const liEpisode = document.createElement('li');

  const id = event.srcElement.id;
  const characters = data.results.find((character) => character.id == id);
  const { name, species, gender, image, episode, origin, status } = characters;

  img.className = 'modal-Image';
  img.src = image;

  title.textContent = name;
  liStatus.textContent = `Status: ${status}`;
  liSpecies.textContent = `Specie ${species}`;
  liGender.textContent = `Gender: ${gender}`;
  liOrigin.textContent = `Origin: ${origin.name}`;
  liEpisode.textContent = `Episodes: ${episode.length}`;

  ul.appendChild(liStatus);
  ul.appendChild(liSpecies);
  ul.appendChild(liGender);
  ul.appendChild(liOrigin);
  ul.appendChild(liEpisode);

  div.appendChild(ul);

  modalBody.appendChild(img);
  modalBody.appendChild(div);
};

const backHome = () => {
  isSearch = false;
  currentPage = 1;
  container.textContent = '';
  render();
};

const seekCharacter = async () => {
  isSearch = true;
  container.textContent = '';
  const name = document.querySelector('.input-search');
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name.value}`
  );
  const json = await response.json();
  listCharacters(json);
  name.value = '';
  render();
};

const prevPage = () => {
  container.textContent = '';
  if (currentPage > 1) {
    container.textContent = '';
    currentPage--;
  }
  render();
};

const nextPage = () => {
  container.textContent = '';
  const prev = document.querySelector('.prev');
  currentPage++;
  render();
};

render();
