import Image from "next/image";
import Link from "next/link";
import { chakra as c } from "@chakra-ui/react";
import Navigation from "components/Navigation";
import Logo from "public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";

const Header = () => {
  return (
    <c.header bg="#303030" d="flex" justifyContent="space-between" minH="7vh">
      <Link href="/">
        <c.div cursor="pointer">
          <picture>
            <Image src={Logo} alt="logo" />
          </picture>
        </c.div>
      </Link>
      <Navigation />
    </c.header>
  );
};

export default Header;
