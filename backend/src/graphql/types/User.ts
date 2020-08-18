import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import RequestDatabaseRepository from '../../repositories/RequestDatabaseRepository';
import UserDatabaseRepository from '../../repositories/UserDatabaseRepository';

import { IRequest } from '../../models/Request.model';
import { IUser } from '../../models/User.model';
import { RequestType } from './Request';

const RequestRepository = new RequestDatabaseRepository();
const UserRepository = new UserDatabaseRepository();

// @ts-ignore
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    salt: { type: GraphQLString },
    password_hash: { type: GraphQLString },
    role_id: { type: GraphQLInt },
    requests: {
      type: new GraphQLList(RequestType),
      async resolve(parentValue: IUser): Promise<IRequest[] | null> {
        console.log(await RequestRepository.findByUserId(parentValue.id));

        return await RequestRepository.findByUserId(parentValue.id);
      }
    },
  }),
});

export const UserField = {
  type: UserType,
  args: {
    email: {
      type: GraphQLString,
    },
  },
  resolve(parentValue: any, args: any) {
    return UserRepository.findByEmail(args.email);
  },
};
