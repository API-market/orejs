global.fetch = require('jest-fetch-mock')

global.ORE_NETWORK_URI = "http://ore-staging.openrights.exchange:8888"
//global.ORE_NETWORK_URI = "http://127.0.0.1:8888"

// The following account keys are not used in production...
global.ORE_OWNER_ACCOUNT_NAME = "app.apim"
global.ORE_OWNER_ACCOUNT_KEY = "5KEzPGyFoyKBEDUbx4MjvCwTXJWwmR8h21fYWK5ycbuj1eezGXq"
global.ORE_PAYER_ACCOUNT_NAME = "eosio"
global.ORE_PAYER_ACCOUNT_KEY = "5JuNRZsMRAscwKS6uoJpjsC91CS7rUcBLus44UEcDDfNc9coihU"
global.ORE_TESTA_ACCOUNT_NAME = "test1.apim"
global.ORE_TESTA_ACCOUNT_KEY = "5JGmAdJM6eC9RGhivma1Egxn4j4VYvaJTZVyoxsjo8hdXu3Nbxe"
global.WALLET_PASSWORD = "password"