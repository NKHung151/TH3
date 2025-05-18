// import React from "react";
// import { Typography } from "@mui/material";

// import "./styles.css";
// import { useParams } from "react-router-dom";

// /**
//  * Define UserPhotos, a React component of Project 4.
//  */
// function UserPhotos() {
//   const user = useParams();
//   return (
//     <Typography variant="body1">
//       This should be the UserPhotos view of the PhotoShare app. Since it is
//       invoked from React Router the params from the route will be in property
//       match. So this should show details of user:
//       {user.userId}. You can fetch the model for the user from
//       models.photoOfUserModel(userId):
//     </Typography>
//   );
// }

// export default UserPhotos;

// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import models from "../../modelData/models"; // Import models to fetch user photos data
// import { Typography, Divider } from "@mui/material"; // Import Material-UI components
// import "./styles.css"; // Import CSS file for styling

// /**
//  * Define UserPhotos, a React component of Project 4.
//  */
// function UserPhotos() {
//   const { userId } = useParams(); // Get userId from the URL
//   const photos = models.photoOfUserModel(userId) || []; // Fetch user photos, avoid errors if no photos

//   // Function to format date
//   // Function to format date in English
//   const formatDate = (date) => {
//     const options = {
//       year: "numeric",
//       month: "long", // e.g., January, February
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     };
//     return new Date(date).toLocaleString("en-US", options);
//   };

//   return (
//     <div className="user-photos">
//       {/* Title for the user's photo page */}
//       <Typography variant="h4" gutterBottom>
//         Photos of the User
//       </Typography>

//       {/* If no photos are available */}
//       {photos.length === 0 ? (
//         <Typography variant="body1">
//           No photos available for this user.
//         </Typography>
//       ) : (
//         photos.map((photo) => (
//           <div key={photo._id} className="photo-block">
//             {/* Display user photo */}
//             <img
//               src={`/images/${photo.file_name}`}
//               alt="User Photo"
//               style={{ width: "300px", borderRadius: "8px" }}
//             />
//             {/* Display photo creation date */}
//             <Typography variant="body1">
//               Created on: {formatDate(photo.date_time)}
//             </Typography>

//             {/* Display comments */}
//             <Typography variant="h6">Comments:</Typography>
//             {photo.comments && photo.comments.length > 0 ? (
//               <ul>
//                 {photo.comments.map((comment) => (
//                   <li key={comment._id}>
//                     <Typography variant="body2">{comment.comment}</Typography>
//                     <Typography variant="body2">
//                       <strong>
//                         {comment.user.first_name} {comment.user.last_name}
//                       </strong>{" "}
//                       - {formatDate(comment.date_time)}
//                     </Typography>
//                     {/* Link to the user's profile who commented */}
//                     <Link to={`/users/${comment.user._id}`} color="primary">
//                       View commenter profile
//                     </Link>
//                     <Divider />
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <Typography variant="body1">No comments available.</Typography>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default UserPhotos;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Typography, Divider } from "@mui/material";
// import fetchModel from "../../lib/fetchModelData";
// import "./styles.css";

// function UserPhotos() {
//   const { userId } = useParams();
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchModel(`/photosOfUser/${userId}`)
//       .then((data) => {
//         setPhotos(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch photos:", err);
//         setLoading(false);
//       });
//   }, [userId]);

//   const formatDate = (date) => {
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     };
//     return new Date(date).toLocaleString("en-US", options);
//   };

//   if (loading) return <Typography>Loading photos...</Typography>;
//   if (photos.length === 0)
//     return <Typography>No photos available for this user.</Typography>;

//   return (
//     <div className="user-photos">
//       <Typography variant="h4" gutterBottom>
//         Photos of the User
//       </Typography>

//       {photos.map((photo) => (
//         <div key={photo._id} className="photo-block">
//           <img
//             src={`/images/${photo.file_name}`}
//             alt="User Photo"
//             style={{ width: "300px", borderRadius: "8px" }}
//           />
//           <Typography variant="body1">
//             Created on: {formatDate(photo.date_time)}
//           </Typography>

//           <Typography variant="h6">Comments:</Typography>
//           {photo.comments && photo.comments.length > 0 ? (
//             <ul>
//               {photo.comments.map((comment) => (
//                 <li key={comment._id}>
//                   <Typography variant="body2">{comment.comment}</Typography>
//                   <Typography variant="body2">
//                     <strong>
//                       {comment.user.first_name} {comment.user.last_name}
//                     </strong>{" "}
//                     - {formatDate(comment.date_time)}
//                   </Typography>
//                   <Link to={`/users/${comment.user._id}`} color="primary">
//                     View commenter profile
//                   </Link>
//                   <Divider />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <Typography variant="body1">No comments available.</Typography>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UserPhotos;

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

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load photos.");
        setLoading(false);
      });
  }, [userId]);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  if (loading) return <Typography>Loading photos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!photos.length)
    return <Typography>No photos available for this user.</Typography>;

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
                  <Typography variant="body2">
                    <strong>
                      {comment.user.first_name} {comment.user.last_name}
                    </strong>{" "}
                    - {formatDate(comment.date_time)}
                  </Typography>
                  <Link to={`/users/${comment.user._id}`} color="primary">
                    View commenter profile
                  </Link>
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

export default UserPhotos;
