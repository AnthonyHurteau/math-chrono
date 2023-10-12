module.exports = {
  semi: true,
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  jsxBracketSameLine: false,
  importOrder: [
    "^(^react$|@react|react|^recoil$)",
    "^@mui/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
