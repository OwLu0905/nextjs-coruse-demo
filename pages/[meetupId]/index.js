// ! our-domain.com/meetupId
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function DetailMeetup(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://owlu:s10130142@cluster0.v0bxk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // TODO : find ({}) => give me all the objects
  // TODO : find ({}, {id:1}) => which field should be extracted
  // TODO :  (here is only include the _id)
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  /**
   * * getStaticProps context variable comes from getStaticPaths()
   * ? : get the path (which is equal to the meetupId
   * TODO : context.params.meetupId (line 34)
   */
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://owlu:s10130142@cluster0.v0bxk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetups);
  client.close();

  // ! identifier from the [meetupId]
  // ! selectedMeetups id is an object (we use findOne to get the raw data)
  // TODO : convert the id to string
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      },
    },
  };
}

export default DetailMeetup;
