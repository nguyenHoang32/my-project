import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateProfile, getCurrentProfile } from "../../../action/profile";

import { makeStyles } from "@material-ui/core";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@material-ui/core";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  container: {},
  small: {
    ...theme.typography.small,
  },
  marginBottom: {
    marginBottom: "1em",
  },
  noPadding: {
    paddingLeft: "0 !important",
  },
}));
const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

function CreateProfile({
  updateProfile,
  history,
  getCurrentProfile,
  profile: { profile, isLoading },
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showSocial, setShowSocial] = useState(false);
  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = formData;

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!isLoading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setFormData(profileData);
    }
  }, [isLoading, profile, getCurrentProfile]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history);
  };
  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.container}>
        <Grid item className={classes.marginBottom}>
          <Typography
            variant="h3"
            color="primary"
            className={classes.noPadding}
          >
            Create Your Profile
          </Typography>
        </Grid>
        <Grid item className={`${classes.noPadding} ${classes.marginBottom}`}>
          <Typography variant="h5">
            <i className="fa fa-user"></i>
            Let's get some information to make your profile stand out
          </Typography>
          <Typography>* = Required Field</Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item className={classes.marginBottom}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                htmlFor="outlined-age-native-simple"
                style={{ fontWeight: "bold" }}
              >
                * Select Professional Status
              </InputLabel>
              <Select
                native
                fullWidth
                label="* Select Professional Status"
                inputProps={{
                  name: "status",
                  id: "outlined-age-native-simple",
                }}
                value={status}
                required
                onChange={onChange}
                style={{ fontWeight: "bold" }}
              >
                <option aria-label="None" value="" />
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </Select>
              <small>Give us an idea of where you are at in your career</small>
            </FormControl>
          </Grid>

          <Grid item className={classes.marginBottom}>
            <TextField
              label="Company"
              fullWidth
              variant="outlined"
              name="company"
              value={company || ""}
              onChange={onChange}
            />
            <small>Could be your own company or one you work for</small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <TextField
              label="Website"
              fullWidth
              variant="outlined"
              name="website"
              value={website || ""}
              onChange={onChange}
            />
            <small>Could be your own or a company website</small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <TextField
              label="Location"
              fullWidth
              variant="outlined"
              name="location"
              value={location || ""}
              onChange={onChange}
            />
            <small>City & state suggested (eg. Boston, MA)</small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <TextField
              label="* Skills"
              fullWidth
              variant="outlined"
              required
              name="skills"
              value={skills || ""}
              onChange={onChange}
            />
            <small>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <TextField
              label="Github Username"
              fullWidth
              variant="outlined"
              name="githubusername"
              value={githubusername || ""}
              onChange={onChange}
            />
            <small>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <textarea
              placeholder="A short bio of you"
              style={{ width: "100%" }}
              rows="3"
              name="bio"
              value={bio || ""}
              onChange={onChange}
            />
            <small>Tell us a little about yourself</small>
          </Grid>
          <Grid item className={classes.marginBottom}>
            <Button
              fullWidth={false}
              variant="contained"
              value={showSocial}
              onClick={() => {
                setShowSocial(!showSocial);
                setFormData({
                  ...formData,
                  twitter: "",
                  facebook: "",
                  linkedin: "",
                  youtube: "",
                  instagram: "",
                })
              }}
            >
              Add Social Network Links
            </Button>
          </Grid>
          {showSocial && (
            <React.Fragment>
              <Grid item className={classes.marginBottom}>
                <TextField
                  label="Twitter URL"
                  fullWidth
                  name="twitter"
                  value={twitter || ""}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon htmlColor="#1DA1F2" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes.marginBottom}>
                <TextField
                  label="Facebook URL"
                  fullWidth
                  name="facebook"
                  value={facebook || ""}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon htmlColor="#4267B2" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes.marginBottom}>
                <TextField
                  label="Youtube URL"
                  fullWidth
                  name="youtube"
                  value={youtube || ""}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTubeIcon htmlColor="red" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes.marginBottom}>
                <TextField
                  label="Linkedin URL"
                  fullWidth
                  name="linkedin"
                  value={linkedin || ""}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon htmlColor="#2867B2" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes.marginBottom}>
                <TextField
                  label="Instagram URL"
                  fullWidth
                  name="instagram"
                  value={instagram || ""}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon htmlColor="#405DE6" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </React.Fragment>
          )}
          <Grid item className={classes.marginBottom}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              style={{ marginRight: "1em" }}
            >
              Send
            </Button>
            <Button variant="contained" component={Link} to="/dashboard">
              Go back
            </Button>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
}
CreateProfile.propTypes = {
  updateProfile: PropTypes.func,
};
const mapState = (state) => ({
  profile: state.profile,
});
export default connect(mapState, { updateProfile, getCurrentProfile })(
  CreateProfile
);
