import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="post-page max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      <h1 className="blog_h1 text-2xl font-bold text-gray-800 text-center">{postInfo.title}</h1>
      <time className="block text-center text-sm text-gray-500">{format(new Date(postInfo.createdAt), "MMMM dd, yyyy")}</time>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row text-center">
          <Link className="edit-btn inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" to={`/blogs/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="blog_image my-4 flex justify-center">
        <img className="blog_img max-w-full h-auto rounded-md" src={postInfo.cover} alt="" />
      </div>
      <div className="blog_content prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
