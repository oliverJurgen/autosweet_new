import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Input, Button } from 'antd';
import thanksEn from 'public/assets/videos/thankyouEN.mp4';
import thankSp from 'public/assets/videos/thankyouSP.mp4';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from 'components/Navigation';
import style from '../styles/FormPage.module.css';
import VehicleModel from 'models/vehicle.model';
import http from 'services/api';
import Header from 'components/shared/Header';

const langs = {
  en: 'English',
  es: 'Spanish',
};

const getSrc = (langCode: string) => {
  if (langCode === 'es') return thankSp;
  return thanksEn;
};

const ThankPage = () => {
  const [vehicle, setVehicle] = useState(new VehicleModel());
  const [language, setLanguage] = useState<string>('en');
  const router = useRouter();

  const routeLang = router.query.routeLang as string;
  const vehicleId = router.query.id as string;

  useEffect(() => {
    if (language !== routeLang) {
      setLanguage(routeLang);
    }
  }, [routeLang]);

  useEffect(() => {
    if (vehicleId) {
      getVehicle(vehicleId);
    }
  }, [vehicleId]);

  const getVehicle = async (id: string | string[]) => {
    const { data } = await http.get(`/api/vehicle/${id}`);
    setVehicle(new VehicleModel(data));
  };

  return (
    <div className={style.FormPage}>
      <Header />
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

          <video
            controls
            className={style.video}
            src={getSrc(language)}
            autoPlay
          />
          <div className={style.thankYou}>
            <div>
              <h1>Thank You</h1>
              <p>
                Someone from our dealership will contact you shortly.
                {vehicleId
                  ? ` ${vehicle.autoSweetDealerId}, ${vehicle.dealer.dealerName}, ${vehicle.phoneNumber}`
                  : ''}
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
