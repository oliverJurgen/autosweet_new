const isStaging = () => {
  return (
    //@ts-ignore
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  );
};

export default isStaging;
