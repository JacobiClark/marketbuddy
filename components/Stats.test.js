import React from "react";
import renderer from "react-test-renderer";

import Stats from "./Stats";

it("Renders correctly without items", () => {
  const tree = renderer.create(<Stats />).toJSON();
  expect(tree).toMatchSnapshot();
});
