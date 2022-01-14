import React, { Component } from 'react';
import { Row, Col } from 'antd';
// import Navigation from "../../components/Navigation";
// import { NavLink } from "react-router-dom";
// import style from "../styles/TermsPrivacy.module.css";
import style from 'styles/modules/TermsPrivacy.module.css';
import Header from 'components/shared/Header';

const Terms = () => (
  <>
    <Header/>
    <Row justify="center">
      <Col span={20}>
        <h1 className={style.bold}>TERMS AND CONDITIONS</h1>
        <p className={style.grey}>Home/Terms And Conditions</p>
        <Row>
          <table className={style.table}>
            <tr>
              <td colSpan={2}>
                <h2 className={style.bold}>Conditions of Use</h2>
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td colSpan={2}>
                <p>
                  Welcome to our online store! AutoSweet and its associates
                  provide their services to you subject to the following
                  conditions. By continuing on to the website, you accept these
                  conditions. Please read them carefully.
                </p>
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bold}>
                THIS TRANSACTION IS NOT AN APPLICATION FOR CREDIT PRIVACY
              </td>
              <td>
                Please review our Privacy Notice, which also governs your visit
                to our website, to understand our practices.
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bold}>ELECTRONIC COMMUNICATIONS</td>
              <td>
                When you visit AutoSweet or send e-mails to us, you are
                communicating with us electronically. You consent to receive
                communications from us electronically. We will communicate with
                you by e-mail or by posting notices on this site. You agree that
                all agreements, notices, disclosures and other communications
                that we provide to you electronically satisfy any legal
                requirement that such communications be in writing
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bold}>COPYRIGHT</td>
              <td>
                All content included on this site, such as text, graphics,
                logos, button icons, images, audio clips, digital downloads,
                data compilations, and software, is the property of AutoSweet or
                its content suppliers and protected by international copyright
                laws. The compilation of all content on this site is the
                exclusive property of AutoSweet, with copyright authorship for
                this collection by AutoSweet, and protected by international
                copyright laws.
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bold}>TRADEMARKS</td>
              <td>
                AutoSweet's trademarks and trade dress may not be used in
                connection with any product or service that is not AutoSweet's,
                in any manner that is likely to cause confusion among customers,
                or in any manner that disparages or discredits AutoSweet. All
                other trademarks not owned by AutoSweet or its subsidiaries that
                appear on this site are the property of their respective owners,
                who may or may not be affiliated with, connected to, or
                sponsored by AutoSweet or its subsidiaries.
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.bold}>LICENSE AND SITE ACCESS</td>
              <td>
                AutoSweet grants you a limited license to access and make
                personal use of this site. The license does not grant you the
                right to download (other than page caching) or modify the
                content, or any portion of it, except with express written
                consent of AutoSweet. This license does not include any resale
                or commercial use of this site or its contents: any collection
                and use of any product listings, descriptions, or prices: any
                derivative use of this site or its contents: any downloading or
                copying of account information for the benefit of another
                merchant: or any use of data mining, robots, or similar data
                gathering and extraction tools. This site or any portion of this
                site may not be reproduced, duplicated, copied, sold, resold,
                visited, or otherwise exploited for any commercial purpose
                without express written consent of AutoSweet. You may not frame
                or utilize framing techniques to enclose any trademark, logo, or
                other proprietary information
              </td>
            </tr>
          </table>
        </Row>
      </Col>
    </Row>
  </>
);
export default Terms;