const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const UserProfile = require('../model/UserProfile');

router.use(bodyParser.json())


//Route :1 add profile details  POST:"/api/profile/add"

router.post('/add', fetchuser, [
    body('username', "User name very short.").isLength({ min: 3 }),
    body('bio', " is too short").isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let image = (req.body.profileImage).replace(/^.*[\\\/]/, '');
    // console.log(req.body.profileImage)

    try {
        let profile = await UserProfile.create({
            user: req.user.id,
            username: req.body.username,
            profileImage: image,
            bio: req.body.bio
        });

        success = true;
        res.json({ success })

    } catch (e) {
        console.log(e)
        res.status(500).json({ success, message: "Internal Error found" });
    }
});

//Route :2 view profile  GET:"/profile/view"
router.get('/view',fetchuser, async (req, res) => {
    try {
        const docs = await UserProfile.find({user:req.user.id});
        res.json(docs)
    } catch (err) { console.log(err); }
})

//Route :3 delete profle The admin DELETE:"/api/profile/delete/objectId"
router.delete('/delete/:id',fetchuser, async (req, res) => {
    try {
        let success = false;
        let profile = await UserProfile.findById(req.params.id);
        if (!profile) { return res.status(401).send("Not found") }

        profile = await UserProfile.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, profile, message: 'profile has been deleted' });
    } catch (err) { console.log(err); }
})

//Route :4 UPDATE profile by the user PUT:"/updateFood/:id"
router.put('/update/:id',fetchuser, async (req, res) => {

    let success = false;
    const { username, bio  } = req.body;
    let image;

    if (req.body.profileImage)
        image = (req.body.profileImage).replace(/^.*[\\\/]/, '');

    // create a update object
    const updateProfile = {};
    // if "image" is given in the req.body then set the upadate otherwise previous count
    if (image) updateProfile.image = image;
    if (username) updateProfile.username = username;
    if (bio) updateProfile.bio = bio;
    
    let profile = await UserProfile.findById(req.params.id);
    // Check the user is exit or not
    if (!profile) {
        res.status(400).json({ success, message: "Food not found" });
    }

    profile = await UserProfile.findByIdAndUpdate(req.params.id, { $set: updateProfile }, { new: true });
    success = true;
    res.json({ success, profile })
});

 
module.exports = router;