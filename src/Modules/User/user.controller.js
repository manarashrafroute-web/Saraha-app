import { Router } from "express";
import * as userSrvices from "./services/user.services.js";
import { auth } from "../../middleWares/authMiddleWare.js";


const userController = Router()

userController.post("/signup", async (req, res) => {

    const data = await userSrvices.RegistertionServices(req.body)

    if (data === "emailExists") {
        return res.status(409).json({ message: "user already exists" })
    }

    return res.status(200).json({ message: "user Created successflly ", user: data })

})


userController.post("/Login", async (req, res) => {

    const data = await userSrvices.LoginServices(req.body)

    // if (data === "OnlyOne") {
    //     return res.status(409).json({ message: "insert phone or email" })
    // }


    if (data === "youMustUseEmail") {
        return res.status(409).json({ message: "use Email" })
    }


    if (data === "userNotFound") {
        return res.status(404).json({ message: "user Not Found" })
    }


    if (data === "worngCredaintianl") {
        return res.status(400).json({ message: "Wrong creadantial" })
    }

    return res.status(200).json({ message: "user LogIn successflly ", user: data })

})


userController.post("/signup/gmail", async (req, res) => {

    console.log(req.body);

    const data = await userSrvices.SignUpWithGoogleServices(req.body)


    if (data === "emailNotVirifyed") {
        return res.status(409).json({ message: "you must verify ggogle account " })
    }


    if (data === "emailExists") {
        return res.status(409).json({ message: "user already exists" })
    }

    return res.status(200).json({ message: "user Created successflly ", user: data })

})



userController.post("/Login/gmail", async (req, res) => {


    const data = await userSrvices.LoginWithGoogleServices(req.body)


    if (data === "emailNotVirifyed") {
        return res.status(409).json({ message: "you must verify ggogle account " })
    }


    return res.status(200).json({ message: "user logedIn successflly ", user: data })

})




userController.put("/update", auth, async (req, res) => {

    const data = await userSrvices.UpdateUserServices(req.user._id, req.body)

    if (data === "userNotFound") {
        return res.status(404).json({ message: "user Not Found" })
    }

    if (data === "emailExists") {
        return res.status(409).json({ message: "user already exists" })
    }

    return res.status(200).json({ message: "user Updtaed successflly ", data })

})



// Delete user (soft delete)
userController.delete("/delete", auth, async (req, res) => {
    try {
        const result = await userSrvices.DeleteUserServices(req.user._id);

        return res.status(200).json({
            message: "User deleted successfully",
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
});


userController.get("/", async (req, res) => {

    const result = await userSrvices.ListUsersServices()


    return res.status(200).json({ message: "users", users: result })
})



userController.get("/getUserById/:id", auth, async (req, res) => {


    const data = await userSrvices.GetUserByIdServices(req.params.id)


    if (data === "invalidId") {
        return res.status(422).json({ message: "invalid user id" })
    }

    if (data === "userNotFound") {
        return res.status(404).json({ message: "user Not Found" })
    }

    return res.status(200).json({ message: "user", user: data })


})


userController.put("/updtaePassword/:id", auth, async (req, res) => {


    const data = await userSrvices.updatepassword(req.params.id)


    if (data === "invalidId") {
        return res.status(422).json({ message: "invalid user id" })
    }

    if (data === "userNotFound") {
        return res.status(404).json({ message: "user Not Found" })
    }

    return res.status(200).json({ message: "user", user: data })


})



export default userController
