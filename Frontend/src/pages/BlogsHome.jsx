import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../components/firebase-config";

function Blogs({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [refresh, setRefresh] = useState(false);  // State to trigger refetching posts
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setRefresh(!refresh);  // Toggle refresh state to trigger a re-fetch
  };

  const backgroundColors = [
    "#fcf4dd", 
    "#ddedea",
    "#e8dff5", 
    "#fce1e4", 
    "#daeaf6", 
  ];

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, [refresh]);  // Depend on refresh to trigger fetching

  return (
    <div className="blogsPage">
      {postLists.map((post, index) => {
        const backgroundColor = backgroundColors[index % backgroundColors.length];
        // Defensively check for author and author.id
        const canDelete = isAuth && post.author && post.author.id === auth.currentUser.uid;

        return (
          <div className="post" key={post.id} style={{ backgroundColor }}>
            <div className="postHeader">
              <div className="title">
                <h2>{post.title}</h2>
              </div>
              {canDelete && (
                <div className="deletePost">
                  <button onClick={() => deletePost(post.id)}>
                    &#128465;
                  </button>
                </div>
              )}
            </div>
            <div className="postTextContainer">{post.postText}</div>
            {/* <h3 className="postAuthor">@{post.author ? post.author.name : 'Unknown'}</h3> */}
            {console.log(post.author)}
            <h3 className="postAuthor">@{post.author ? post.author.displayName : 'Unknown'}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Blogs;
