// import React from "react";
// import { Typography } from "@mui/material";

// import "./styles.css";
// import { useParams } from "react-router-dom";

// /**
//  * Define UserDetail, a React component of Project 4.
//  */
// function UserDetail() {
//   const user = useParams();
//   return (
//     <>
//       <Typography variant="body1">
//         This should be the UserDetail view of the PhotoShare app. Since it is
//         invoked from React Router the params from the route will be in property
//         match. So this should show details of user: {user.userId}. You can fetch
//         the model for the user from models.userModel.
//       </Typography>
//     </>
//   );
// }

// export default UserDetail;


import React, { useEffect, useState } from "react";
import { Typography, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Typography>Loading user details...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return null;

  return (
    <div className="user-detail">
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1" paragraph>
        Location: {user.location}
      </Typography>
      <Typography variant="body1" paragraph>
        {user.description}
      </Typography>
      <Typography variant="body1" paragraph>
        Occupation: {user.occupation}
      </Typography>

      <Link href={`/photo/${userId}`} color="primary">
        View photo of {user.first_name}
      </Link>
    </div>
  );
}

export default UserDetail;
