

describe('Client KYC', ()=> {
          
  let CustID
  let PanNumber


 it ("KYC Flow for Referred partner", ()=>  {
                                                   
                        cy.Add_client().then((resp) => {

                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.panNo).to.eq("BRYPG5096E");
                                                            expect(resp.body.data.customerId).to.not.be.null;
                                                              CustID = resp.body.data.customerId;                                                          
                                                            cy.log(CustID);
                                                             PanNumber = resp.body.data.panNo;                                                         
                                                            cy.log(PanNumber);  
                                                            
                        cy.writeFile("../Cypress/cypress/fixtures/KycStatus.json", {                                               
                                                              customerId: CustID,
                                                              panNo: PanNumber,
                                                            })  
                        cy.writeFile("../Cypress/cypress/fixtures/CheckOutUrl_Payload.json", {
                                                              customerId: CustID,
                                                              type: "",
                                                              checkoutReturnUrl:  "https://goldenpiplus.com/sovereign-gold-bond",
                                                            })                                                                                                                                             
                                                       })
                                                                  
                        cy.Kyc_Status().then((resp) => {                                                                                                                     
                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                         //   expect(resp.body.data.kycStatus).to.eq("PENDING");                                                                                     
                                                        })

                        cy.Verify_Email().then((resp) => {                                                         
                                                            expect(resp.status).to.eq(200);                                           
                                                            cy.log("***"+resp.body.data.checkOutUrl+"***");   
                                                            
                                                          
                                                         })

                        cy.Verify_PAN().then((resp) => {
                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                                            cy.log(resp.body.data.message+" for POI")  

                                                         })

                        cy.Verify_Aaddhaar().then((resp) => {    
                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                                            cy.log(resp.body.data.message+" for POA")                
                                                          })

                        cy.Kyc_Status().then((resp) => {                                                      
                         
                                                            expect(resp.body.data.kycStatus).to.eq("PARTIALLY_UPLOADED"); 
                                                        })  
                                                            
                        cy.Verify_Bank().then((resp) => {
                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                                            cy.log(resp.body.data.message+" for Bank Account")
                                                        })  

                        cy.Verify_Demat().then((resp) => {
                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                                            cy.log(resp.body.data.message+" for Demat Account")

                                                          }) 
                        cy.Verify_PersonalDetails().then((resp) => {

                                                            expect(resp.status).to.eq(200);
                                                            expect(resp.body.meta.status).to.eq("success");
                                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")                                                    
                                                            cy.log(resp.body.data.message+" for Personal Details")

                                                           })   
                        cy.Kyc_Status().then((resp) => {
                                                            expect(resp.body.data.kycStatus).to.eq("PENDING_VERIFICATION");                                  
                                         
                                          
                                          
        })
    })
 })

                   

        
                                                                                   

