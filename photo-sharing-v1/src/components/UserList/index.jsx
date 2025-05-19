// import React from "react";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";

// import "./styles.css";
// import models from "../../modelData/models";

// /**
//  * Define UserList, a React component of Project 4.
//  */
// function UserList() {
//   const users = models.userListModel();
//   return (
//     <div>
//       <Typography variant="body1">
//         This is the user list, which takes up 3/12 of the window. You might
//         choose to use <a href="https://mui.com/components/lists/">Lists</a> and{" "}
//         <a href="https://mui.com/components/dividers/">Dividers</a> to display
//         your users like so:
//       </Typography>
//       <List component="nav">
//         {users.map((item) => (
//           <>
//             <ListItem>
//               <ListItemText primary={item.first_name} />
//             </ListItem>
//             <Divider />
//           </>
//         ))}
//       </List>
//       <Typography variant="body1">
//         The model comes in from models.userListModel()
//       </Typography>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("/user")
      .then((data) => {
        console.log("Fetched users:", data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!users.length) return <Typography>No users found.</Typography>;

  return (
    <div className="user-list">
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <div key={user._id}>
            <ListItem button component={Link} to={`/user/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
