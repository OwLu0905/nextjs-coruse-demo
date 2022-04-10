import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  // const [loadingMeetups, setLoadingMeetups] = useState([]);
  // useEffect(() => {
  //   // TODO : send request to get the data
  //   setLoadingMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetup"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   /**
//    * ! will not run during the build process
//    * ! Instead always on the server after deployment
//    * * this function runs for every incoming requests anyways
//    */
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  /**
   * ! only work in page component
   * * this code is executed during the build process
   * TODO: fetch data from an API
   * @return : an object (has to be named props)
   * ? outdated => add revalidate
   * ? use costom api to fetch data => don't send a request
   */

  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://owlu:s10130142@cluster0.v0bxk.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
      })),
    },
    // ! regenerate => ensure your data is never older than 10 sec
    revalidate: 1,
  };
}
export default HomePage;
