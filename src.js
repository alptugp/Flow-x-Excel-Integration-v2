/**
 * Pulls the value of the corresponding parameter from Flow.
 * @customfunction
 * @param {number} dummy
 * @returns The value of the given parameter.
 */
 async function flow(dummy) {
    const query1 = {
      ClientId: "3asjpt4hmudvll6us1v45i1vs3",
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: "asdawwad1@gmail.com",
        PASSWORD: "Abicim2000"
      }
    };
  
    let body = JSON.stringify(query1);
  
    const url = "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_XJ0fMS4Ey";
  
    const request = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
      },
      body: body
    });
  
    let idToken;
  
    idToken = await request.then((res) => res.json()).then((data) => data["AuthenticationResult"]["IdToken"]);
  
    console.log(idToken);
  
    const projectQuery = `
      query Projects {
        project {
        project_id
        name
        description
        creator {
          user_id
          given_name
          family_name
        }
        archived
      }
      }
      `;
  
    let projectBody = JSON.stringify(projectQuery);
  
    var bearer = 'Bearer ' + idToken;
  
    const projectQueryResult = fetch(url, {
      method: "POST",
      headers: {
        "Authorization": bearer,
      },
      body: projectBody
    });
  
    projectQueryResult.then((res) => res.json()).then((data) => console.log(data));
  }
  