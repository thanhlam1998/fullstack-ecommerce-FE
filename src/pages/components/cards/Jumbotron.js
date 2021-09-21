import React from "react";
import TypeWriter from "typewriter-effect";

const Jumbotron = ({ text }) => {
  return (
    <TypeWriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default Jumbotron;
