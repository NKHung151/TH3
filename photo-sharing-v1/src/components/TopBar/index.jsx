// import React from "react";
// import { AppBar, Toolbar, Typography } from "@mui/material";

// import "./styles.css";

// /**
//  * Define TopBar, a React component of Project 4.
//  */
// function TopBar() {
//   return (
//     <AppBar className="topbar-appBar" position="absolute">
//       <Toolbar>
//         <Typography variant="h5" color="inherit">
//           This is the TopBar component
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default TopBar;

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [title, setTitle] = useState("Photo App");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserTitle() {
      if (
        location.pathname.startsWith("/users/") ||
        location.pathname.startsWith("/photos/")
      ) {
        const userId = location.pathname.split("/")[2];
        setLoading(true);
        try {
          const user = await models.userModel(userId);
          if (user && user.last_name) {
            if (location.pathname.startsWith("/users/")) {
              setTitle(user.last_name);
            } else if (location.pathname.startsWith("/photos/")) {
              setTitle(`Photos of ${user.last_name}`);
            }
          } else {
            setTitle("Unknown User");
          }
        } catch (error) {
          setTitle("Unknown User");
        } finally {
          setLoading(false);
        }
      } else {
        setTitle("Photo App");
      }
    }
    fetchUserTitle();
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          {loading ? "Loading..." : title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
