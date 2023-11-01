
describe('Verify Personal Document', ()=> {

    const BaseUrl= "https://stagingapi.goldenpi.com/";
    const Public_Key='gpi_19850381419F4E3C8E151F7A06B1818F';
    const Secret_Key='84D4419E652B4A2B93552985ADE3D446';
    const PanNumber = "BRYPG5096E";
    const CustomerID = "PG105067";

    before ("Verify Bank Details", ()=> {
     
            cy.fixture('cancle_check.png', 'base64').then((CancelCheck) => {
            cy.fixture('banksupportdoc.pdf', 'base64').then((BankStatment) => {    
             
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
                                "type": "bankAcProof",
                                "bankAcNumber": "115301000671",
                                "bankName": "ICICI",
                                "branchName": "Satara",
                                "bankAcIfsc": "ICIC0001111",
                                "bankAcSubType": "penny_drop",
                                "bankDocTypeForPennyDrop": "cancelled_cheque",
                                "bankAcDocName": "cancle_check.png",
                                "bankAcDocFile": CancelCheck,
                                "bankAcDocFilePwd": "@123456", 
                                "bankSupportDocName": "banksupportdoc.pdf",
                                "bankSupportDocFile": BankStatment,
                                "bankSupportDocFilePwd": "*1121212"
                              }
                                       ]
                        }

                          }).then((resp) =>{

                                           expect(resp.status).to.eq(200);
                                           expect(resp.body.meta.status).to.eq("success");
                                           expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                           cy.log(resp.body.data.message+" for Bank Account")

         })
      })
   })
})

    it ("Verify Demat Details", ()=> {
     
            cy.fixture('demat.png', 'base64').then((dematProof) => {

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
                                            "type": "dematProof",
                                            "dematProvider": "CDSL",
                                            "clientId": "1208160064116290",
                                            "dematDocName": "demat.png",
                                            "dematDocFile": dematProof
                                        }
                                                       ]
                                        }

                  }).then((resp) =>{

                                            expect(resp.status).to.eq(200);
                                            expect(resp.body.meta.status).to.eq("success");
                                            expect(resp.body.data.message).to.eq("Kyc details added successfully")
                                            cy.log(resp.body.data.message+" for Demat Account")

      })
    })
})




})
