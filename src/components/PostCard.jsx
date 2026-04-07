import React from "react";
import { Link } from "react-router-dom";
import appWriteService from "../appwrite/config";
function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`} className="bg-gray-100 rounded-xl p-4 ">
      <div className="w-full justify-center mb-4">
        <img
          src={appWriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-xl"
        />
      </div>
      <h2>{title}</h2>
    </Link>
  );
}

export default PostCard;
