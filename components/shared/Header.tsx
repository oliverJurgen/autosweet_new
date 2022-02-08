import Link from "next/link";
import { chakra as c, Flex, Image } from "@chakra-ui/react";
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
      // bg="tomato"
    >
      <Link href="/">
        <c.div cursor="pointer">
          <picture>
            <Image
              width="150px"
              height="150px"
              objectFit="contain"
              src={Logo.src}
              alt="logo"
            />
          </picture>
        </c.div>
      </Link>
      <Navigation />
    </Flex>
  );
};

export default Header;
