import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxItemFill } from "../../store/inbox-slice";
import { sentboxItemFill } from "../../store/sentbox-slice";
import 'bootstrap/dist/css/bootstrap.min.css';

import classes from "./SideBar.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inboxItems = useSelector((state) => state.inbox.inboxItems);

  const composeClickHandler = () => {
    navigate("/profile/compose", { replace: true });
  };

  const inboxClickHandler = async () => {
    navigate("/profile/inbox", { replace: true });
    dispatch(inboxItemFill(auth.email));
  };
  let totalUnread = 0;
  inboxItems.forEach((element) => {
    if (element[1].unread) {
      totalUnread++;
    }
  });

  const sentboxClickHandler = async () => {
    navigate("/profile/sentbox", { replace: true });
    dispatch(sentboxItemFill(auth.email));
  };

  return (
    <Fragment>
      <div className={classes.mailCon}>
        <table className="d-md-table">
          <tbody>
            <tr>
              <td>
                <Button variant="primary" onClick={composeClickHandler}>
                  Compose
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-secondary" onClick={inboxClickHandler}>
                  Inbox<p style={{ color: "red" }}>unread {totalUnread}</p>
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-success" onClick={sentboxClickHandler}>Sentbox</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-warning">Outbox</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-danger">Spam</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-info">Recyle bin</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-dark">Starred</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default SideBar;
