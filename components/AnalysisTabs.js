import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TextSentiment from "./TextSentiment";
import Statistics from "./Statistics";
const AnalysisTabs = ({ ticker }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Tabs align="center" isLazy onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Sentiment</Tab>
        <Tab>Financials</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextSentiment ticker={ticker} />
        </TabPanel>
        {/* initially not mounted */}
        <TabPanel>
          <Statistics ticker={ticker} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AnalysisTabs;
