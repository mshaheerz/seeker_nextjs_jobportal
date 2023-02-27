import usermodel from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import postmodel from "../model/postSchema.js";
import commentmodel from "../model/commentSchema.js";
import likemodel from "../model/likeSchema.js";
import jobmodel from "../model/jobSchema.js";
import jobapplymodel from "../model/jobapplySchema.js";
import companymodel from "../model/company/companySchema.js";
import notificationmodel from "../model/notificationSchema.js";
import reportmodel from "../model/reportSchema.js";

export async function validateSignup(req, res) {
  try {
    let obj = req.body
    let regName = /^[a-zA-Z]+$/;
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mob = /^([+]\d{2})?\d{10}$/
    if (obj.firstname && obj.lastname && obj.email && obj.password && obj.cpassword) {
      if (regName.test(obj.firstname.toString())) {
        if (regName.test(obj.lastname.toString())) {

          if (regEmail.test(obj.email.toString())) {

            if (obj.password === obj.cpassword) {

              if (mob.test(obj.phone.toString())) {


                let user = await usermodel.findOne({ email: obj.email })
                if (!user) {
                  let usertwo = await usermodel.findOne({ phone: obj.phone })
                  if (!usertwo) {

                    res.json({ "status": "success", "message": "approved" })




                  } else {
                    res.json({ "status": "failed", "message": "Phone number already registered" })
                  }
                } else {
                  res.json({ "status": "failed", "message": "Email already registered" })
                }


              } else {
                res.json({ "status": "failed", "message": "Enter valid Phone number" })
              }
            } else {
              res.json({ "status": "failed", "message": "password and confirm password error" })
            }
          } else {
            res.json({ "status": "failed", "message": "Enter valid Email" })
          }
        } else {
          res.json({ "status": "failed", "message": "Enter valid lastname" })
        }
      } else {
        res.json({ "status": "failed", "message": "Enter valid firstname" })
      }
    } else {
      // res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })
      res.json({ "status": "failed", "message": "All fields are required" })
    }


  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function signup(req, res) {
  try {
    let obj = req.body
    let regName = /^[a-zA-Z]+$/;
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mob = /^([+]\d{2})?\d{10}$/
    if (obj.firstname && obj.lastname && obj.email && obj.password && obj.cpassword) {
      if (regName.test(obj.firstname.toString())) {
        if (regName.test(obj.lastname.toString())) {

          if (regEmail.test(obj.email.toString())) {

            if (obj.password === obj.cpassword) {

              if (mob.test(obj.phone.toString())) {


                let user = await usermodel.findOne({ email: obj.email })
                if (!user) {
                  let usertwo = await usermodel.findOne({ phone: obj.phone })
                  if (!usertwo) {
                    try {

                      await obj.otpverify.confirm(obj.otp)

                    } catch (error) {
                      console.log(error)
                    }

                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(obj.password.trim(), salt)
                    await usermodel.create({
                      firstname: obj.firstname,
                      lastname: obj.lastname,
                      email: obj.email,
                      employertype: obj.employertype,
                      password: hashPassword,
                      phone: obj.phone,
                      recentcompany: obj.recentcompany,
                      recentjob: obj.recentjob,
                      school: obj.school,
                      resume: obj.resume,
                      state: obj.state,
                      zip: obj.zip,
                      city: obj.city,
                      address: obj.address

                    })

                    let userdetails = await usermodel.findOne({ email: obj.email })
                    let userId = userdetails._id;


                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                    res.json({ "status": "success", "message": "signup success", token: token })




                  } else {
                    res.json({ "status": "failed", "message": "Phone number already registered" })
                  }
                } else {
                  res.json({ "status": "failed", "message": "Email already registered" })
                }


              } else {
                res.json({ "status": "failed", "message": "Enter valid Phone number" })
              }
            } else {
              res.json({ "status": "failed", "message": "password and confirm password error" })
            }
          } else {
            res.json({ "status": "failed", "message": "Enter valid Email" })
          }
        } else {
          res.json({ "status": "failed", "message": "Enter valid lastname" })
        }
      } else {
        res.json({ "status": "failed", "message": "Enter valid firstname" })
      }
    } else {
      // res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })
      res.json({ "status": "failed", "message": "All fields are required" })
    }


  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }

}




export async function signin(req, res) {
  try {
    let obj = req.body
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (obj.email && obj.password) {
      if (regEmail.test(obj.email.toString())) {
        let user = await usermodel.findOne({ email: obj.email })
        if (user) {
          const isMatch = await bcrypt.compare(obj.password, user.password)
          if (isMatch) {
            const userId = user._id
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            res.json({ "status": "success", "message": "signin success", token: token })
          } else {
            res.json({ "status": "failed", "message": "Password is incorrect" })

          }
        } else {
          res.json({ "status": "failed", "message": "Email not registered" })

        }
      } else {
        res.json({ "status": "failed", "message": "Enter valid email" })

      }
    } else {
      res.json({ "status": "failed", "message": "All fields are required" })

    }

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })

  }
}




export async function isUserAuth(req, res) {
  try {

    let userDetails = await usermodel.findById(req.userId)

    res.json({
      "userId": userDetails._id,
      "firstname": userDetails.firstname,
      "lastname": userDetails.lastname,
      "recentjob": userDetails.recentjob,
      "email": userDetails.email,
      "isBanned": userDetails.isBanned,
      "city": userDetails.city,
      "state": userDetails.state,
      "zip": userDetails.zip,
      "resume": userDetails.resume,
      "school": userDetails.school,
      "recentcompany": userDetails.recentcompany,
      "auth": true,
      "image": userDetails.image || null,
      "cover": userDetails.cover || null
    })

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }


}

export async function userPost(req, res) {
  try {
    let obj = req.body
    if (obj.image || obj.text || obj.video) {
      await postmodel.create({
        user: req.userId,
        text: obj.text || null,
        image: obj.image || null,
        googleid: obj.googleid,
        video: obj.video || null
      })

      res.json({ "status": "success", "message": "Post added successfully" })
    } else {
      res.json({ "status": "failed", "message": "something went wrong" })
    }

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function userPostUpdate(req, res) {
  try {
    let obj = req.body
    if (obj.image || obj.text || obj.video) {
      await postmodel.updateOne({ googleid: obj.googleid }, {
        user: req.userId,
        text: obj.text || null,
        image: obj.image || null,
        video: obj.video || null
      })

      res.json({ "status": "success", "message": "Post added successfully" })
    } else {
      res.json({ "status": "failed", "message": "something went wrong" })
    }

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getposts(req, res) {
  try {

    let posts = await postmodel.find({}).populate("user").sort({ updatedAt: -1 })


    res.json({ "status": "success", "posts": posts })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}

export async function deletePost(req, res) {
  try {
    const postId = req.params.id
    if (postId) {
      await postmodel.findByIdAndDelete(postId)
      res.json({ "status": "success", "message": 'post deleted successfully' })
    } else {
      res.json({ "status": "failed", "message": 'something went wrong' })
    }

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function fetchComments(req, res) {
  try {
    const postId = req.params.postId
    const comments = await commentmodel.find({ post: postId }).populate("user").sort({ updatedAt: -1 })

    res.json({ "status": "success", "message": "message fetched successfylly", comments })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}

export async function addcomment(req, res) {
  try {
    const { text, user, post } = req.body
    await commentmodel.create({ text, user, post })
    res.json({ "status": "success", "message": 'comment added success' })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function fetchLikes(req, res) {
  try {

    const likes = await likemodel.find({ post: req.params.postId })
    res.json({ "status": "success", "message": "message fetched successfully", likes })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function deleteLikes(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    await likemodel.findOneAndDelete({ user: userId, post: postId })

    res.json({ "status": "success", "message": "unliked success fully" })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function addLikes(req, res) {
  try {
    const { userId, postId } = req.body

    await likemodel.create({ user: userId, post: postId })

    res.json({ "status": "success", "message": "like added successfully" })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}




export async function getOneposts(req, res) {
  try {
    const { postId } = req.body
    let posts = await postmodel.findById(postId).populate("user")


    res.json({ "status": "success", "posts": posts })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getAllposts(req, res) {
  try {
    const jobs = await jobmodel.find({ approved: true }).populate('company').sort({ updatedAt: -1 })
    res.json({ "status": "success", jobs: jobs })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getOnePostNoAuth(req, res) {
  try {
    const jobId = req.params.jobId
    const jobs = await jobmodel.findById(jobId).populate('company')
    res.json({ "status": "success", jobs: jobs })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}




export async function applyJob(req, res) {
  try {
    const userId = req.userId
    const { jobId, companyId } = req.body
    const isApplyd = await jobapplymodel.findOne({ job: jobId, company: companyId, user: userId })

    if (isApplyd) {
      res.json({ "status": "failed", message: 'job already applied' })
    } else {
      await jobapplymodel.create({ job: jobId, company: companyId, user: userId })
      res.json({ "status": "success", message: 'job applied success' })
    }



  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getProfilePosts(req, res) {
  try {

    let posts = await postmodel.find({ user: req.userId }).populate("user").sort({ updatedAt: -1 })


    res.json({ "status": "success", "posts": posts })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getUserPosts(req, res) {
  try {
    const userId = req.params.userId;
    let posts = await postmodel.find({ user: userId }).populate("user").sort({ updatedAt: -1 })

    res.json({ "status": "success", "posts": posts })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}



export async function editUser(req, res) {
  try {
    let obj = req.body
    let regName = /^[a-zA-Z]+$/;
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mob = /^([+]\d{2})?\d{10}$/
    const currentUser = await usermodel.findById(req.userId)
    if (obj.firstname && obj.lastname && obj.email) {
      if (regName.test(obj.firstname.toString())) {
        if (regName.test(obj.lastname.toString())) {
          if (regEmail.test(obj.email.toString())) {


            if (currentUser.email === obj.email) {
              if (obj.image) {
                await usermodel.findByIdAndUpdate(req.userId, { image: obj.image })
              }
              if (obj.cover) {
                await usermodel.findByIdAndUpdate(req.userId, { cover: obj.cover })
              }
              if (obj.resume) {
                await usermodel.findByIdAndUpdate(req.userId, { resume: obj.resume })
              }

              await usermodel.findByIdAndUpdate(req.userId, {
                firstname: obj.firstname,
                lastname: obj.lastname,
                recentcompany: obj.recentcompany,
                recentjob: obj.recentjob,
                school: obj.school,
                state: obj.state,
                zip: obj.zip,
                city: obj.city,
              })
              const userDetails = await usermodel.findById(req.userId)
              res.json({ "status": "success", "message": "updated without email", "user": userDetails })

            } else {
              const user = await usermodel.findOne({ email: obj.email })
              if (!user) {
                if (obj.image) {
                  await usermodel.findByIdAndUpdate(req.userId, { image: obj.image })
                }
                if (obj.cover) {
                  await usermodel.findByIdAndUpdate(req.userId, { cover: obj.cover })
                }
                if (obj.resume) {
                  await usermodel.findByIdAndUpdate(req.userId, { resume: obj.cover })
                }

                await usermodel.findByIdAndUpdate(req.userId, {
                  firstname: obj.firstname,
                  lastname: obj.lastname,
                  email: obj.email,
                  recentcompany: obj.recentcompany,
                  recentjob: obj.recentjob,
                  school: obj.school,
                  state: obj.state,
                  zip: obj.zip,
                  city: obj.city,
                })

                const userDetails = await usermodel.findById(req.userId)

                res.json({ "status": "success", "message": "updated with email", "user": userDetails })


              } else {
                res.json({ "status": "failed", "message": "This email is already registered" })

              }
            }
          } else {
            res.json({ "status": "failed", "message": "Enter valid Email" })
          }
        } else {
          res.json({ "status": "failed", "message": "Enter valid lastname" })
        }
      } else {
        res.json({ "status": "failed", "message": "Enter valid firstname" })
      }
    } else {
      // res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })
      res.json({ "status": "failed", "message": "All fields are required" })
    }


  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }

}


export async function getOneAppliedJob(req, res) {
  try {
    const jobId = req.params.jobId;
    let jobs = await jobapplymodel.findOne({ user: req.userId, job: jobId }).populate("user").sort({ updatedAt: -1 })

    if (jobs) {
      res.json({ "status": "success", "jobs": jobs })
    } else {
      res.json({ "status": "failed", "message": 'not applied' })
    }

  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getAppliedJob(req, res) {
  try {

    let jobs = await jobapplymodel.find({ user: req.userId }).populate('job').sort({ updatedAt: -1 })

    if (jobs) {
      res.json({ "status": "success", "jobs": jobs })
    } else {
      res.json({ "status": "failed", "message": 'not applied' })
    }

  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getAllcompanies(req, res) {
  try {

    const company = await companymodel.find({})
    res.json({ "status": "success", company: company })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}

export async function getOneCompanyNoAuth(req, res) {
  try {
    const companyId = req.params.companyId
    const company = await companymodel.findById(companyId)
    res.json({ "status": "success", company: company })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getCompanyWiseJobs(req, res) {
  try {
    const companyId = req.params.companyId;
    let jobs = await jobmodel.find({ company: companyId, approved: true }).sort({ updatedAt: -1 })


    res.json({ "status": "success", "jobs": jobs })
  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function JobSearch(req, res) {
  try {
    const { search } = req.query;
    console.log(search)
    if (search === '') {
      let jobs = await jobmodel.find({ approved: true }).sort({ updatedAt: -1 })
      res.json({ "status": "success", "jobs": jobs, search })
    } else {
      let jobs = await jobmodel.find({ jobtitle: { "$regex": search, "$options": "i" }, approved: true }).sort({ updatedAt: -1 })
      res.json({ "status": "success", "jobs": jobs })
    }

  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function FilterByJobType(req, res) {
  try {
    const { search } = req.query;

    if (search === '') {
      let jobs = await jobmodel.find({ approved: true }).sort({ updatedAt: -1 })
      res.json({ "status": "success", "jobs": jobs })
    } else {
      let jobs = await jobmodel.find({ jobtype: { "$in": [search] }, approved: true }).sort({ updatedAt: -1 })
      res.json({ "status": "success", "jobs": jobs })
    }

  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function UserSearch(req, res) {
  try {
    const { search } = req.query;

    if (search === '') {
      let users = await usermodel.find({ isBanned: false }).sort({ updatedAt: -1 })
      res.json({ "status": "success", "users": users })
    } else {
      let users = await usermodel.find({ $or: [{ firstname: { "$regex": search, "$options": "i" } }, { lastname: { "$regex": search, "$options": "i" } }] })
      res.json({ "status": "success", "users": users })
    }

  } catch (error) {

    res.json({ "status": "failed", "message": error.message })
  }
}


export async function getOneUserNoAuth(req, res) {
  try {
    const userId = req.params.userId
    const user = await usermodel.findById(userId)

    res.json({ "status": "success", user: user })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}



export async function flagPost(req, res) {
  try {

    const userId = req.userId;
    const { flag, postId } = req.body
    const user = await reportmodel.findOne({ post: postId })

    if (!user) {
      try {
        await reportmodel.create({
          post: postId,
          reports: [{ userId: userId, report: flag }]
        })
        res.json({ "status": "success", message: 'reported' })

      } catch (e) {
        console.log(e)
      }

    } else {
      const isUserReported = user.reports.find((obj) => obj.userId.toString() === userId.toString())
      console.log(isUserReported)
      user.reports.forEach(data => console.log(data))
      console.log(isUserReported)
      if (isUserReported) {
        res.json({ "status": "failed", message: 'already reported' })
      } else {
        const doc = await reportmodel.findOne({ post: postId })
        doc.reports.push({ userId: userId, report: flag })
        await doc.save()
        res.json({ "status": "success", user: doc })
      }
    }



  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}





export async function PostNotification(req, res) {
  try {

    const { authorUser, authorCompany, recieverUser, recieverCompany, href, content } = req.body
    console.log(authorUser, authorCompany, recieverUser, recieverCompany, href, content)

    await notificationmodel.create({
      authorUser: authorUser || null,
      authorCompany: authorCompany || null,
      recieverUser: recieverUser || null,
      recieverCompany: recieverCompany || null,
      content: content,
      href: href || null,
    })
    res.json({ "status": "success", message: 'notification updated success' })



  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
    console.log(error)
  }
}


export async function getCompanyNotification(req, res) {
  try {

    const companyId = req.params.companyId

    const notification = await notificationmodel.find({ recieverCompany: req.companyId }).sort({ createdAt: -1 })
    res.json({ "status": "success", notification: notification })



  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
    console.log(error)
  }
}



export async function getUserNotification(req, res) {
  try {

    const userId = req.params.userId

    const notification = await notificationmodel.find({ recieverUser: req.userId }).sort({ createdAt: -1 })
    res.json({ "status": "success", notification: notification })



  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
    console.log(error)
  }
}


export async function DeleteNotification(req, res) {
  try {
    const notificationId = req.params.notificationId
    await notificationmodel.findByIdAndDelete(notificationId)
    res.json({ "status": "success", "message": "notification deleted successfully" })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}


export async function deleteReport(req, res) {
  try {
    const postId = req.params.id
    if (postId) {
      await reportmodel.findOneAndDelete({ post: postId })
      res.json({ "status": "success", "message": 'post deleted successfully' })
    } else {
      res.json({ "status": "failed", "message": 'something went wrong' })
    }

  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = req.params.commentId;

    await commentmodel.findByIdAndDelete(commentId)

    res.json({ "status": "success", "message": "comment deletion success" })
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
}



