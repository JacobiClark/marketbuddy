import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TextSentiment from "./TextSentiment";
import Statistics from "./Statistics";
const AnalysisTabs = ({ ticker }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Tabs isLazy onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Statistics</Tab>
        <Tab>Sentiment</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Statistics ticker={ticker} />
        </TabPanel>
        {/* initially not mounted */}
        <TabPanel>
          <TextSentiment ticker={ticker} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AnalysisTabs;
