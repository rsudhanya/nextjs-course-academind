import Image from "next/image";

let MeetupDetail = (props) => {
  return (
    <section className="container">
      {/* <Image src={props.image} alt={`${props.title} ${"Photo"}`} height={160} width={160} /> */}
      {/* <div className={styles.meetup_detail__wrapper}> */}
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-image">
              <img src={props.image} alt={`${props.title} ${"Photo"}`} />
              <span className="card-title">{props.title}</span>
            </div>
            <div className="card-content">
              <p>{props.description}</p>
            </div>
            <div className="card-action">
              <address>{props.address}</address>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default MeetupDetail;
