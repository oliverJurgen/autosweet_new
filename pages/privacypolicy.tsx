import React, { Component } from "react";
import { Row, Col } from "antd";
// import Navigation from "../../components/Navigation";
import Navigation from "components/Navigation";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
// import style from "../styles/TermsPrivacy.module.css";
import style from "styles/modules/TermsPrivacy.module.css";

const PrivacyPolicy = () => (
  <>
    <header className={style.Header}>
      <Link href="/">
        <span className={style.logo} />
      </Link>
      <Navigation />
    </header>
    <Row justify="center">
      <Col span={20}>
        <h1>Privacy Policy</h1>

        <p className={style.grey}>Home/Terms And Conditions</p>
        <Row>
          <table className={style.table}>
            <tbody>
              <tr className={style.tableRow}>
                <td>
                  <h2 className={style.blue}>FACTS</h2>
                </td>
                <td className={style.blue}>
                  <b>WHAT DOES AUTOSWEET DO WITH YOUR PERSONAL INFORMATION?</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <h2 className={style.blue}>Why?</h2>
                </td>
                <td>
                  Financial companies choose how they share your personal
                  information. Federal law gives consumers the right to limit
                  some but not all sharing. Federal law also requires us to tell
                  you how we collect, share, and protect your personal
                  information. Please read this notice carefully to understand
                  what we do.
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <h2 className={style.blue}>What?</h2>
                </td>
                <td>
                  The types of personal information we collect and share depend
                  on the product or service you have with us. This information
                  can include:
                  <ul>
                    <li>Social Security number and income</li>
                    <li>Account balance and payment history</li>
                    <li>Credit history and employment information</li>
                  </ul>
                  When you are no longer our customer, we continue to share your
                  information as described in this notice.
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <h2 className={style.blue}>How?</h2>
                </td>
                <td>
                  All financial companies need to share customers' personal
                  information to run their everyday business. In the section
                  below, we list the reasons financial companies can share their
                  customers' personal information; the reasons AUTOSWEET chooses
                  to share; and whether you can limit this sharing.
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
        <Row>
          <table className={style.table}>
            <thead>
              <tr className={style.tableRow}>
                <th>
                  <h3>Reasons we can share your personal information</h3>
                </th>
                <th className={style.textCenter}>
                  <h3>What do we share?</h3>
                </th>
                <th className={style.textCenter}>
                  <h3>Can you limit this sharing?</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={style.tableRow}>
                <td>
                  <strong>For our everyday business purposes</strong> — such as
                  to process your transactions,maintain your account(s), respond
                  to court orders and legal investigations, or report to credit
                  bureaus
                </td>
                <td className={style.textCenter}>
                  <b>Yes</b>
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>For our marketing purposes</strong> – to offer our
                  products and services to you
                </td>
                <td className={style.textCenter}>
                  <b>Yes</b>
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>
                    For joint marketing with other financial companies
                  </strong>{" "}
                </td>
                <td className={style.textCenter}>
                  <b>Yes</b>
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>
                    For our affiliates' everyday business purposes
                  </strong>{" "}
                  – information about your transactions and experiences
                </td>
                <td className={style.textCenter}>
                  <b>Yes</b>
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>
                    For our affiliates' everyday business purposes
                  </strong>{" "}
                  – information about your creditworthiness
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
                <td className={style.textCenter}>
                  <b>We do not share</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>For our affiliates to market to you</strong>
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
                <td className={style.textCenter}>
                  <b>We do not share</b>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td>
                  <strong>For our nonaffiliates to market to you</strong>{" "}
                </td>
                <td className={style.textCenter}>
                  <b>No</b>
                </td>
                <td className={style.textCenter}>
                  <b>We do not share</b>
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
        <Row>
          <table className={style.table}>
            <tbody>
              <tr className={style.tableRow}>
                <td>
                  <h2 className={style.blue}>Question?</h2>
                </td>
                <td>
                  Call 614-448-9089 or go to{" "}
                  <a href="https://www.autosweet.com/support/">
                    https://www.autosweet.com/support/
                  </a>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <h3 className={style.bold}>WHO WE ARE</h3>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>Who is providing this notice?</td>
                <td>AUTOSWEET</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <h3 className={style.bold}>WHAT WE DO</h3>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>
                  How is my personal information protected?
                </td>
                <td>
                  To protect your personal information from unauthorized access
                  and use, we use security measures that comply with federal
                  law. These measures include computer safeguards and secured
                  files and buildings
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>
                  How is my personal information collected?
                </td>
                <td>
                  We collect your personal information, for example, when you:
                  <ul>
                    <li>Apply for financin</li>
                    <li>
                      Give us your income information or provide employment
                      information
                    </li>
                    <li>
                      Provide account information or give us your contact
                      information
                    </li>
                  </ul>
                  We also contact your personal information from others, such as
                  credit bureaus, affiliates or other companies
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>Why can’t I limit all sharing?</td>
                <td>
                  Federal law gives you the right to limit only{" "}
                  <ul>
                    <li>
                      Sharing for affiliates’ everyday business
                      purposes—information about your creditworthiness
                    </li>
                    <li>
                      Affiliates from using your information to market to you
                    </li>
                    <li>Sharing for nonaffiliates to market to you</li>
                  </ul>
                  State laws and individual companies may give you additional
                  rights to limit sharing.
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <h3 className={style.bold}>DEFINITIONS</h3>
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>Affiliates</td>
                <td>
                  Companies related by common ownership or control. They can be
                  financial and nonfinancial companies.
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>Nonaffiliates</td>
                <td>
                  Companies not related by common ownership or control. They can
                  be financial and nonfi nancial companies. AUTOSWEET “does not
                  share with nonaffilates so they can market to you
                </td>
              </tr>
              <tr className={style.tableRow}>
                <td className={style.bold}>Joint marketing</td>
                <td>
                  A formal agreement between nonaffiliated financial companies
                  that together market financial products or services to you.
                  Our Joint marketing partners include finance companies
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
      </Col>
    </Row>
  </>
);

export default PrivacyPolicy;
// export default class PrivacyPolicy extends Component {
//   render() {

//   }
// }
