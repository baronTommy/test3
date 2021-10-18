module.exports = {
  "*.json": ["yarn fmt"],
  "*.md": ["yarn fmt"],
  "*.yml": ["yarn fmt"],
  "*.js": ["yarn lint", "yarn fmt"],
  "*.{ts,tsx}": ["yarn lint", "yarn fmt"],
};
