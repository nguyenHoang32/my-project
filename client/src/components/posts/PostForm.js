import React,{ useState } from 'react';

import { connect } from 'react-redux';
import { createPost } from '../../action/post';
import { useTheme } from '@material-ui/core';
import { Button } from '@material-ui/core'
const PostForm = ({createPost}) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(text);
    setText('');
  }
  return(
<form onSubmit={onSubmit}>
      <textarea
        placeholder="Create a post"
        style={{
          width: "100%",
          height: "5em",
          padding: "0.5em",
          fontSize: "1.5rem",
        }}
        name="text"
        value={text}
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
          }}>
          Submit
        </Button>
      </div>
      </form>
      
  )
}

export default connect(null, { createPost })(PostForm);