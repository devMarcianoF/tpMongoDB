const { getElementById, querySelector } = document;

const articleDataElement = getElementById('article-data');
const article = JSON.parse(articleDataElement.getAttribute('data-article'));

const applaudButton = getElementById('applaudButton');
applaudButton.addEventListener('click', () => {
    fetch(`/api/articles/${article._id}/applaud`, { method: 'POST' })
        .then(response => response.json())
        .then(({ applauseCount }) => {
            const applauseCountElement = querySelector('#applauseCount');
            applauseCountElement.textContent = applauseCount;
        })
        .catch(error => console.error(error));
});
