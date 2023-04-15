function attachEvents() {
    const loadPostsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
    const selectElement = document.getElementById('posts');

    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostsBtn = document.getElementById('btnViewPost');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const commentsContainerElement = document.getElementById('post-comments');

    let postDetails = {};

    loadPostsBtn.addEventListener('click', () => {
        fetch(loadPostsUrl)
            .then(res => res.json())
            .then(data => {
                postDetails = data;
                for (const key in data) {
                    let option = document.createElement('option');
                    option.value = key;
                    option.textContent = data[key].title;

                    selectElement.appendChild(option);

                    postDetails[data[key].title] = key;
                }
            });
    });

    viewPostsBtn.addEventListener('click', () => {
        let comments = [];

        fetch(commentsUrl)
            .then(res => res.json())
            .then(data => {
                for (const post in data) {
                    if(selectElement.value === data[post].postId){
                        comments.push(data[post]);
                    }
                }

                console.log(comments);
                

                postTitleElement.textContent = postDetails[selectElement.value].title;
                postBodyElement.textContent = postDetails[selectElement.value].body;

                comments.forEach(com => {
                    let li = document.createElement('li');
                    li.id = com.id;
                    li.textContent = com.text;

                    commentsContainerElement.appendChild(li);
                });
            })
    });
}

attachEvents();