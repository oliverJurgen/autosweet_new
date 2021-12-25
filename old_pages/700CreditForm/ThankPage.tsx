import React from "react";
import { Row, Col, Select, Input, Button } from "antd";
// import thanksEn from "public/assets/videos/thankyouEN.mp4";
// import thankSp from "public/assets/videos/thankyouSP.mp4";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getSelectedVehicleItem } from "redux/selectors";
import Navigation from "components/Navigation";
import style from "../styles/FormPage.module.css";

const langs = {
  en: "English",
  es: "Spanish",
};

// const getSrc = (langCode: string) => {
//   if (langCode === "es") return thankSp;
//   return thanksEn;
// };

const ThankPage = () => {
  const [language, setLanguage] = React.useState<string>("en");
  const router = useRouter();
  const selectedVehicleItem = useSelector((state) =>
    getSelectedVehicleItem(state)
  );
  const dealer = selectedVehicleItem?.dealer;

  const routeLang = router.query.routeLang as string;

  React.useEffect(() => {
    if (language !== routeLang) {
      setLanguage(routeLang);
    }
  }, [routeLang]);

  return (
    <div className={style.FormPage}>
      <header className={style.Header}>
        <Link href="/">
          <span className={style.logo} />
        </Link>
        <Navigation />
      </header>
      <Row justify="center" className={style.content}>
        <Col span={12}>
          <Input.Group compact>
            <Select
              value={language}
              onChange={(e: any) => {
                console.log({ e });
                setLanguage(e);
              }}
            >
              {Object.entries(langs).map((lang: [string, string]) => {
                const [key, val] = lang;
                return (
                  <Select.Option id={key} value={key}>
                    {val}
                  </Select.Option>
                );
              })}
            </Select>
          </Input.Group>

          {/* <video
            controls
            className={style.video}
            src={getSrc(language)}
            autoPlay
          /> */}
          <div className={style.thankYou}>
            <div>
              <h1>Thank You</h1>
              <p>
                Someone from our dealership will contact you shortly.{" "}
                {dealer.autoSweetDealerID}, {dealer.dealerName},{" "}
                {dealer.phoneNumber}.
              </p>
            </div>
            <Button type="primary">
              <Link href="/" passHref>
                <a>
                  <ArrowLeftOutlined />
                  Back
                </a>
              </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ThankPage;
