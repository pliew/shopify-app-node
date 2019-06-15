import "isomorphic-fetch";
import { gql } from "apollo-boost";

const GET_VERSION = gql`
  {
    publicApiVersions {
      handle
      displayName
    }
  }
`;

//Expects Apollo client from context along with version type
// IE: "Release candidate", "Latest" "unstable"

export const getApiVersion = async (ctx, type) => {
  const { client } = ctx;
  const apiVersions = await client
    .query({
      query: GET_VERSION
    })
    .then(response => response.data.publicApiVersions);
  const getRecent = apiVersions.find(x => x.displayName.includes(type));
  return getRecent.handle;
};
