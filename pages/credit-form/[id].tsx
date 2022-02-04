import type { NextPage, NextPageContext } from "next";
import FormPage from "old_pages/700CreditForm/FormPage";

type Props = {
  vehicleId?: string;
};

const CreditForm: NextPage<Props> = ({ vehicleId }: Props) => {
  return <FormPage vehicleId={vehicleId} />;
};

export default CreditForm;

export async function getServerSideProps(ctx: NextPageContext) {
  const vehicleId = ctx.query.id;

  return {
    props: {
      vehicleId,
    },
  };
}
