import ProfileForm from "./ProfileForm";

let M;
if (typeof window !== "undefined") {
  M = require("materialize-css");
}

const UserProfile = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      M.toast({ html: "Password changed" });
    } else {
      M.toast({ html: "Error" });
    }
  };

  return (
    <section>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
};

export default UserProfile;
