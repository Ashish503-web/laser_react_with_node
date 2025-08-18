import {
     getUsersFromDB
} from "../models/User.js"


export const getUsersLIst = async (req,res) => {
    try{
     const response = await getUsersFromDB("demo_users");
        if (!response || response.length === 0) {
            return res.status(404).json({ message: "No data found!" });
        }
        return res.status(200).json({ data: response });
     }catch (error){
          res.status(500).json( {error: error.message});
     }
}
