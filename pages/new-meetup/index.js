// ! our-domain.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import NewMeetForm from "../../components/meetups/NewMeetupForm";
function NewMeetup() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data, "data");

    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="add your own meetups!!" />
      </Head>
      <NewMeetForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
export default NewMeetup;
