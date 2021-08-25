import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";

let M;
if (typeof window !== "undefined") {
  M = require("materialize-css");
}

import styles from "./MeetupItem.module.css";

const MeetupItem = (props) => {
  const router = useRouter();

  const [showDetailsHandlerButton] = useState(
    `show-details-handler-tooltip-${props.id}`
  );

  const showDetailsHandler = () => {
    router.push(`/meetups/${props.id}`);
  };

  useEffect(() => {
    const showDetailsHandlerButtonId = document.getElementById(
      showDetailsHandlerButton
    );
    M.Tooltip.init(showDetailsHandlerButtonId);

    return () => {
      const elem = document.getElementById(showDetailsHandlerButton);
      if (elem) {
        const instance = M.Tooltip.getInstance(elem);
        instance.destroy();
      }
    };
  }, []);

  return (
    <li className="collection-item avatar">
      <img className="circle" src={props.image} alt={props.title} />
      <span className="title">{props.title}</span>
      <address>{props.address}</address>
      <a
        className={`secondary-content ${styles.secondary_content__mstyle}`}
        onClick={showDetailsHandler}
        id={`show-details-handler-tooltip-${props.id}`}
        data-position="bottom"
        data-tooltip={`Click to see the details of ${props.id}`}
      >
        <i className="material-icons">details</i>
      </a>
    </li>
  );
};

export default MeetupItem;
