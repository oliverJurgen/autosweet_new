import Header from 'components/shared/Header';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row, Select, Form, Input, Checkbox } from 'antd';

import { selectStatesAction } from 'redux/actions';
import style from '../styles/FormPage.module.css';
import { Poster, Poster2, Poster3, Poster4 } from 'public/assets/img/posters';
import welcomeEn from 'public/assets/videos/welcomeEN.mp4';
import welcomeSp from 'public/assets/videos/welcomeSP.mp4';
import VehicleModel from 'models/vehicle.model';
import http from 'services/api';
import { useRouter } from 'next/router';

const posterId = Math.floor(Math.random() * 4);

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  address: '',
  zip: '',
  city: '',
  stateId: null,
  homePhone: '',
  cellPhone: '',
  email: '',
  comments: '',
  agreeWithPolicies: false,
};

const FormPage = () => {
  const router = useRouter();
  const posters = [Poster, Poster2, Poster3, Poster4];
  const state: any = useSelector((state) => state);

  const [language, setLanguage] = useState('en');
  const [vehicle, setVehicle] = useState(new VehicleModel());

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectStatesAction());
    if (window.navigator.language.includes('es')) {
      setLanguage('es');
    }
  }, []);

  useEffect(() => {
    if (router.query.id) {
      getVehicle(router.query.id);
    }
  }, [router.query.id]);

  const getVehicle = async (id: string | string[]) => {
    const { data } = await http.get(`/api/vehicle/${id}`);
    setVehicle(new VehicleModel(data));
  };

  const onSubmit = async (values: any) => {
    try {
      console.log(vehicle);
      await http.post('api/credit', {
        ...values,
        autoSweetDealerId: vehicle?.autoSweetDealerId || 1,
      });
      const id = router.query.id ? router.query.id : '';
      router.push(`/thank-you/${language}/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Row justify="center" className={style.content}>
          <Col span={12}>
            <Row>
              <Select
                defaultValue={language}
                onChange={(value) => setLanguage(value)}
              >
                {[
                  { value: 'en', name: 'English' },
                  { value: 'es', name: 'Spain' },
                ].map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Row>
            <Row>
              <video
                controls
                className={style.video}
                src={language === 'es' ? welcomeSp : welcomeEn}
                autoPlay
              />
            </Row>
            <Row>
              <Form
                name="getPrequalified"
                initialValues={initialValues}
                onFinish={onSubmit}
                scrollToFirstError
                className={style.form}
              >
                <fieldset className={style.fieldset}>
                  <legend className={style.legend}>Personal Information</legend>
                  <Row>
                    <Col sm={24} md={4}>
                      <p>Name</p>
                    </Col>
                    <Col sm={24} md={20}>
                      <Row justify="space-around">
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            label="First Name"
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter First Name.',
                              },
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Should contain letters only.',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            name="lastName"
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter Last Name.',
                              },
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Should contain letters only.',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row justify="space-around">
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            name="middleName"
                            label="Middle Name"
                            rules={[
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Should contain letters only.',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            name="suffix"
                            label="Suffix"
                            rules={[
                              {
                                pattern: /^[a-zA-Z]+$/,
                                message: 'Should contain letters only.',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset className={style.fieldset}>
                  <legend className={style.legend}>Residential Form</legend>
                  <Row>
                    <Col sm={24} md={4}>
                      <p>Address</p>
                    </Col>
                    <Col sm={24} md={20}>
                      <Row>
                        <Form.Item
                          className={style.formItem}
                          name="address"
                          label="Address"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter Address.',
                            },
                          ]}
                        >
                          <Input className={style.input} />
                        </Form.Item>
                      </Row>
                      <Row justify="space-around">
                        <Col sm={24} md={8}>
                          <Form.Item
                            className={style.formItem}
                            name="stateId"
                            label="State"
                            rules={[
                              {
                                required: true,
                                message: 'Please select State!',
                              },
                            ]}
                          >
                            <Select id="state">
                              {state?.states?.map((item: any) => (
                                <Select.Option value={item.id} key={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={8}>
                          <Form.Item
                            className={style.formItem}
                            name="city"
                            label="City"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter City name.',
                              },
                              {
                                pattern:
                                  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
                                message: 'Wrong City name.',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={8}>
                          <Form.Item
                            className={style.formItem}
                            name="zip"
                            label="ZIP"
                            rules={[
                              {
                                pattern: /^\d{5}$/,
                                message: 'Should contain 5-digit number.',
                              },
                              {
                                required: true,
                                message: 'Please enter ZIP code.',
                              },
                            ]}
                          >
                            <Input
                              className={style.input}
                              minLength={5}
                              maxLength={5}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={24} md={4}>
                      <p>Phone Number</p>
                    </Col>
                    <Col sm={24} md={20}>
                      <Row justify="space-around">
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            name="cellPhone"
                            label="Cell Phone"
                            rules={[
                              {
                                pattern: /^\d{3}-\d{3}-\d{4}$/,
                                message: 'Format: xxx-xxx-xxxx',
                              },
                              {
                                required: true,
                                message: 'Please enter Cell Phone!',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                        <Col sm={24} md={12}>
                          <Form.Item
                            className={style.formItem}
                            name="homePhone"
                            label="Home Phone"
                            rules={[
                              {
                                pattern: /^\d{3}-\d{3}-\d{4}$/,
                                message: 'Format: xxx-xxx-xxxx',
                              },
                            ]}
                          >
                            <Input className={style.input} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={24} md={4}>
                      <p>Email</p>
                    </Col>
                    <Col sm={24} md={10}>
                      <Form.Item
                        className={style.formItem}
                        name="email"
                        label="E-mail"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail.',
                          },
                          {
                            required: true,
                            message: 'Please enter E-mail.',
                          },
                        ]}
                      >
                        <Input className={style.input} />
                      </Form.Item>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset className={style.fieldset}>
                  <Row>
                    <Col sm={24} md={4}>
                      <p>Comment</p>
                    </Col>
                    <Col sm={24} md={20}>
                      <Form.Item className={style.formItem} name="comment">
                        <Input.TextArea
                          className={style.input}
                          maxLength={255}
                          placeholder="How did you hear about us?"
                          autoSize={{ minRows: 3, maxRows: 7 }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </fieldset>
                <p>
                  By clicking the I Agree checkbox and Submit, I consent to have
                  my credit file accessed for purposes of prequalifying for a
                  vehicle loan. This is a soft inquiry and will not impact my
                  credit score. I agree to the{' '}
                  <a
                    href="/privacypolicy"
                    target="_blank"
                    className={style.bold}
                  >
                    Privacy Notice
                  </a>
                  ,{' '}
                  <a
                    href="/termsandconditions"
                    target="_blank"
                    className={style.bold}
                  >
                    Terms and Conditions
                  </a>{' '}
                  and I acknowledge I may be contacted by 700 XML Test Account.
                  I understand that I might not prequalify depending on the
                  prequalification criteria.
                </p>
                <Form.Item
                  name="agreeWithPolicies"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Should accept agreement')
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    <p className={style.bold}>
                      I have read and agree to the Terms and Conditions
                    </p>
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={style.submitButton}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
          <Col span={5}>
            <img
              alt="poster"
              className={style.poster}
              src={posters[posterId].src}
            />
          </Col>
        </Row>
      </main>
    </>
  );
};

export default FormPage;
