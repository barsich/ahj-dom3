import FilmList from '../FilmList';

test('error on invalid json', () => {
  expect(() => new FilmList('{12}')).toThrow();
});

test('error on empty film list', () => {
  expect(() => new FilmList()).toThrow();
});

test('creating filmlist', () => {
  const json = `[
      {
        "id": 4,
        "title": "Лупа и Пупа",
        "imdb": 9.30,
        "year": 2000
      },
      {
        "id": 1,
        "title": "Буба и Биба",
        "imdb": 9.20,
        "year": 1950
      },
      {
        "id": 10,
        "title": "Шлепа и Флоппа",
        "imdb": 10.00,
        "year": 2010
      }
    ]`;
  const newList = new FilmList(json);
  expect(newList).toBeInstanceOf(FilmList);
  expect(newList.propList.length).toBe(4);
  expect(newList.list.length).toBe(3);
});
