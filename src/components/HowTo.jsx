import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  divisionMaximumMax,
  divisionOperandsMax,
  maximumMax,
  operandsMaxInit,
  validationMinMax,
} from "./ParamsComponent";
import HowToMenu from "./HowToMenu";

const useStyles = makeStyles((theme) => ({
  title: (props) => ({
    fontSize: props.isMobile ? "36px" : "56px",
  }),
  titles: (props) => ({
    fontSize: props.isMobile ? "28px" : "36px",
  }),
  scrollMargin: { scrollMarginTop: "65px" },
  sectionPadding: { paddingBottom: 25 },
  bulletPadding: { paddingBottom: 15 },
  bulletTitle: { fontSize: "24px" },
  bullets: { textAlign: "left" },
  largeList: {
    paddingRight: "40px",
  },
  mobileList: {
    paddingInlineStart: 0,
    listStyleType: "none",
    paddingBottom: "10px",
  },
  imageCaption: { fontSize: "16px", fontStyle: "italic" },
  iconImgContainer: { textAlign: "center", display: "block" },
}));

export default function HowTo(props) {
  const [t] = useTranslation();
  const { i18n } = useTranslation();
  const classes = useStyles(props);

  const wikipediaLink = {
    en: "Progressive_web_application",
    fr: "Progressive_web_app",
    de: "Progressive_Web_App",
  };

  const iconBox = (
    <span className={classes.iconImgContainer}>
      <img
        width={"100px"}
        src={`${process.env.PUBLIC_URL}/logo192.png`}
        alt="App icon"
      />
      <br />
      <span className={classes.imageCaption}>
        {t("howTo.pwa.installImage1")}
      </span>
    </span>
  );

  const howToKey = "howTo";
  const paramsKey = "params";
  const mathKey = "math";
  const pwaKey = "pwa";
  const listItems = [
    {
      title: t("howTo.general.title"),
      key: howToKey,
      content: (
        <Fragment>
          <p>{t("howTo.general.text1")}</p>
          <p className={classes.sectionPadding}>{t("howTo.general.text2")}</p>
        </Fragment>
      ),
      list: [],
    },
    {
      title: t("howTo.params.title"),
      key: howToKey,
      list: [
        {
          title: t("howTo.params.timerTitle"),
          key: paramsKey,
          content: <p>{t("howTo.params.timerText")}</p>,
        },
        {
          title: t("howTo.params.numberOperandsTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.numberOperandsText1")}
              <br />
              {t("howTo.params.genericMinimum")}
              {validationMinMax.operandsMin}
              {t("howTo.params.genericMaximum")}
              {operandsMaxInit}
              {t("howTo.params.numberOperandsText2")}
              <br />
              {t("howTo.params.numberOperandsText3")}
              {divisionOperandsMax}
            </p>
          ),
        },
        {
          title: t("howTo.params.operatorsTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.operatorsText1")}
              <br />
              {t("howTo.params.operatorsText2")}
              <br />
              {t("howTo.params.operatorsText3")}
            </p>
          ),
        },
        {
          title: t("howTo.params.numberOperationsTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.numberOperationsText1")}
              <br />
              {t("howTo.params.genericMinimum")}
              {validationMinMax.amountMin}
              {t("howTo.params.genericMaximum")}
              {validationMinMax.amountMax}
              {t("howTo.params.numberOperationsText2")}
            </p>
          ),
        },
        {
          title: t("howTo.params.maximumValueTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.maximumValueText1")}
              <br />
              {t("howTo.params.maximumValueText2")}
              {maximumMax}
              <br />
              {t("howTo.params.maximumValueText3")}
              {divisionMaximumMax}
            </p>
          ),
        },
        {
          title: t("howTo.params.negativeNumbersTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.negativeNumberstext1")}
              <br />
              {t("howTo.params.negativeNumberstext2")}
            </p>
          ),
        },
      ],
    },
    {
      title: t("howTo.math.title"),
      key: mathKey,
      content: (
        <Fragment>
          <p>
            {t("howTo.math.text1")}
            {t("math.start")}
            {t("howTo.math.text2")}
            {t("math.done")}
            {t("howTo.math.text3")}
          </p>
          <p className={classes.sectionPadding}>{t("howTo.math.text4")}</p>
        </Fragment>
      ),
      list: [],
    },
    {
      title: t("howTo.pwa.title"),
      key: pwaKey,
      content: (
        <Fragment>
          <p>{t("howTo.pwa.text1")}</p>
          <p>{t("howTo.pwa.text2")}</p>
          <p>
            {t("howTo.pwa.text3")}
            <a
              href={`https://${i18n.language}.wikipedia.org/wiki/${
                wikipediaLink[i18n.language]
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("howTo.pwa.text4")}
            </a>
          </p>
        </Fragment>
      ),
      list: [
        {
          title: t("howTo.pwa.installComputerTitle"),
          key: pwaKey,
          content: (
            <p>
              {t("howTo.pwa.installComputerText1")}
              <br />
              <br />
              <img
                width={"100%"}
                src={`${process.env.PUBLIC_URL}/install-${props.themeMode}.png`}
                alt="Computer installation button"
              />
              <span className={classes.imageCaption}>
                {t("howTo.pwa.installComputerImage1")}
              </span>
              <br />
              <br />
              {t("howTo.pwa.installComputerText2")}
              <br />
              <br />
              {iconBox}
              <br />
              {t("howTo.pwa.installComputerText3")}
            </p>
          ),
        },
        {
          title: t("howTo.pwa.installMobileTitle"),
          key: pwaKey,
          content: (
            <p>
              {t("howTo.pwa.installMobileText1")}
              <br />
              <br />
              <img
                width={"100%"}
                src={`${process.env.PUBLIC_URL}/mobile-install-${
                  props.themeMode
                }-${i18n.language.substring(0, 2)}.png`}
                alt="Mobile nstallation notification"
              />
              <span className={classes.imageCaption}>
                {t("howTo.pwa.installMobileImage1")}
              </span>
              <br />
              <br />
              {t("howTo.pwa.installMobileText2")}
              <br />
              <br />
              {iconBox}
              <br />
              {t("howTo.pwa.installMobileText3")}
            </p>
          ),
        },
      ],
    },
  ];

  const menuItems = listItems.map((l) => {
    return {
      title: l.title,
      key: l.key,
      list:
        l.list.length > 0
          ? l.list.map((ll) => {
            return { title: ll.title, key: ll.key };
          })
          : [],
    };
  });

  return (
    <Fragment>
      <br />
      <span className={classes.title}>{t("howTo.title")}</span>
      <Box>
        <HowToMenu
          menuItems={menuItems}
          isMobile={props.isMobile}
          isXLarge={props.isXLarge}
        ></HowToMenu>
        <ol className={props.isMobile ? classes.mobileList : classes.largeList}>
          {listItems.map((l, i) => (
            <Fragment key={l.key + i}>
              <li
                id={l.key + i}
                className={`${classes.titles} ${classes.scrollMargin}`}
              >
                {l.title}
              </li>
              {l.content}
              {l.list.length > 0 ? (
                <Fragment>
                  <br />
                  <ul
                    className={`${classes.bullets} ${
                      props.isMobile ? classes.mobileList : null
                    }`}
                  >
                    {l.list.map((li, i) => (
                      <li
                        key={li.key + i}
                        id={li.key + i}
                        className={`${classes.bulletPadding} ${classes.scrollMargin}`}
                      >
                        <span className={classes.bulletTitle}>{li.title}</span>
                        {li.content}
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </Box>
    </Fragment>
  );
}
