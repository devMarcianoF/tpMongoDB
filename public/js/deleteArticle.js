const articleId = document.getElementById('articleId');
const deleteButton = document.getElementById('deleteArticleButton');

window.addEventListener('DOMContentLoaded', () => {
    deleteButton.addEventListener("click", () => {
        alert('toto');
        console.log(articleId);

        fetch(`/api/articles/${articleId.value}/delete`, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression de l\'article');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    });
});
