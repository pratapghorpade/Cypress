describe('Rejection Document', ()=> {
          
    it ("Verify Doc Rejection Status", ()=>  {

        cy.CheckOuteSignPending().then((resp) => {                                                                                                                     
                                                    expect(resp.status).to.eq(200);                                           
                                                    cy.log(resp.body.data.checkOutUrl);                   

        })

    })
})