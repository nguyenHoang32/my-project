import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addComment } from '../../action/post';


import { useTheme } from '@material-ui/core'
import { Button } from '@material-ui/core'
const CommentForm = ({addComment, match}) => {
  const theme = useTheme();
  const [str, setStr] = useState("");
  const onChange = (e) => {
    setStr(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(match.params.id, str);
    setStr('');
  };
  return(
<form onSubmit={onSubmit}>
          <textarea
            placeholder="Leave a comment"
            style={{
              width: "100%",
              height: "5em",
              padding: "0.5em",
              fontSize: "1.5rem",
            }}
            name="str"
            value={str}
            onChange={onChange}
            required
          />
          <div>
            <Button
              variant="contained"
              type="submit"
              style={{
                color: "white",
                backgroundColor: theme.palette.common.dark,
                marginBottom: "2em",
                marginTop: "1em",
              }}
            >
              Submit
            </Button>
          </div>
        </form>
  )
}
export default connect(null, { addComment})(CommentForm);