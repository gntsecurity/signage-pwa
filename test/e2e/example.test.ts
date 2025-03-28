describe('End-to-End Tests', () => {
  it('should pair a new device successfully', () => {
    cy.visit('/pair');
    cy.get('input[placeholder="Enter device name"]').type('Test Device');
    cy.get('button').contains('Pair Device').click();
    cy.url().should('include', '/display');
    cy.get('body').should('contain', 'Device paired successfully');
  });

  it('should create and view a new schedule', () => {
    cy.visit('/admin/schedules');
    cy.get('button').contains('Create Schedule').click();
    cy.get('input[placeholder="Schedule Name"]').type('Morning Display');
    cy.get('input[placeholder="Start Time"]').type('08:00');
    cy.get('input[placeholder="End Time"]').type('12:00');
    cy.get('button').contains('Save Schedule').click();
    cy.url().should('include', '/admin/schedules');
    cy.get('table').should('contain', 'Morning Display');
  });

  it('should upload and view media in the library', () => {
    cy.visit('/admin/media');
    cy.get('input[type="file"]').attachFile('sample-image.png');
    cy.get('button').contains('Upload').click();
    cy.url().should('include', '/admin/media');
    cy.get('.media-grid').should('contain', 'sample-image.png');
  });

  it('should delete a schedule and verify it is removed', () => {
    cy.visit('/admin/schedules');
    cy.get('button').contains('Delete').click();
    cy.get('.confirmation-dialog').contains('Confirm').click();
    cy.url().should('include', '/admin/schedules');
    cy.get('table').should('not.contain', 'Morning Display');
  });
});
