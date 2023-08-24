import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className='d-flex container-fluid row text-center py-4'>
      <h2>Criar post</h2>
      <p>Escreva o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit} className='row container d-flex justify-content-center'>
        <label className='d-flex justify-content-center from-group row'>
          <span className='pb-2 pt-2'>Título:</span>
          <input 
            type="text" 
            name="title"
            className="form-control w-50" 
            required 
            placeholder="Adicione um título"
            onChange={(e) => setTitle (e.target.value)}
            value={title}
          />
        </label>
        <label className='d-flex justify-content-center from-group row pt-2'>
          <span className='pb-2'>URL da imagem:</span>
          <input 
            type="text" 
            name="image" 
            className="form-control w-50" 
            required 
            placeholder="Adicione uma imagem"
            onChange={(e) => setImage (e.target.value)}
            value={image}
          />
        </label>
        <label className='d-flex justify-content-center from-group row pt-2'>
          <span className='pb-2'>Conteúdo:</span>
          <textarea
            name="body" 
            required 
            className="form-control w-50" 
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody (e.target.value)}
            value={body}>
          </textarea> 
        </label>
        <label className='d-flex justify-content-center from-group row pt-2 pb-4'>
          <span className='pb-2'>Tags:</span>
          <input 
            type="text" 
            name="tags" 
            required
            className="form-control w-50" 
            placeholder="Insira as tagas separadas por vírgula"
            onChange={(e) => setTags (e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn btn-primary w-25">Criar post!</button>}
        {response.loading && (
          <button className="btn btn-primary" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
