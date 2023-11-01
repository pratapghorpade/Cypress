

describe('Verify Other Details', ()=> {

    const BaseUrl= "https://stagingapi.goldenpi.com/";
    const Public_Key='gpi_19850381419F4E3C8E151F7A06B1818F';
    const Secret_Key='84D4419E652B4A2B93552985ADE3D446';
    const PanNumber = "BRYPG5096E";
    const CustomerID = "PG105067";

    it ("Other details", ()=> {
     
            cy.fixture('photo.jpg', 'base64').then((Photo) => {
            cy.fixture('sign.jpg', 'base64').then((Sign) => {    
             
            cy.request({
                        method:"POST",
                        url: BaseUrl+ 'rest/v0/kyc/add-kyc',
                        auth:
                            {  
                                user:Public_Key,
                                pass:Secret_Key
                            },
                        body: 
                        {
                            "customerId": CustomerID,
                            "panNumber": PanNumber,
                            "docType": [
                              {
                                "type": "photo",
                                "passportPhotoName": "photo.jpg",
                                "passportPhotoFile": Photo
                              },
                              {
                                "type": "otherDetails",
                                "income": 1,
                                "marriageStatus": "single",
                                "profession": "private_sector",
                                "pep": false,
                              },
                              {
                                "type": "signature",
                                "signatureDocName": "sign.jpg",
                                "signatureDocFile": Sign
                              },
                            ]	
                          }

                          }).then((resp) =>{

                                           expect(resp.status).to.eq(200);
                                           expect(resp.body.meta.status).to.eq("success");
                                           expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                           cy.log(resp.body.data.message+" for Personal Details")

                        cy.request({
                                     method:'POST',
                                     url: BaseUrl + 'rest/v0/kyc/kyc-status',
                                     body: 
                                             {
                                              "customerId": CustomerID,
                                              "panNo": PanNumber
                                              },
                                          auth: 
                                              {
                                              user:Public_Key,
                                              pass:Secret_Key
                                              }
                                      })
                                      .then ((resp) => {
          
                                                  expect(resp.status).to.eq(200);
                                                  expect(resp.body.meta.status).to.eq("success");
                                                  expect(resp.body.data.kycStatus).to.eq("PENDING_VERIFICATION");                   

            })
         })
      })
   })

})


})