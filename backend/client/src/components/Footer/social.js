import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Social = () => {
  return (
    <ul>
      Social:
      <li>
        <a href="https://github.com/marlonveiga-santos" target="_blank">
          <FaGithub className="gh-icon pulse" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/marlon-veiga-santos/" target="_blank">
          <FaLinkedin className="in-icon pulse" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/marlonvsantos" target="_blank">
          <FaTwitter className="tt-icon pulse" />
        </a>
      </li>
    </ul>
  );
};
export default Social;
