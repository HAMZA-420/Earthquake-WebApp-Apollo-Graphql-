const { gql } = require('apollo-server');

const typeDefs = gql`
 type Query {
  quakes: [Quake]!
  quake(id: ID!): Quake
  me: User
}

type Quake {
    id: ID!
    location: String
    mangnitude: Float
    when: String
    time: String
  }

type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    records: [Quake]
}

type Mutation {

    saveRecord(recordId: [ID]!): RecordUpdateResponse!
    deleteRecord(recordId: ID!): RecordUpdateResponse!
    login(email: String): User
  }
  
  type RecordUpdateResponse {
    success: Boolean!
    message: String
    records: [Quake]
  }
  
`

;

module.exports = typeDefs;
