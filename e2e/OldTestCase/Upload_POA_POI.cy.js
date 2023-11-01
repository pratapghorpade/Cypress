
describe('Verify Personal Document', ()=> {

    const BaseUrl= "https://stagingapi.goldenpi.com/";
    const Public_Key='gpi_19850381419F4E3C8E151F7A06B1818F';
    const Secret_Key='84D4419E652B4A2B93552985ADE3D446';
     const PanNumber = "BRYPG5096E";  
    const CustomerID = "PG105067";
    //const CustomerID = Cypress.env('myVariable');
   



    it ("Verify POI", ()=> {
     
            cy.fixture('pan.jpg', 'base64').then((panimage) => {
             
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
                                  "type":"poi",
                                  "poiDocName":"pan.jpg",
                                  "poiDocFile":panimage,
                                  "fatherName":"Ravindra Ghorpade",
                                  "dob":  "17-Oct-1992"
                             }
                                       ]
                        }

                          }).then((resp) =>{

                                           expect(resp.status).to.eq(200);
                                           expect(resp.body.meta.status).to.eq("success");
                                           expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                            cy.log(resp.body.data.message+" for POI")



        })
     })
 })

        it ("Verify POA", ()=> {

            cy.fixture('Aadhaar_F.jpg', 'base64').then((AadharFront) => {
            cy.fixture('Aadhaar_B.jpg', 'base64').then((AadharBack) => {
             
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
                            "panNumber":  PanNumber,
                            "docType": [
                              {
                                  "type": "poa",
                                  "poaFrontDocName": "Aadhaar_F.jpg",
                                  "poaFrontDocFile":  AadharFront,
                                  "poaBackDocName":  "Aadhaar_B.jpg",
                                  "poaBackDocFile":   AadharBack,
                                  "poaSubType": "aadhar",
                                  "poaIdNumber": "898776351638",
                                  "gender": "male",
                                  "address":"SATARA",
                                  "pinCode":"415004"
                          
                              }
                            ]
                          }
                        

                         }).then((resp) =>{
 
                                     expect(resp.status).to.eq(200);
                                     expect(resp.body.meta.status).to.eq("success");
                                     expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                     cy.log(resp.body.data.message+" for POA")



              })
          })
      })
   })

         it ("Verify KYC Status", ()=> {

                                 cy.request({
                                            method:'POST',
                                            url: BaseUrl + 'rest/v0/kyc/kyc-status',
                                            body: //ReqBody,
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
                                                expect(resp.body.data.kycStatus).to.eq("PARTIALLY_UPLOADED");


})

})



})