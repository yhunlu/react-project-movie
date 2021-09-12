import React from "react";

// Input: liked: boolean
// Output: onClick

const Like = (props) => {
  let classes = "fas fa-heart";
  if (!props.liked) classes = "far fa-heart";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

export default Like;