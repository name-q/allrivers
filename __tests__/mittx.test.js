test("test cjs mittx", () => {
  const mittx = require("../dist/cjs/mittx").default;
  const msg = mittx();

  const handle = (value) => value;
  msg.on("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(true);

  msg.off("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(false);
});


test("test esm mittx", () => {
  const mittx = require("../dist/esm/mittx").default;
  const msg = mittx();

  const handle = (value) => value;
  msg.on("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(true);

  msg.off("xxx", handle);

  expect(msg.emit("xxx", 1)).toBe(false);
});
