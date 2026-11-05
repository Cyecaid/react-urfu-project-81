# Генератор форм на Typescript

[![hexlet-check](https://github.com/Cyecaid/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Cyecaid/react-urfu-project-81/actions)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/


## Стек

- TypeScript

## Установка

<!-- Опишите установку: клонирование, зависимости, переменные окружения -->

```bash
git clone https://github.com/Cyecaid/react-urfu-project-81.git
cd react-urfu-project-81
make install
make build
```

## Разработка

```bash
make lint
make typecheck
make test
make test-coverage
```

## Использование

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

const form = HexletCode.formFor(template, { method: 'post', url: '/users' }, (f) => {
  f.input('name', { class: 'user-input' });
  f.input('job', { as: 'textarea' });
  f.submit('Wow');
});

console.log(form);
// <form method="post" action="/users">
//   <label for="name">Name</label>
//   <input name="name" type="text" value="rob" class="user-input">
//   <label for="job">Job</label>
//   <textarea cols="20" rows="40" name="job">hexlet</textarea>
//   <input type="submit" value="Wow">
// </form>
```

- `formFor(template, options, callback)` — `options.url` задаёт `action` (дефолт - `#`), `options.method` - метод (по умолчанию `post`).
- `f.input(name, options)` - поле с `<label>` и значением из `template[name]`. `as: 'textarea'` создаёт многострочное поле (дефолт - `cols="20" rows="40"`)
- `label` и `labelHtml` в опциях `f.input` задают текст и атрибуты подписи: `f.input('name', { label: 'User', labelHtml: { class: 'form-label' } })`
- `f.submit(text)` - кнопка отправки, дефолт текст - `Save`.
- Если поля в шаблоне нет - бросается ошибка `Поля '<name>' нет в шаблоне`

Генератор возвращает HTML одной строкой, переносы в примере добавлены для читаемости.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
