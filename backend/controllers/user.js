import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        delete user._doc.password;
        return res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ massege: error.massage })
    }
};


export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formatFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        });

        res.status(200).json(formatFriends)

    } catch (error) {
        res.status(404).json({ error: error.massage })
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId)
        // console.log({...user});

        if (user.friends.includes(friendId)) {
            // filter เป็น immutable ต้องสร้างตัวแปรมารับ หรือ ใช้ตัวแปรเดิมรับค่าที่ Return กลับมาด้วย 
            // filter is Immutable method we have to set Varible recive retuened value form Filter
            user.friends = user.friends.filter(id => id !== friendId); 
            friend.friends = friend.friends.filter(id => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formatFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath, friends }) => {
            return { _id, firstName, lastName, occupation, location, picturePath, friends }
        });

        res.status(200).json(formatFriends)


    } catch (error) {
        res.status(404).json({ error: error.massage })
    }

};
