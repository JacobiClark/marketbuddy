import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const AnalysisTabs = () => {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        {/* initially mounted */}
        <TabPanel>
          <p>one!</p>
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
