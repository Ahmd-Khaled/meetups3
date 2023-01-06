import { Fragment } from "react";
import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name='description'
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail 
        image= {props.meetupData.image}
        title= {props.meetupData.title}
        address= {props.meetupData.address}
        description= {props.meetupData.description}
      />
    </Fragment>
  )
}

export default MeetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(`mongodb+srv://ahmed123:01117494780@cluster0.iluostq.mongodb.net/meetups2?retryWrites=true&w=majority`)
  const db = client.db();

  const meetupsCollection = db.collection('meetups2');

  const meetups = await meetupsCollection.find({}, { _id: 1}).toArray();  // {}-> to get all meetups, { _id: 1}--> but extract their ids only

  client.close();
  
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(`mongodb+srv://ahmed123:01117494780@cluster0.iluostq.mongodb.net/meetups2?retryWrites=true&w=majority`)
  const db = client.db();

  const meetupsCollection = db.collection('meetups2');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
    }
  }
}
