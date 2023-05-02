import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // "0xbe2BD5981efd8B21E712c5A672271c518BdA09A7" //1st
    // "0xe2B936cFf2821C062B517CA7e8e3Ab7F8CdecDbE - 2nd"
    // "0xA825FFdD758B71C0470169a3bbd00dAF01426a95" // 3rd
    //"0xa3Ba9d7819B5C99f3A35E35b7B1Aa8eB80937Aa5" // 4th sepolia
    //"0x4cC24ac459D70ac25Ec8A6a2dE23548CdBe7b818" // 5th sepolia
    // "0x6Eb958Ef9D0e49CD388F91f2F4ce3338bcA2Cd64" // 6th sepolia
    "0x24B1821eb1c80FdFc84Db1fD3C76283a176B94A7" // 7th sepolia
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

// import React, { useContext, createContext } from "react";

// import {
//   useAddress,
//   useContract,
//   useMetamask,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { ethers } from "ethers";
// import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
//   const { contract } = useContract(
//     "0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9"
//   );
//   const { mutateAsync: createCampaign } = useContractWrite(
//     contract,
//     "createCampaign"
//   );

//   const address = useAddress();
//   const connect = useMetamask();

//   const publishCampaign = async (form) => {
//     try {
//       const data = await createCampaign([
//         address, // owner
//         form.title, // title
//         form.description, // description
//         form.target,
//         new Date(form.deadline).getTime(), // deadline,
//         form.image,
//       ]);

//       console.log("contract call success", data);
//     } catch (error) {
//       console.log("contract call failure", error);
//     }
//   };

//   const getCampaigns = async () => {
//     const campaigns = await contract.call("getCampaigns");

//     const parsedCampaings = campaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(
//         campaign.amountCollected.toString()
//       ),
//       image: campaign.image,
//       pId: i,
//     }));

//     return parsedCampaings;
//   };

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();

//     const filteredCampaigns = allCampaigns.filter(
//       (campaign) => campaign.owner === address
//     );

//     return filteredCampaigns;
//   };

//   const donate = async (pId, amount) => {
//     const data = await contract.call("donateToCampaign", pId, {
//       value: ethers.utils.parseEther(amount),
//     });

//     return data;
//   };

//   const getDonations = async (pId) => {
//     const donations = await contract.call("getDonators", pId);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for (let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString()),
//       });
//     }

//     return parsedDonations;
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         address,
//         contract,
//         connect,
//         createCampaign: publishCampaign,
//         getCampaigns,
//         getUserCampaigns,
//         donate,
//         getDonations,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
