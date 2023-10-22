describe('constructor', function() {

        beforeEach(() => {
          cy.viewport(1920, 1080)
          cy.visit('http://localhost:3000');
        });

        it('open ingredient', function() {
          cy.get('[data-test-id="sauce"]').first().click();
         });

        it('drug and drop and create order', function() {
          const dataTransfer = new DataTransfer();
          cy.get('[data-test-id="sauce"]').first()
          .trigger('dragstart', { dataTransfer });

          cy.get('[data-test-id="drop_zone"]')
          .trigger('drop', { dataTransfer });

          cy.get('[data-test-id="bun"]').first()
          .trigger('dragstart', { dataTransfer });

          cy.get('[data-test-id="drop_zone"]')
          .trigger('drop', { dataTransfer });

          cy.get('[data-test-id="main"]').first()
          .trigger('dragstart', { dataTransfer });

          cy.get('[data-test-id="drop_zone"]')
          .trigger('drop', { dataTransfer });

          cy.get('button').contains('Оформить заказ').click()

          cy.location().should((loc) => expect(loc.pathname).to.eq('/login'));

          cy.get('[data-test-id="email"]').type('roman.zaidulin2015@gmail.com');
          cy.get('[data-test-id="password"]').type('test');
          cy.get('button').contains('Войти').click();

          cy.get('button').contains('Оформить заказ').click()

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(20000)
          cy.get('[data-test-id="created_order_modal"]').should('exist');
          cy.get('[data-test-id="order_number"]').should('exist');
      });
  }); 