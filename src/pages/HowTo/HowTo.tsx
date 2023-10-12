import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, styled } from "@mui/material";
import { SxObj } from "@/theme/types";
import { HowToMenuItem, HowToProps } from "./types";
import {
  divisionMaximumMax,
  divisionOperandsMax,
  maximumMax,
  operandsMaxInit,
  tablesMaximumMax,
  tablesMaximumMin,
  validationMinMax,
} from "../Params/Params";
import HowToMenu from "./HowToMenu";

const sxStyles = (isMobile: boolean): SxObj => {
  return {
    title: {
      fontSize: isMobile ? "36px" : "56px",
    },
    bulletTitle: { fontSize: "24px" },
    imageCaption: { fontSize: "16px", fontStyle: "italic" },
    iconImgContainer: { textAlign: "center", display: "block" },
  };
};

export default function HowToComponent(props: HowToProps) {
  const { isMobile, isXLarge, themeMode } = props;
  const [t] = useTranslation();
  const { i18n } = useTranslation();
  const classes = sxStyles(isMobile);

  type WikiLinkKeys = keyof typeof wikipediaLink;
  const wikipediaLink = {
    en: "Progressive_web_application",
    fr: "Progressive_web_app",
    de: "Progressive_Web_App",
  };

  const iconBox = (
    <Typography component="span" sx={classes.iconImgContainer}>
      <img width={"100px"} src={"logo192.png"} alt="App icon" />
      <br />
      <Typography component="span" sx={classes.imageCaption}>
        {t("howTo.pwa.installImage1")}
      </Typography>
    </Typography>
  );

  const SectionPaddingParagraph = styled("p")({
    paddingBottom: 25,
  });

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
          <SectionPaddingParagraph>
            {t("howTo.general.text2")}
          </SectionPaddingParagraph>
        </Fragment>
      ),
      list: [],
    },
    {
      title: t("howTo.params.title"),
      key: howToKey,
      list: [
        {
          title: t("howTo.params.tablesTitle"),
          key: paramsKey,
          content: <p>{t("howTo.params.tablesText1")}</p>,
        },
        {
          title: t("howTo.params.timerTitle"),
          key: paramsKey,
          content: <p>{t("howTo.params.timerText")}</p>,
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
              <br />
              {t("howTo.params.numberOperandsText4")}
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
              <br />
              {t("howTo.params.operatorsText4")}
            </p>
          ),
        },
        {
          title: t("howTo.params.tablesRangeTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.tablesRangeText1")}
              <br />
              {t("howTo.params.tablesRangeText2")}
              <br />
              {t("howTo.params.tablesRangeText3")}
              {tablesMaximumMin}
              {t("howTo.params.tablesRangeText4")}
              {tablesMaximumMax}
              {t("howTo.params.tablesRangeText5")}
              <br />
              {t("howTo.params.tablesRangeText6")}
            </p>
          ),
        },
        {
          title: t("howTo.params.tablesSelectionTitle"),
          key: paramsKey,
          content: (
            <p>
              {t("howTo.params.tablesSelectionText1")}
              <br />
              {t("howTo.params.tablesSelectionText2")}
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
              <br />
              {t("howTo.params.maximumValueText4")}
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
          <SectionPaddingParagraph>
            {t("howTo.math.text4")}
          </SectionPaddingParagraph>
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
                wikipediaLink[i18n.language as WikiLinkKeys]
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
                src={`install-${themeMode}.png`}
                alt="Computer installation button"
              />
              <Typography component="span" sx={classes.imageCaption}>
                {t("howTo.pwa.installComputerImage1")}
              </Typography>
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
                src={`
                /mobile-install-${themeMode}-${i18n.language.substring(
                  0,
                  2
                )}.png`}
                alt="Mobile nstallation notification"
              />
              <Typography component="span" sx={classes.imageCaption}>
                {t("howTo.pwa.installMobileImage1")}
              </Typography>
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

  const menuItems: HowToMenuItem[] = listItems.map((l) => {
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

  const ListContainer = styled("ol")(
    isMobile
      ? {
          paddingInlineStart: 0,
          listStyleType: "none",
          paddingBottom: "10px",
        }
      : {
          paddingRight: "40px",
        }
  );

  const TitleListItem = styled("li")({
    fontSize: isMobile ? "28px" : "36px",
    scrollMarginTop: "65px",
  });

  const BulletListItem = styled("li")({
    scrollMarginTop: "65px",
    paddingBottom: 15,
  });

  const BulletList = styled("ul")(
    isMobile
      ? {
          textAlign: "left",
          paddingInlineStart: 0,
          listStyleType: "none",
          paddingBottom: "10px",
        }
      : {
          textAlign: "left",
        }
  );

  return (
    <Fragment>
      <br />
      <Box sx={classes.title}>{t("howTo.title")}</Box>
      <Box>
        <HowToMenu menuItems={menuItems} isMobile={isMobile}></HowToMenu>
        <ListContainer>
          {listItems.map((l, i) => (
            <Fragment key={l.key + i}>
              <TitleListItem id={l.key + i}>{l.title}</TitleListItem>
              {l.content}
              {l.list.length > 0 ? (
                <Fragment>
                  <br />
                  <BulletList>
                    {l.list.map((li, i) => (
                      <BulletListItem key={li.key + i} id={li.key + i}>
                        <Typography component="span" sx={classes.bulletTitle}>
                          {li.title}
                        </Typography>
                        {li.content}
                      </BulletListItem>
                    ))}
                  </BulletList>
                </Fragment>
              ) : null}
            </Fragment>
          ))}
        </ListContainer>
      </Box>
    </Fragment>
  );
}
