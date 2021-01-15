const { gql } = require('apollo-server');

const typeDefs = gql`
 
  type Query {
    quakes( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): QuakeConnection!
  users: [User]
  quake(id: ID!): Quake
  me: User
}
"""
Simple wrapper around our list of quakes that contains a cursor to the
last item in the list. Pass this cursor to the quakes query to fetch results
after these.
"""
type QuakeConnection { # add this below the Query type as an additional type.
  cursor: String!
  hasMore: Boolean!
  quakes: [Quake]!
}

type Quake {
    id: ID!
    location: String
    mangnitude: Float
    when: String
    cursor: String
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
