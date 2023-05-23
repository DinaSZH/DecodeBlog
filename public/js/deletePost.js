function deletePost(id, authorId) {
  console.log(id, authorId);
  axios.delete(`/api/posts/${id}`).then((data) => {
    if (data.status == 200) {
      location.replace(`/profile/${authorId}`);
    } else if (data.status == 404) {
      location.replace("/not-found");
    }
  });
}
