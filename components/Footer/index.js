import React from "react";
import style from "./Footer.module.css";
import Logotype from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";
import { Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Image
        src={Logotype.src}
        alt="logotype"
        loading="lazy"
        objectFit="contain"
        height="150px"
        width="150px"
      />
      <ul className={style.menu}>
        <li>OUR COMPANY</li>
        <li>SITE INFO</li>
      </ul>
      <p className={style.copyright}>
        © AutoSweet | 2020 - 2021 | Privacy Policy
      </p>
    </footer>
  );
};

export default Footer;
