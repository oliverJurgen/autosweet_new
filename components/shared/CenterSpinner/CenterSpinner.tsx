import { Flex, CircularProgress } from "@chakra-ui/react";

const CenterSpinner = ({ color, ...rest }: any) => (
  <Flex justify="center" align="center" h="50vh" {...rest}>
    <CircularProgress
      isIndeterminate
      color={color || `${"#000"}`}
      size="24px"
    />
  </Flex>
);

export default CenterSpinner;
