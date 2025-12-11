import axios from "axios";

export const fetchPincodeDetails = async (pincode) => {
  try {
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await axios.get(url);

    if (response.data[0].Status === "Success") {
      const post = response.data[0].PostOffice[0];

      return {
        district: post.District,
        state: post.State,
        taluka: post.Block,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
};
