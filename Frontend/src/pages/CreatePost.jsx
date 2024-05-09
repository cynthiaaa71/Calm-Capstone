import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../components/firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {

    if (title.trim() === "" || postText.trim() === "") {
    alert("Please fill in all required fields.");
    return; // Stops the function if fields are empty
  }
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { displayName: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/blogs");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            required
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            required
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
