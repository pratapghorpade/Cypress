
describe('Pending Verification', ()=> {
          
    it ("Pending Verification", ()=>  {

               cy.PostKycstatus().then((resp) => {                                                                                                                     
                                                    expect(resp.status).to.eq(200);
                                                    expect(resp.body.meta.status).to.eq("success");
                                                    expect(resp.body.data.kycStatus).to.eq("PENDING_VERIFICATION");                                                                                     
        })


    })
})