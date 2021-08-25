import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

import { getMeetups } from "../backend/api";

let HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // Send a http request and fetch data
  //   setLoadedMeetups(MEETUPS_DATA);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly Next Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  // const url = process.env.NEXTAUTH_URL;

  // const response = await fetch(`${url}/api/meetups`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await response.json();

  const data = await getMeetups();

  return {
    props: {
      meetups: data.payload,
      revalidate: 100,
    },
  };
};

// Two Forms of prerendering. 1. Static generation. 2. Server-side rendering

// // 1. Static generation.
// // Execute on build. Generate static content.
// // getStaticProps is nextJS built-in method name.
// export const getStaticProps = async () => {
//   // props key has to return. It will pass as parameter of props of actual method. After build it will never change.
//   // If revalidate: seconds added then for every mentioned seconds this static props will regenerate as static content even after build.
//   return {
//     props: {
//       meetups: MEETUPS_DATA,
//     },
//     revalidate: 10
//     notFound: true //Handling error
//     redirect: "path" //Redirect to another route
//   };
// };

// // 2.Server-side rendering
// // Execute on every incoming request. Generate dynamic content.
// // getServerSideProps is nextJS built-in method name.
// // context is optional parameter. It contains request and response object of nodeJS
// export const getServerSideProps = async (context) => {
//   const request = context.req;
//   const response = context.res;

//   // props key has to return. It will pass as parameter of props of actual method.
//   return {
//     props: {
//       meetups: MEETUPS_DATA,
//     },
//   };
// };

export default HomePage;
