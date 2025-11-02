import { expect, test } from '@playwright/test';

test('Get Postcode Success @getPostcodeSuccess', async ({ request }) => {
   const response = await request.get(`https://api.postcodes.io/postcodes/M11 3FF`, {
   headers:{
       "Content-Type": "application/json",
       "Accept": "*/*"
   }
   },);
   const responseBody = await response.json();
   console.log(await responseBody)
   expect(response.status()).toBe(200);
   expect(responseBody.status).toBe(200);
   expect(responseBody.result.postcode).toBe("M11 3FF");
   expect(responseBody.result.country).toBe("England");
});
