import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

let NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetup) => {
    const response = await fetch("/api/meetups", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>New Next Meetups</title>
        <meta
          name="description"
          content="Create a highly available Next Meetups"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default NewMeetupPage;
