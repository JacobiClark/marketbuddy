import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TextSentiment from "./TextSentiment";
const AnalysisTabs = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Tabs isLazy onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Sentiment</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        {/* initially mounted */}
        <TabPanel>
          <TextSentiment />
        </TabPanel>
        {/* initially not mounted */}
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AnalysisTabs;
