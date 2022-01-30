const isStaging = () => {
  return (
    //@ts-ignore
    process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "development"
  );
};

export default isStaging;
