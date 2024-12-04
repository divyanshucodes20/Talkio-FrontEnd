import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Talkio",
  description = "this is the Chat App called Talkio",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
