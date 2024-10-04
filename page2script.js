let currentPage = 1;
const postsPerPage = 3;

const postList = document.querySelector('.post-list');

function getContent(page) {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((posts) => {
            const startIndex = (page - 1) * postsPerPage;
            const endIndex = page * postsPerPage;
            const postsToDisplay = posts.slice(startIndex, endIndex); 
            
            postsToDisplay.forEach((post) => {
                const postItem = document.createElement('div');
                postItem.classList.add('post');
                postItem.innerHTML = `<h2>${post.title}</h2> <p>${post.body}</p>`;
                postList.appendChild(postItem);
            });
        })
        .catch((error) => console.error('Error fetching posts:', error));
}

function scrolling() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentPage++;
        getContent(currentPage);
    }
}

getContent(currentPage);
window.addEventListener('scroll', scrolling);
