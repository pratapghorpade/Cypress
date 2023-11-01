
import Auth_Tokan from '/home/dharapajwani/Cypress/cypress/Payload/Auth_Tokan.json'
import PathParam from '/home/dharapajwani/Cypress/cypress/Payload/PathParam.json'



let CustID
let  PanNumber
let Auth =Auth_Tokan.Authorization


Cypress.Commands.add('Add_client', () => { 

                  cy.fixture('UserDetails').then( (UserDetails) => { 

                                            cy.request({
                                                        method:'POST',
                                                        url: PathParam.AddClient,
                                                        body: UserDetails,
                                                        headers: Auth_Tokan
                                                        })
                                                        .then((resp) => {
                                                            CustID = resp.body.data.customerId;                                                          
                                                            PanNumber = resp.body.data.panNo; 
                                                        })                                                                                                                      
     })
})

Cypress.Commands.add('Kyc_Status', () => { 

                cy.fixture('KycStatus').then( (KycStatus) => {                    

                                            cy.request({
                                                        method:"POST",
                                                        url: PathParam.Status,
                                                        body: KycStatus,
                                                        headers: Auth_Tokan                                   
   })
})
})

Cypress.Commands.add('Verify_Email', () => { 

                 cy.fixture('CheckOutUrl_Payload').then( (CheckOutUrl_Payload) => { 

                                            CheckOutUrl_Payload.customerId= CustID;
                                            CheckOutUrl_Payload.type="VERIFY_EMAIL";
                                                            
                                            cy.request({
                                                        method:'POST',
                                                        url: PathParam.CheckOutkUrl,
                                                        body: CheckOutUrl_Payload,                            
                                                        headers: Auth_Tokan       
                                            })                  
    })
})

Cypress.Commands.add('Verify_PAN', () => { 

               
                cy.fixture('PoiDetails').then( (PoiDetails) => { 
                cy.fixture('pan.jpg', 'base64').then((panimage) => {

                                                        PoiDetails.customerId= CustID;
                                                        PoiDetails.panNumber= PanNumber;                                                      
                                                        PoiDetails.docType[0].poiDocFile=panimage;
                                            

                                            cy.request({
                                                        method:"POST",
                                                        url: PathParam.AddDoc,
                                                        body: PoiDetails,
                                                        headers: 
                                                        {
                                                            'Authorization': Auth,
                                                            'Content-Type': 'application/json',
                                                        }                                  
      })
   })
})
})


Cypress.Commands.add('Verify_Aaddhaar', () => { 
   
                cy.fixture('PoaDetails').then( (PoaDetails) => { 
                cy.fixture('Aadhaar_F.jpg', 'base64').then((AadharFront) => {
                cy.fixture('Aadhaar_B.jpg', 'base64').then((AadharBack) => {

                                                        PoaDetails.docType[0].poaFrontDocFile=AadharFront;
                                                        PoaDetails.docType[0].poaBackDocFile=AadharBack;
                                                        PoaDetails.customerId= CustID;
                                                        PoaDetails.panNumber= PanNumber;

                                            cy.request({
                                                        method:"POST",
                                                        url: PathParam.AddDoc,
                                                        body: PoaDetails,
                                                        headers: 
                                                        {
                                                            'Authorization': Auth,
                                                            'Content-Type': 'application/json',
                                                        }                                  
         })
      })
   })
})
})


Cypress.Commands.add('Verify_Bank', () => { 
                                                        
                 cy.fixture('BankDetails').then( (BankDetails) => { 
                 cy.fixture('cancle_check.png', 'base64').then((CancelCheck) => {
                 cy.fixture('banksupportdoc.pdf', 'base64').then((BankStatment) => {  

                                                        BankDetails.docType[0].bankAcDocFile=CancelCheck;
                                                        BankDetails.docType[0].bankSupportDocFile=BankStatment;
                                                        BankDetails.customerId= CustID;
                                                        BankDetails.panNumber= PanNumber;
                                            cy.request({
                                                        method:"POST",
                                                        url:  PathParam.AddDoc,
                                                        body: BankDetails,
                                                        headers: 
                                                        {
                                                            'Authorization': Auth,
                                                            'Content-Type': 'application/json',
                                                        }                                  
         })
       })
    })
 })
})
Cypress.Commands.add('Verify_Demat', () => { 

                                                        
                cy.fixture('DematDetails').then( (DematDetails) => { 
                cy.fixture('demat.png', 'base64').then((dematProof) => {

                                                        DematDetails.docType[0].dematDocFile=dematProof;
                                                        DematDetails.customerId= CustID;
                                                        DematDetails.panNumber= PanNumber;

                                            cy.request({
                                                        method:"POST",
                                                        url: PathParam.AddDoc,
                                                        body: DematDetails,
                                                        headers:
                                                        {
                                                            'Authorization': Auth,
                                                            'Content-Type': 'application/json',
                                                        }                                  
      })
    })
})
})

Cypress.Commands.add('Verify_PersonalDetails', () => { 

                                                       
                cy.fixture('PersonalDetails').then( (PersonalDetails) => { 
                cy.fixture('photo.jpg', 'base64').then((Photo) => {
                cy.fixture('sign.jpg', 'base64').then((Sign) => { 

                                                        PersonalDetails.docType[2].signatureDocFile=Sign;
                                                        PersonalDetails.docType[0].passportPhotoFile=Photo; 
                                                        PersonalDetails.customerId= CustID;
                                                        PersonalDetails.panNumber= PanNumber; 

                                            cy.request({
                                                        method:"POST",
                                                        url: PathParam.AddDoc,
                                                        body: PersonalDetails,                         
                                            
                                                        headers: 
                                                        {
                                                            'Authorization': Auth,
                                                            'Content-Type': 'application/json',
                                                        }                                                                              
        })
     })
   })
})
})

Cypress.Commands.add("PostKycstatus", () => {
    
                cy.fixture('KycStatus').then( (KycStatus) => {                         

                                                cy.request({
                                                            method:"POST",
                                                            url: PathParam.Status,
                                                            body: KycStatus,
                                                            headers: Auth_Tokan  
                                                })
                                            })
  })

  
  Cypress.Commands.add('CheckOuteSignPending', () => { 

                                              
                cy.fixture('CheckOutUrl_Payload').then( (CheckOutUrl_Payload) => {    
                        
                                                            CheckOutUrl_Payload.type= "COMPLETE_KYC";
                                                                
                                                cy.request({
                                                            method:'POST',
                                                            url: PathParam.CheckOutkUrl,
                                                            body: CheckOutUrl_Payload,                            
                                                            headers: Auth_Tokan                         
            })
     })

})