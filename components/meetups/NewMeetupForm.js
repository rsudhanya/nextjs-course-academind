import { useRef } from "react";

const NewMeetupForm = (props) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="row">
              <form className="col s12" onSubmit={submitHandler}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="meetup-title"
                      type="text"
                      className="validate"
                      required
                      ref={titleInputRef}
                    />
                    <label htmlFor="meetup-title">Meetup Title</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="meetup-image"
                      type="text"
                      className="validate"
                      required
                      ref={imageInputRef}
                    />
                    <label htmlFor="meetup-image">Meetup Image</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="meetup-address"
                      type="text"
                      className="validate"
                      required
                      ref={addressInputRef}
                    />
                    <label htmlFor="meetup-address">Meetup Address</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="meetup-description"
                      className="materialize-textarea"
                      required
                      ref={descriptionInputRef}
                    ></textarea>
                    <label htmlFor="meetup-description">Meetup Description</label>
                  </div>
                </div>

                <div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                  >
                    Add Meetup
                    <i className="material-icons right">add</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMeetupForm;
