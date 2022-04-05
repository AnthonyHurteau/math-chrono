import React, { useState, Fragment, useMemo, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  menuItem: (isLarge) => ({
    width: isLarge ? "200px" : null,
  }),
}));

export default function LanguageMenuComponent({
  isLarge,
  handleTopMenuClose,
  button,
  icon,
}) {
  const [t] = useTranslation();
  const { i18n } = useTranslation();
  const classes = useStyles(isLarge);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const languageItems = useMemo(
    () => [
      {
        description: "Français",
        lang: "fr",
      },
      {
        description: "English",
        lang: "en",
      },
      {
        description: "Deutsch",
        lang: "de",
      },
    ],
    []
  );

  useEffect(() => {
    if (i18n.language) {
      const langIndex = languageItems.findIndex(
        (l) => l.lang === i18n.language
      );
      setSelectedIndex(langIndex);
    }
  }, [i18n.language, languageItems]);

  return (
    <Fragment>
      <Button
        variant="contained"
        className={button}
        aria-label="language-button"
        color="secondary"
        onClick={handleClick}
      >
        <LanguageIcon className={icon} />
        <Typography>{t("navbar.locale")}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: isLarge ? "bottom" : "top",
          horizontal: isLarge ? "center" : "left",
        }}
        transformOrigin={{
          vertical: isLarge ? "top" : "top",
          horizontal: isLarge ? "center" : "right",
        }}
      >
        {languageItems.map((l, i) => (
          <MenuItem
            className={classes.menuItem}
            sx={{ justifyContent: "center" }}
            key={"langItem" + i}
            selected={i === selectedIndex}
            onClick={() => {
              i18n.changeLanguage(l.lang);
              handleClose();
              handleTopMenuClose();
            }}
          >
            {l.description}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
