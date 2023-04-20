const REGISTER_USER = gql`
    mutation RegisterUser($username: String, $email: String $password: String $age: Int) {
        register(username: $username, email: $email, password: $password, age: $age) {
            id
        }
    }
`