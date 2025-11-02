import { defineAuth } from '@aws-amplify/backend';
import { defineFunction } from '@aws-amplify/backend'; // ⬅️ You need this import!

// 1. DEFINE the three necessary Lambda functions (create a file for each)
const defineAuthChallenge = defineFunction({
  name: 'define-auth-challenge-handler',
});
const createAuthChallenge = defineFunction({
  name: 'create-auth-challenge-handler',
});
const verifyAuthChallengeResponse = defineFunction({
  name: 'verify-auth-challenge-response-handler',
});

export const auth = defineAuth({
  loginWith: {
    // Only allow phone sign-in (Passwordless)
    phone: true, 
  },
  
  // 2. LINK the functions via the 'triggers' property
  //    This enables the Custom Auth Flow in Cognito.
  triggers: {
    defineAuthChallenge,
    createAuthChallenge,
    verifyAuthChallengeResponse,
  },
  
  // 3. Ensure phone number is a required user attribute
  userAttributes: {
     phoneNumber: {
         required: true,
     }
  }
});
