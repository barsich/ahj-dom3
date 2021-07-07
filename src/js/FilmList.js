/* eslint-disable no-param-reassign */
import sortArrays from './utils';

export default class FilmList {
  constructor(list) {
    try {
      this.list = JSON.parse(list);
    } catch (e) {
      throw new Error('Невалидный список');
    }
    this.propList = ['id', 'title', 'year', 'imdb'];
    this.filmsSortedById = [];
    this.filmsSortedByTitle = [];
    this.filmsSortedByYear = [];
    this.filmsSortedByRating = [];
  }

  sortList(event) {
    // уходим отсюда, если уже была сортировка
    const colName = event.target.innerText;
    if (colName.includes('\u{2193}')) {
      return;
    }

    let sortedList;
    switch (event.target.innerText) {
      case 'id':
        if (this.filmsSortedById.length === 0) {
          this.filmsSortedById = sortArrays(event.target.innerText, this.list).slice();
        }
        sortedList = this.filmsSortedById;
        break;

      case 'year':
        if (this.filmsSortedByYear.length === 0) {
          this.filmsSortedByYear = sortArrays(event.target.innerText, this.list).slice();
        }
        sortedList = this.filmsSortedByYear;
        break;

      case 'imdb':
        if (this.filmsSortedByRating.length === 0) {
          this.filmsSortedByRating = sortArrays(event.target.innerText, this.list).slice();
        }
        sortedList = this.filmsSortedByRating;
        break;

      default:
        if (this.filmsSortedByTitle.length === 0) {
          this.list.sort((a, b) => a.title.localeCompare(b.title));
          this.filmsSortedByTitle = this.list.slice();
        }
        sortedList = this.filmsSortedByTitle;
        break;
    }

    // очищаем список
    Array.from(document.querySelectorAll('.filmlist__filminfo')).forEach((item) => item.remove());

    // набиваем новым отсортированным списком
    const table = document.querySelector('.filmlist');
    this.fillTable(table, sortedList);

    // удаляем стрелки везде
    const headerCells = Array.from(document.querySelectorAll('.filmlist__header td'));
    headerCells.forEach((td) => {
      if (td.innerText.includes('\u{2193}')) {
        td.innerText = td.innerText.slice(0, -1);
      }
    });

    // ставим стрелку куда надо
    event.target.innerText += '\u{2193}';
  }

  createTable() {
    if (this.list === undefined) {
      throw new Error('Отсутствует список фильмов');
    }

    // создание таблицы
    const table = document.createElement('table');
    table.classList.add('filmlist');
    // вставляем ее в конец боди
    document.getElementsByTagName('body')[0].appendChild(table);
    // шапка для таблицы
    const tableHeader = document.createElement('tr');
    tableHeader.classList.add('filmlist__header');
    table.appendChild(tableHeader);
    this.propList.forEach((prop) => {
      const propCell = document.createElement('td');
      propCell.innerText = prop;
      tableHeader.appendChild(propCell);
      propCell.addEventListener('click', this.sortList.bind(this));
    });
    this.fillTable(table, this.list);
  }

  fillTable(table, list) {
    list.forEach((film) => {
      const filmInfo = document.createElement('tr');
      filmInfo.classList.add('filmlist__filminfo');
      table.appendChild(filmInfo);
      this.propList.forEach((prop) => {
        const infoCell = document.createElement('td');
        let filmProp = 'n/a';
        if (prop in film) {
          filmProp = film[prop];
          if (prop === 'year') {
            filmProp = `(${filmProp})`;
          }
          if (prop === 'imdb') {
            filmProp = `imdb: ${filmProp.toFixed(2)}`;
          }
          infoCell.innerText = filmProp;
          filmInfo.appendChild(infoCell);
        } else {
          infoCell.innerText = filmProp;
          filmInfo.appendChild(infoCell);
        }
      });
    });
  }
}
