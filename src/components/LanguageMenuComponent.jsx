import React, { useState, Fragment, useMemo, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LanguageMenuComponent(props) {
  const { i18n } = useTranslation();
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
      <IconButton
        color="primary"
        onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: props.isMobile ? "top" : "bottom",
          horizontal: props.isMobile ? "left" : "center",
        }}
        transformOrigin={{
          vertical: props.isMobile ? "top" : "top",
          horizontal: props.isMobile ? "right" : "center",
        }}
      >
        {languageItems.map((l, i) => (
          <MenuItem
            key={"langItem" + i}
            selected={i === selectedIndex}
            onClick={() => {
              i18n.changeLanguage(l.lang);
              handleClose();
              props.handleTopMenuClose();
            }}
          >
            {l.description}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
