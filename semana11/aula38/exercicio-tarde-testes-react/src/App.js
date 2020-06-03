import React, { useState } from "react";
import "./App.css";
import { Post } from "./components/Post";

const App = () => {
  const [postsList, setPostsList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const addPost = () => {
    // Adiciona um post à lista
    if (!inputValue) {
      setError(true);
    } else {
      setError(false);
      const newPost = {
        id: Date.now(),
        text: inputValue,
        liked: false
      };

      const newPostsList = [newPost, ...postsList];

      setPostsList(newPostsList);
      setInputValue('');
    }
  };

  const deletePost = postId => {
    // Apaga um post da lista
    const newPostsList = postsList.filter(post => {
      return postId !== post.id;
    });

    setPostsList(newPostsList);
  };

  const toggleLike = postId => {
    // Altera o status de curtida de um post da lista
    const newPostsList = postsList.map(post => {
      if (postId === post.id) {
        const novoPost = {
          ...post,
          liked: !post.liked
        };
        return novoPost;
      } else {
        return post;
      }
    });

    setPostsList(newPostsList);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          onChange={onChangeInput}
          value={inputValue}
          placeholder={"Novo post"}
        />
        <button onClick={addPost}>Adicionar</button>
        {error ? <p>Não é possível criar um post vazio, favor escreva algo</p> : null}
      </div>
      <br />
      {postsList.length === 0 ? <p>Nenhum post</p> : (postsList.map(post => {
        return (
          <Post
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            deletePost={deletePost}
          />
        );
      }))}
      {postsList.length > 0 ? <p>Quantidade de posts: {postsList.length}</p> :null}
    </div>
  );
};

export default App;
