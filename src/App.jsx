import { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { v4 as uuid } from "uuid";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, addQuestion } from "./store/answerSlice";

function App() {
  const [isReply, setIsReply] = useState(false);
  let id = uuid();
  const [value, setValue] = useState({
    id: null,
    question: "",
    answers: "",
  });
  useEffect(() => {
    console.log(questions);
  }, [isReply]);
  const questions = useSelector((state) => state.answer.questions);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isReply) {
      dispatch(addAnswer(value));
    } else {
      dispatch(addQuestion(value));
    }
  };

  const handleChange = (e) => {
    isReply
      ? setValue({
          ...value,
          answers: e.target.value,
          id: id,
        })
      : setValue({
          ...value,
          id: id,
          question: e.target.value,
        });
  };
  return (
    <>
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>

        {questions &&
          questions.map((item) => {
            return (
              <>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Tahira</Comment.Author>
                    <Comment.Metadata>
                      <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{item.payload?.question}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={() => setIsReply(true)}>
                        Reply
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                  {item.payload?.answers ? (
                    <Comment.Group key={id}>
                      <Comment>
                        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                        <Comment.Content>
                          <Comment.Author as="a">Tahir</Comment.Author>
                          <Comment.Metadata>
                            <div>Just now</div>
                          </Comment.Metadata>
                          <Comment.Text>{item.payload?.answers}</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  ) : (
                    <></>
                  )}
                </Comment>
              </>
            );
          })}
        <Form reply>
          <Form.TextArea onChange={(e) => handleChange(e)} />
          <Button
            onClick={() => handleClick(value)}
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </>
  );
}

export default App;
