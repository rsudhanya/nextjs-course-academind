import MeetupItem from "./MeetupItem";

const MeetupList = (props) => {
  return (
    <div className="container">
      <ul className="collection">
        {props.meetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeetupList;
