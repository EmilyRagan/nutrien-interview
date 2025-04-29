import { createDefaultEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultEsmPreset({
  //...options
});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};

export default jestConfig;
