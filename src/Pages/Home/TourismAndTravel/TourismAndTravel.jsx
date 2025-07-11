import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TourismAndTravel = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList className="text-2xl">
          <Tab>Our Package</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          ৩টি র‍্যান্ডম প্যাকেজ কার্ড দেখাও

<div>
  akjf a fajiifj af
</div>

        </TabPanel>
        <TabPanel>
          ৬টি র‍্যান্ডম ট্যুর গাইড কার্ড দেখাও
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismAndTravel;
