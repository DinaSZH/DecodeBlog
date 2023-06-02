function sendComment(e) {
  e.preventDefault();
  const comment_text = document.querySelector("#comment-text").value;

  const author = document.querySelector("#comment_author").value;
  const post = document.querySelector("#comment_post").value;
  console.log(author, post);
  axios
    .post("/api/comment", {
      text: comment_text,
      authorId: author,
      postId: post,
    })
    .then((data) => {
      if (data.data) {
        location.reload();
      }
    });
}
