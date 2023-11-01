
describe('Getuser', ()=> {

    const BaseUrl= "https://stagingapi.goldenpi.com/";
     const Public_Key='gpi_19850381419F4E3C8E151F7A06B1818F';
     const Secret_Key='84D4419E652B4A2B93552985ADE3D446';
    

    it("Add client", ()=> {

        // cy.fixture('ClientDetails').then( (Data) => {
                 
         //   const ReqBody=Data;

                    cy.request({
                        method:'POST',
                        url: BaseUrl + 'rest/v0/kyc/add-client',
                        body: //ReqBody,
                           {
                            name:"PRATAP GHORPADE",
                            panNo: "BRYPG5096E",
                            emailId: "pratap.ghorpade@gmail.com",
                            phone: "7248979701",
                            countryCode: "91",                          
                            },
                        auth: 
                            {
                            user:Public_Key,
                            pass: Secret_Key,
                            }
                    })
                    
                        .then((resp) => {
                             expect(resp.status).to.eq(200);
                             expect(resp.body.meta.status).to.eq("success");
                             expect(resp.body.data.panNo).to.eq("BRYPG5096E");
                            
                             var CustomerID = resp.body.data.customerId;
                             cy.log(CustomerID);
                             const PAN_NO = resp.body.data.panNo;
                             cy.log(PAN_NO);
                             Cypress.env('myVariable', CustomerID);
                             const Customerid = Cypress.env('myVariable');
                             cy.log(Customerid);

                      // KYC status request

                    cy.request({
                                  method:'POST',
                                    url: BaseUrl + 'rest/v0/kyc/kyc-status',
                                    body: //ReqBody,
                                   {
                                    "customerId": CustomerID,
                                    "panNo": PAN_NO
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
                                        expect(resp.body.data.kycStatus).to.eq("PENDING");


                            cy.request({
                                            method:'POST',
                                            url: BaseUrl + 'rest/v0/kyc/generate-checkout-url',
                                            body:
                                            {
                                                customerId: CustomerID,
                                                type: "VERIFY_EMAIL",
                                                checkoutReturnUrl:  'https://goldenpiplus.com/sovereign-gold-bond'
                                            },
                                            auth: 
                                            {
                                                user:Public_Key,
                                                pass:Secret_Key
                                            }
                        
                                        })
                                        .then((resp) => {
                                             expect(resp.status).to.eq(200);
                                            
                                             cy.log(resp.body.data.checkOutUrl);

                                             cy.visit(resp.body.data.checkOutUrl);
                                        })

                                       

             })
         })                  
   })

            


         })




                    
