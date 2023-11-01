
describe('Rejection Document', ()=> {
          
    it ("Verify Doc Rejection Status", ()=>  {

        cy.PostKycstatus().then((resp) => {                                                                                                                     
                                            expect(resp.status).to.eq(200);
                                            expect(resp.body.meta.status).to.eq("success");
                                            expect(resp.body.data.kycStatus).to.eq("REJECTED"); 
                                           
                                            let RejectionDoc = resp.body.data.rejectionReason[0].type;
                                            let RejectionReason = resp.body.data.rejectionReason[0].remark;

                                            cy.log("KYC "+"***"+RejectionDoc+"***"+" Document Rejected for "+"***"+RejectionReason+"***"+" Reason");  

        })

    })
})