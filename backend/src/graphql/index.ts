import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { RequestField } from './types/Request';
import { UserField } from './types/User';


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: UserField,
    request: RequestField,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
