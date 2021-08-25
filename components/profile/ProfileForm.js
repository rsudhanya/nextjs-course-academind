import { useRef } from "react";

const ProfileForm = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="row">
              <form className="col s12" onSubmit={submitHandler}>
                <div className="input-field">
                  <input
                    className="validate"
                    type="password"
                    id="new-password"
                    ref={newPasswordRef}
                  />
                  <label htmlFor="new-password">New Password</label>
                </div>
                <div>
                  <input
                    className="validate"
                    type="password"
                    id="old-password"
                    ref={oldPasswordRef}
                  />
                  <label htmlFor="old-password">Old Password</label>
                </div>
                <div>
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
