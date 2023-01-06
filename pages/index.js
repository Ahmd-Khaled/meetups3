import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // Send a HTTP request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge meetups list'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export default HomePage;

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // Fetch Data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  // Fetch Data from an API
    // Send data to mongodb
    const client = await MongoClient.connect(`mongodb+srv://ahmed123:01117494780@cluster0.iluostq.mongodb.net/meetups2?retryWrites=true&w=majority`)
    const db = client.db();

    const meetupsCollection = db.collection('meetups2');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1,
  }
}
