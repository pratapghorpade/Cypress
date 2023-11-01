
describe('Verified', ()=> {
          
    it ("KYC Verified", ()=>  {

               cy.PostKycstatus().then((resp) => {                                                                                                                     
                                                    expect(resp.status).to.eq(200);
                                                    expect(resp.body.meta.status).to.eq("success");
                                                    expect(resp.body.data.kycStatus).to.eq("VERIFIED");                                                                                     
        })


    })
})