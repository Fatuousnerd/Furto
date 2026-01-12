const { nanoid } = require("nanoid");

const genProd = () => `prod-${nanoid(10)}`;

module.exports = { genProd };
