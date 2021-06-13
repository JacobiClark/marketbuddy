import React from "react";
import renderer from "react-test-renderer";

import Statistics from "./Statistics";

it("Renders correctly without items", () => {
  const tree = renderer.create(<Statistics />).toJSON();
  expect(tree).toMatchSnapshot();
});
