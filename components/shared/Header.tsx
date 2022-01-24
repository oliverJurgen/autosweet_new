import Link from "next/link";
import { chakra as c, Image, Flex } from "@chakra-ui/react";
import Navigation from "components/Navigation";
import Logo from "/public/assets/img/icons/AutosweetAUTOS_Final-1png-03.png";

const Header = () => {
  return (
    <Flex
      bg="#303030"
      d="flex"
      justifyContent="space-between"
      align="center"
      minH="7vh"
    >
      <Link href="/">
        <c.div cursor="pointer">
          <picture>
            <Image w="150px" src={Logo.src} alt="logo" loading="lazy" />
          </picture>
        </c.div>
      </Link>
      <Navigation />
    </Flex>
  );
};

export default Header;
