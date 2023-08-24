import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className="container-fluid">
      <img className="pt-5" width="700" src={post.image} alt={post.title} />
      <h2 className="pt-3">{post.title}</h2>
      <p>Criado por: {post.createdBy}</p>
      <div className="container-fluid d-flex flex-row justify-content-center">
        {post.tags.map((tag) => (
          <p className="d-flex text-center" key={tag}><span>#</span>{tag}</p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-primary px-4">
        Ler
      </Link>
      <hr/>
    </div>
  );
};

export default PostDetail;