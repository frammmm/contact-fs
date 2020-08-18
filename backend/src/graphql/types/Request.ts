import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

import RequestDatabaseRepository from '../../repositories/RequestDatabaseRepository';
import UserDatabaseRepository from '../../repositories/UserDatabaseRepository';

import { IRequest } from '../../models/Request.model';
import { UserType } from './User';


const RequestRepository = new RequestDatabaseRepository();
const UserRepository = new UserDatabaseRepository();

// @ts-ignore
export const RequestType = new GraphQLObjectType({
  name: 'Request',
  fields: {
    id: { type: GraphQLString },
    header: { type: GraphQLString },
    body: { type: GraphQLString },
    timestamp: { type: GraphQLInt },
    complete: { type: GraphQLBoolean },
    file_url: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue: IRequest) {
        const { user_id } = parentValue;

        return UserRepository.findOne(user_id);
      },
    },
  },
});

export const RequestField = {
  type: RequestType,
  args: {
    id: {
      type: GraphQLString,
    },
  },
  resolve(parentValue: null, args: any) {
    return RequestRepository.findOne(args.id);
  },
};
