

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCache, setUserCache] = useState({}); // Lưu trữ thông tin người dùng theo _id

  useEffect(() => {
    fetchModel(`/photo/${userId}`)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load photos.");
        setLoading(false);
      });
  }, [userId]);

  const fetchUserIfNeeded = async (id) => {
    if (userCache[id]) return userCache[id];

    try {
      const user = await fetchModel(`/user/${id}`);
      setUserCache((prev) => ({ ...prev, [id]: user }));
      return user;
    } catch {
      return null;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) return <Typography>Loading photos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!photos.length) return <Typography>No photos available for this user.</Typography>;

  return (
    <div className="user-photos">
      <Typography variant="h4" gutterBottom>
        Photos of the User
      </Typography>

      {photos.map((photo) => (
        <div key={photo._id} className="photo-block">
          <img
            src={`/images/${photo.file_name}`}
            alt="User Photo"
            style={{ width: "300px", borderRadius: "8px" }}
          />
          <Typography variant="body1">
            Created on: {formatDate(photo.date_time)}
          </Typography>

          <Typography variant="h6">Comments:</Typography>
          {photo.comments && photo.comments.length > 0 ? (
            <ul>
              {photo.comments.map((comment) => (
                <li key={comment._id}>
                  <Typography variant="body2">{comment.comment}</Typography>

                  <CommentUser comment={comment} fetchUserIfNeeded={fetchUserIfNeeded} formatDate={formatDate} />
                  <Divider />
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No comments available.</Typography>
          )}
        </div>
      ))}
    </div>
  );
}

function CommentUser({ comment, fetchUserIfNeeded, formatDate }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserIfNeeded(comment.user_id).then((u) => setUser(u));
  }, [comment.user_id]);

  if (!user) {
    return (
      <Typography variant="body2" color="textSecondary">
        Loading commenter info...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="body2">
        <strong>
          {user.first_name} {user.last_name}
        </strong>{" "}
        - {formatDate(comment.date_time)}
      </Typography>
      <Link to={`/user/${user._id}`} color="primary">
          View commenter profile
      </Link>
    </>
  );
}

export default UserPhotos;
