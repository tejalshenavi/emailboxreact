import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import classes from "./SentBox.module.css";
import { useNavigate } from "react-router-dom";
import { sentboxActions } from "../../store/sentbox-slice";
import { MdDelete } from "react-icons/md";

const SentBox = () => {
  const sentboxItem = useSelector((state) => state.sentbox.sentboxItems);
  //   console.log(SentBoxItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

    const clickEmailHanler = async (item) => {
      console.log(item);
      navigate("/profile/sentbox/message", { replace: true });
      dispatch(sentboxActions.addMessageOpen(item));
    };

    const clickDeleteHandler = async (deleteItem) => {
      // console.log(item);
      dispatch(sentboxActions.removeItem(deleteItem));
      const email = auth.email.replace(/[.@]/g, "");
      try {
          const resDlt = await fetch(`https://email-c485e-default-rtdb.firebaseio.com/${email}/sentEmails/${deleteItem[0]}.json`,{
              method: 'DELETE'
          })
          if(!resDlt.ok){
            throw Error ('Failed to delete')
        }
      } catch(error) {
          alert(error);
      }
    };

  return (
    <section className={classes.SentBoxCon}>
      <h3>Sentbox</h3>
      <Table striped hover>
        <thead>
          <tr>
            {/* <th>Status</th> */}
            <th>Reciever</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sentboxItem.map((i) => (
            <tr 
            onClick={() => clickEmailHanler(i)} 
            key={i[0]}
            >
              <td>To:{i[1].to}</td>
              <td>{i[1].emailSub}</td>
              <td>{i[1].date}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clickDeleteHandler(i);
                  }}
                >
                  <MdDelete style={{ color: "red", border: "black" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default SentBox;
