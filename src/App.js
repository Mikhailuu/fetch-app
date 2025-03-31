import React, { useEffect, useState } from 'react';

// Компонент для отображения постов
const Posts = ({ onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(5); // Количество постов на странице

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  // Определяем индекс постов для текущей страницы
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Функция для перехода к следующей странице
  const handleNext = () => {
    if (indexOfLastPost < posts.length) {
      setPage(page + 1);
    }
  };

  // Функция для возврата к предыдущей странице
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Функция для переключения подчеркивания текста
  const toggleHover = (e) => e.type === 'mouseover' 
    ? e.target.style.textDecoration = 'none' 
    : e.target.style.textDecoration = 'underline';

  return (
    <div className='app-posts' style={{gridArea: 'posts'}}>
      <h2>Посты</h2>
      <div className='app-posts__btns'>
        <button onClick={handlePrev} disabled={page === 1}>&lt;&lt;</button>
        <span>{page}</span>
        <button onClick={handleNext} disabled={indexOfLastPost >= posts.length}>&gt;&gt;</button>
      </div>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id} onClick={() => onSelectPost(post.id)} 
            style={{textDecoration: 'underline'}} 
            onMouseOver={toggleHover}
            onMouseLeave={toggleHover}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Компонент для отображния поста
const Post = ({postId}) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const data = await response.json();
      setPost(data);
    };

    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  if (!postId) {
    return null;
  }

  return (
    <div style={{gridArea: 'post'}}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

// Компонент для отображения комментариев
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data);
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (!postId) {
    return null;
  }

  return (
    <div style={{gridArea: 'comments'}}>
      <h2>Комментарии</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <h3 className='comm-title'>{comment.name}</h3> {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div className='app'>
      <Posts onSelectPost={(id) => setSelectedPostId(id)} />
      <Post postId={selectedPostId} />
      <Comments postId={selectedPostId} />
    </div>
  );
};

export default App;
