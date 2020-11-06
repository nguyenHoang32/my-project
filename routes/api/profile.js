const express = require('express');
const router = express.Router();

const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url')

const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile');
const User = require('../../models/User')
// @route GET api/profile/me
// @desc get user profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
 
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route POST api/profile
// @desc create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    const profileFields = {
      user: req.user.id,
      company,
      location,
      website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      status,
      githubusername
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialfields)) {
      if (value && value.length > 0)
        socialfields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialfields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route GET api/profile
// @desc get all profiles
// @access public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
    res.json(profiles)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

// @route GET api/profile/user/:user_id
// @desc get profile by user id
// @access public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar' ]);
    if(!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
} )

// @route DELETE api/profile
// @desc delete profile, user and post
// @access private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo - post


    await Profile.findOneAndRemove({ user: req.user.id });
    await Profile.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Account delete' })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

// @route PUT api/profile/experience
// @desc add profile experience
// @access private
router.put('/experience', [
  auth, 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
const {
  title,
  company,
  location,
  from,
  to,
  current,
  description
} = req.body;
const newExp = {
  title,
  company,
  location,
  from,
  to,
  current,
  description
}
try {
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience.unshift(newExp);
  await profile.save();
  res.json(profile); 
} catch (err) {
  console.error(err.message);
  res.status(500).send('Sever error')
  
}
})
// @route DELETE api/profile/experience/:exp_id
// @desc delete experience
// @access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });

  const index = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);
  if(index < 0){
    return res.status(400).json({ msg: 'No experience to delete' })
  }
  profile.experience.splice(index, 1);
  await profile.save();
  res.json(profile)
})
// @route PUT api/profile/education
// @desc add profile education
// @access private
router.put('/education', [
  auth,
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From data is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    description,
    current
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
    // Chua test
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
// @route DELETE api/profile/education/:edu_id
// @desc delete profile education
// @access private
router.delete('/education/:edu_id',auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const index = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    if(index < 0) return res.status(400).json({ msg: 'Not found education' })
    profile.education.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server wrong')
  }
})
// @route GET api/profile/github/:username
// @desc get rep by username
// @access public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubClientSecret")}`,
      method: 'GET',
      headers: {'user-agent': 'node.js' }
    }
    request(options, (error, response, body) => {
      if(error) console.log(error)
      if(response.statusCode !== 200)
      {
        return res.status(400).json({ msg: 'No Github profile found' })
      }
      res.json(JSON.parse(body));
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server errror')
  }
})
module.exports = router;