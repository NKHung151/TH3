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

// export default UserList;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import models from "../../modelData/models";
// import "./styles.css";

// function UserList() {
//   const users = models.userListModel();

//   return (
//     <div className="user-list">
//       <Typography variant="body1" paragraph>
//         This is the user list, which takes up 3/12 of the window. You might
//         choose to use <a href="https://mui.com/components/lists/">Lists</a> and{" "}
//         <a href="https://mui.com/components/dividers/">Dividers</a> to display
//         your users like so:
//       </Typography>

//       <Typography variant="h4" gutterBottom>
//         User List
//       </Typography>

//       <List component="nav">
//         {users.map((user) => (
//           <div key={user._id}>
//             <ListItem button component={Link} to={`/users/${user._id}`}>
//               <ListItemText primary={`${user.first_name} ${user.last_name}`} />
//             </ListItem>
//             <Divider />
//           </div>
//         ))}
//       </List>
//       <Typography variant="body1" paragraph>
//         The model comes in from models.userListModel()
//       </Typography>
//     </div>
//   );
// }

// export default UserList;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import fetchModel from "../../lib/fetchModelData";
// import "./styles.css";

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchModel("/userList")
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch users:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Typography>Loading users...</Typography>;

//   return (
//     <div className="user-list">
//       <Typography variant="h4" gutterBottom>
//         User List
//       </Typography>

//       <List component="nav">
//         {users.map((user) => (
//           <div key={user._id}>
//             <ListItem button component={Link} to={`/users/${user._id}`}>
//               <ListItemText primary={`${user.first_name} ${user.last_name}`} />
//             </ListItem>
//             <Divider />
//           </div>
//         ))}
//       </List>
//     </div>
//   );
// }

// export default UserList;

// import React, { useEffect, useState } from "react";
// import { AppBar, Toolbar, Typography } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import fetchModel from "../../lib/fetchModelData";
// import "./styles.css";

// function TopBar() {
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [title, setTitle] = useState("Photo App");

//   useEffect(() => {
//     const path = location.pathname;

//     if (path.startsWith("/users/") || path.startsWith("/photos/")) {
//       const userId = path.split("/")[2];
//       fetchModel(`/user/${userId}`)
//         .then((data) => {
//           setUser(data);
//           if (path.startsWith("/users/")) {
//             setTitle(`${data.first_name} ${data.last_name}`);
//           } else {
//             setTitle(`Photos of ${data.first_name}`);
//           }
//         })
//         .catch(() => {
//           setTitle("Photo App");
//         });
//     } else {
//       setTitle("Photo App");
//     }
//   }, [location]);

//   return (
//     <AppBar className="topbar-appBar" position="absolute">
//       <Toolbar>
//         <Typography variant="h5" color="inherit">
//           {title}
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default TopBar;

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
    fetchModel("/user") // Gọi đúng route backend /api/user
      .then((data) => {
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
            <ListItem button component={Link} to={`/users/${user._id}`}>
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
