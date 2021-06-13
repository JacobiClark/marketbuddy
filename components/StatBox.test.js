import React from "react";
import renderer from "react-test-renderer";

import StatBox from "./StatBox";

it("Renders correctly without items", () => {
  const tree = renderer.create(<StatBox />).toJSON();
  expect(tree).toMatchSnapshot();
});
