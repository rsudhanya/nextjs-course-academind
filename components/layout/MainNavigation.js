import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { useEffect } from "react";

let M;
if (typeof window !== "undefined") {
  M = require("materialize-css");
}

const MainNavigation = () => {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  useEffect(() => {
    const mobileNav = document.getElementById("mobile-nav");
    M.Sidenav.init(mobileNav);
  }, []);

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <Link href="/" className="brand-logo">
            React Meetups
          </Link>
          <a
            href="#!"
            type="button"
            data-target="mobile-nav"
            className="sidenav-trigger"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link href="/">All Meetups</Link>
            </li>
            {session && (
              <li>
                <Link href="/new-meetup">Add New Meetup</Link>
              </li>
            )}
            {!session && !loading && (
              <li>
                <Link href="/auth">Login</Link>
              </li>
            )}
            {session && (
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            )}
            {session && (
              <li>
                <button
                  className="waves-effect waves-light btn red"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-nav">
        <li>
          <Link href="/">All Meetups</Link>
        </li>
        {session && (
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
        )}
        {!session && !loading && (
          <li>
            <Link href="/auth">Login</Link>
          </li>
        )}
        {session && (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {session && (
          <li>
            <button
              className="waves-effect waves-light btn red"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default MainNavigation;
