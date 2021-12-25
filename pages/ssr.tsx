export async function getServerSideProps(context: any) {
  console.log({ context });
  return {
    props: {
      testData: "foo",
    }, // will be passed to the page component as props
  };
}

const SSR = (props: any) => {
  console.log({ props });

  return <div>"SSR TEST"</div>;
};

export default SSR;
