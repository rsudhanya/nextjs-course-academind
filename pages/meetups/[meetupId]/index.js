import { Fragment } from "react";
import Head from "next/head";

import MeetupDetail from "../../../components/meetups/MeetupDetail";

import { getMeetupIds, getMeetupById } from "../../../backend/api";

let MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />
    </Fragment>
  );
};

// // If optional context is used in getStaticProps
// // It will generate static content for all possible url params
// export const getStaticPaths = async () => {
//   return {
//     fallback: false, // It means it supports only mentioned meetupId
//     // fallback: true, // It means if does not find meetupId in the paths then it will generate dynamically.
//     paths: [
//       {
//         params: {
//           meetupId: "1",
//         },
//       },
//       {
//         params: {
//           meetupId: "2",
//         },
//       },
//       {
//         params: {
//           meetupId: "3",
//         },
//       },
//     ],
//   };
// };

// // context is optional parameter. It contains little information about request. For example url params
// export const getStaticProps = (context) => {
//   const meetupId = context.params.meetupId;

//   return {
//     props: {
//       meetupData: {
//         id: meetupId,
//         title: "Meetup - 1",
//         image:
//           "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ",
//         address: "Address - 1",
//         description: "Description - 1",
//       },
//     },
//   };
// };

export const getStaticPaths = async () => {
  const data = await getMeetupIds();
  const paths = data.payload.map((item) => ({
    params: {
      meetupId: item,
    },
  }));

  return {
    fallback: "blocking",
    paths: paths,
  };
};

// context is optional parameter. It contains little information about request. For example url params
export const getStaticProps = async (context) => {
  // const url = process.env.NEXTAUTH_URL;

  const meetupId = context.params.meetupId;

  // const response = await fetch(`${url}/api/meetups/${meetupId}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await response.json();

  const data = await getMeetupById(meetupId);

  return {
    props: {
      meetupData: data.payload,
      revalidate: 100,
    },
  };
};

export default MeetupDetails;
