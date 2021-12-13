import userSchema from "../models/userModel";
import queryString from "query-string";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

//@desc   Make Instructor
//@routes POST /api/role/make-instructor
//@access PRIVATE
export const makeInstructor = async (req, res) => {
  try {
    // 1. find user from database
    const user = await userSchema.findById(req.user.id).exec();

    // 2. if user don't have stripe_account_id,then create new Id
    // express is type of account in stripe
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({
        type: "standard",
      });

      user.stripe_account_id = account.id;
      user.save();
    }

    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });

    // 4. pre-fill any info such as email address(optional), then send url response to frontend user
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });

    // 5. then send the account link as response to frontend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (error) {
    console.log(error);
  }
};

//@desc   Get Account Status
//@routes POST /api/role/get-account-status
//@access PRIVATE
export const getAccountStatus = async (req, res) => {
  try {
    // 1. find user from database
    const user = await userSchema.findById(req.user.id).exec();

    // 2. find the account
    const account = await stripe.accounts.retrieve(user.stripe_account_id);

    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized");
    } else {
      const statusUpdated = await userSchema
        .findByIdAndUpdate(
          user._id,
          {
            stripe_seller: account,
            $addToSet: { role: "Instructor" },
          },
          { new: true }
        )
        .select("-password")
        .exec();

      res.json(statusUpdated);
    }
  } catch (error) {
    console.log(error);
  }
};
